import sqlite3
import flask
from flask import request, render_template
from flask_cors import CORS, cross_origin
import json
import threading
lock = threading.Lock()

app = flask.Flask(__name__)
app.config["DEBUG"] = True

with sqlite3.connect('HeatMap.db', check_same_thread=False) as db:
    sql = db.cursor()

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_clicks` (
    `x` INTEGER UNSIGNED NOT NULL,
    `y` INTEGER UNSIGNED NOT NULL,
    `value` INTEGER UNSIGNED NOT NULL,
    `time` TINYINT UNSIGNED NOT NULL,
    `browser_id` TINYINT UNSIGNED NOT NULL,
    `type_id` TINYINT  UNSIGNED NOT NULL,
    `page_id` TINYINT UNSIGNED NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_browser` (
    `browser` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_gadget_type` (
    `gadget_type` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_page` (
    `page` CHARACTER NOT NULL
    )''')
db.commit()

# Посмотреть содержимое бд:
# for value in sql.execute("SELECT rowid, x, y, value FROM 'tb_clicks'"):
#    print(value)


@app.route('/')
def home():
    return render_template("StartPage.html")


@app.route('/show')
@cross_origin()
def show():
    res = ()
    for value in sql.execute("SELECT * FROM 'tb_clicks'"):
        value = value,
        res = res + value
    return json.dumps(res)


@app.route('/send_data', methods=['post'])
@cross_origin()
def send_data():
    data = request.get_json(force=True)
    i = True  # флаг
    x = data['coordinats']['x']
    y = data['coordinats']['y']

    m = data['minutes']
    if m < 2: time = 2
    elif m < 5: time = 5
    elif m < 10: time = 10
    elif m < 15: time = 15
    else: time = 20

    browser = data['browser']
    select_br = '''
            SELECT rowid FROM tb_browser
            WHERE browser = "%s"'''
    sql.execute(select_br % browser)  # смотрю есть ли в tb_browser браузер, который пришел
    browser_id = sql.fetchone()
    if browser_id is None:
        i = False  # значит, новая запись будет уникальной
        insert_br = 'INSERT INTO tb_browser VALUES (?)'
        l = browser,
        sql.execute(insert_br, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        browser_id = sql.fetchone()[0]
    else:
        browser_id = browser_id[0]

    gadget_type = data['gadgetType']

    select_gt = '''
            SELECT rowid FROM tb_gadget_type
            WHERE gadget_type = "%s"'''
    sql.execute(select_gt % gadget_type)  # смотрю есть ли в tb_gadget_type тип, который пришел
    type_id = sql.fetchone()
    if type_id is None:
        i = False  # новая запись будет уникальной
        insert_gt = 'INSERT INTO tb_gadget_type VALUES (?)'
        l = gadget_type,
        sql.execute(insert_gt, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        type_id = sql.fetchone()[0]
    else:
        type_id = type_id[0]

    page = data['page']
    select_pg = '''
                SELECT rowid FROM tb_page
                WHERE page = "%s"'''
    sql.execute(select_pg % page)  # смотрю есть ли в tb_page страница, которая пришла
    page_id = sql.fetchone()
    if page_id is None:
        i = False  # новая запись будет уникальной
        insert_pg = 'INSERT INTO tb_page VALUES (?)'
        l = page,
        sql.execute(insert_pg, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        page_id = sql.fetchone()[0]
    else:
        page_id = page_id[0]


    if i:
        select = '''
                SELECT rowid, value FROM tb_clicks
                WHERE x = "%s" AND y = "%s" AND time = "%s" AND browser_id = "%s" AND type_id = "%s" AND page_id = "%s"'''
        sql.execute(select % (x, y, time, browser_id, type_id, page_id))  # смотрю есть ли совпадающая запись в tb_clicks
        result = sql.fetchone()
        if result:  # если да,
            update = '''
                    UPDATE tb_clicks SET value = "%s"
                    WHERE rowid = "%s"'''
            sql.execute(update % (result[1] + 1, result[0]))  # то обновляем количество кликов
            db.commit()

            # for value in sql.execute("SELECT * FROM 'tb_clicks'"):
            #     print(value)
            return "OK"

    insert = '''INSERT INTO tb_clicks (x,y,value,time,browser_id,type_id,page_id) VALUES (?,?,?,?,?,?,?)'''
    sql.execute(insert, (x, y, 1, time, browser_id, type_id, page_id))  # добавляем новые данные
    db.commit()

    #  for value in sql.execute("SELECT * FROM 'tb_clicks'"):
    #      print(value)
    return "OK"


@app.route('/get_heatmap/<string:page>')
@cross_origin()
def get_heatmap(page):
    sql.execute('SELECT rowid FROM tb_page WHERE page = "%s"' % page)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Неверный запрос страницы в URL')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    page_id = result[0][0]

    select = '''SELECT x, y, SUM(value) FROM tb_clicks WHERE page_id = %s GROUP BY x, y'''
    data_sample = '''{"data": ['''
    str_sample = ''' {"x":%s, "y": %s, "value":%s},'''
    sql.execute(select % page_id)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Пустая бд')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    for st in result:
        s = str_sample % st
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


@app.route('/get_gist/<string:theme>')
@cross_origin()
def get_gist(theme):

    if theme == 'browser':
        select = '''SELECT b.browser, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_browser AS b 
                    ON a.browser_id = b.rowid GROUP BY browser_id'''
        str_sample = ''' {"browser":"%s", "value": %s},'''

    elif theme == 'gadget':
        select = '''SELECT b.gadget_type, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_gadget_type AS b 
                    ON a.type_id = b.rowid GROUP BY type_id'''
        str_sample = ''' {"gadgetType":"%s", "value": %s},'''

    else:
        print("URL с ошибкой")
        ans = json.loads('{"data": []}')
        return json.dumps(ans)

    sql.execute(select)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Запрос в БД не дал результатов')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    data_sample = '''{"data": ['''
    for st in result:
        s = str_sample % st
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


@app.route('/get_heatmap/<string:theme>/<string:page>')
@cross_origin()
def get_heatmap_(theme, page):
    sql.execute('SELECT rowid FROM tb_page WHERE page = "%s"' % page)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Неверный запрос страницы в URL')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    page_id = result[0][0]

    if theme == 'browser':
        select1 = 'SELECT rowid, browser FROM tb_browser'
        select2 = '''SELECT x, y, SUM(value) 
                    FROM tb_clicks
                    WHERE browser_id = %s AND page_id = %s
                    GROUP BY x, y, browser_id'''

    elif theme == 'gadget_type':
        select1 = 'SELECT rowid, gadget_type FROM tb_gadget_type'
        select2 = '''SELECT x, y, SUM(value) 
                            FROM tb_clicks
                            WHERE type_id = %s AND page_id = %s
                            GROUP BY x, y, type_id'''

    else:
        print("URL с ошибкой")
        ans = json.loads('{"data": []}')
        return json.dumps(ans)

    str_sample = ''' {"x":%s, "y": %s, "value":%s},'''
    sql.execute(select1)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Пустая БД')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    data_sample = '''{"data": ['''
    for i in result:
        data_sample = data_sample + '{"' + i[1] + '": ['
        sql.execute(select2 % (i[0], page_id))
        result = sql.fetchall()
        if not result:  # вывод в случае ошибки
            print('Запрос в БД ничего не вернул')
            ans = json.loads('{"data": []}')
            return json.dumps(ans)
        for st in result:
            s = str_sample % st
            data_sample += s
        data_sample = data_sample[:-1] + "]}, "
    data_sample = data_sample[:-2] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


@app.route('/get_graph/time')
@cross_origin()
def get_graph():
    select = '''SELECT time, SUM(value) 
                FROM tb_clicks GROUP BY time'''
    str_sample = ''' {"time":%s, "value": %s},'''
    sql.execute(select)
    result = sql.fetchall()
    if not result:  # вывод в случае ошибки
        print('Пустая БД')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    data_sample = '''{"data": ['''
    sum = 0
    for st in result:
        tup = (st[0], st[1]+sum)
        sum = tup[1]
        s = str_sample % tup
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


@app.route('/send_data2', methods=['post'])
@cross_origin()
def send_data2():
    data = request.get_json(force=True)
    print(data)
    return "OK"


if __name__ == "__main__":
    app.run()

# for value in sql.execute("SELECT * FROM'tb_clicks'"):
#   print(value)


# @app.route('/send_data', methods=['post'])
# @cross_origin()
# def send_data():
#     data = request.get_json(force=True)
#     new_data = []
#     for str in data['data']:
#         x = str['x']
#         y = str['y']
#         v = str['value']
#         select = '''
#                     SELECT value FROM tb_clicks
#                     WHERE x = "%s" and y = "%s"'''
#         sql.execute(select % (x, y)) # проверяем существует ли запись об пиксиле x y
#         result = sql.fetchone()
#         if result: # если да,
#             update = '''
#                         UPDATE tb_clicks SET value = "%s"
#                         WHERE x = "%s" AND y = "%s"'''
#             sql.execute(update % (result[0] + v, x, y)) # то обновляем количество кликов
#             db.commit()
#         else: # если нет,
#             ins = (x, y, v)
#             new_data.append(ins) # то сохраняем данные в массив
#     if new_data:
#         insert = 'INSERT INTO tb_clicks (x,y,value) VALUES (?,?,?)'
#         sql.executemany(insert, new_data) # добавляем данные
#         db.commit()
#     return "OK"