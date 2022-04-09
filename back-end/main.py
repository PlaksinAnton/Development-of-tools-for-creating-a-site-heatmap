import sqlite3
import flask
from flask import request, render_template
from flask_cors import CORS, cross_origin
import json
import threading
lock = threading.RLock()

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
#     `OS_id` TINYINT UNSIGNED NOT NULL

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_page` (
    `page` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_browser` (
    `browser` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_gadget_type` (
    `gadget_type` CHARACTER NOT NULL
    )''')

# sql.execute('''CREATE TABLE IF NOT EXISTS `tb_OS` (
#     `OS` CHARACTER NOT NULL
#     )''')
db.commit()


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
    lock.acquire()
    sql.execute(select_br % browser)  # смотрю есть ли в tb_browser браузер, который пришел
    browser_id = sql.fetchone()
    lock.release()
    if browser_id is None:
        i = False  # значит, новая запись будет уникальной
        insert_br = 'INSERT INTO tb_browser VALUES (?)'
        l = browser,
        lock.acquire()
        sql.execute(insert_br, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        browser_id = sql.fetchone()[0]
        lock.release()
    else:
        browser_id = browser_id[0]

    gadget_type = data['gadgetType']

    select_gt = '''
            SELECT rowid FROM tb_gadget_type
            WHERE gadget_type = "%s"'''
    lock.acquire()
    sql.execute(select_gt % gadget_type)  # смотрю есть ли в tb_gadget_type тип, который пришел
    type_id = sql.fetchone()
    lock.release()
    if type_id is None:
        i = False  # новая запись будет уникальной
        insert_gt = 'INSERT INTO tb_gadget_type VALUES (?)'
        l = gadget_type,
        lock.acquire()
        sql.execute(insert_gt, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        type_id = sql.fetchone()[0]
        lock.release()
    else:
        type_id = type_id[0]

    page = data['page']
    select_pg = '''
                SELECT rowid FROM tb_page
                WHERE page = "%s"'''
    lock.acquire()
    sql.execute(select_pg % page)  # смотрю есть ли в tb_page страница, которая пришла
    page_id = sql.fetchone()
    lock.release()
    if page_id is None:
        i = False  # новая запись будет уникальной
        insert_pg = 'INSERT INTO tb_page VALUES (?)'
        l = page,
        lock.acquire()
        sql.execute(insert_pg, l)  # добавляем данные
        db.commit()

        sql.execute('SELECT last_insert_rowid()')
        page_id = sql.fetchone()[0]
        lock.release()
    else:
        page_id = page_id[0]

    if i:
        select = '''
                SELECT rowid, value FROM tb_clicks
                WHERE x = "%s" AND y = "%s" AND time = "%s" AND browser_id = "%s" AND type_id = "%s" AND page_id = "%s"'''
        lock.acquire()
        sql.execute(select % (x, y, time, browser_id, type_id, page_id))  # смотрю есть ли совпадающая запись в tb_clicks
        result = sql.fetchone()
        lock.release()
        if result:  # если да,
            update = '''
                    UPDATE tb_clicks SET value = "%s"
                    WHERE rowid = "%s"'''
            lock.acquire()
            sql.execute(update % (result[1] + 1, result[0]))  # то обновляем количество кликов
            db.commit()
            lock.release()

            # for value in sql.execute("SELECT * FROM 'tb_clicks'"):
            #     print(value)
            return "OK"

    insert = '''INSERT INTO tb_clicks (x,y,value,time,browser_id,type_id,page_id) VALUES (?,?,?,?,?,?,?)'''
    lock.acquire()
    sql.execute(insert, (x, y, 1, time, browser_id, type_id, page_id))  # добавляем новые данные
    db.commit()
    lock.release()

    #  for value in sql.execute("SELECT * FROM 'tb_clicks'"):
    #      print(value)
    return "OK"


@app.route('/get_heatmap/<string:page>')
@cross_origin()
def get_heatmap(page):
    lock.acquire()
    sql.execute('SELECT rowid FROM tb_page WHERE page = "%s"' % page)
    result = sql.fetchall()
    lock.release()
    if not result:  # вывод в случае ошибки
        print('Неверный запрос страницы в URL')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    page_id = result[0][0]

    select = '''SELECT x, y, SUM(value) FROM tb_clicks WHERE page_id = %s GROUP BY x, y'''
    data_sample = '''{"data": ['''
    str_sample = ''' {"x":%s, "y": %s, "value":%s},'''
    lock.acquire()
    sql.execute(select % page_id)
    result = sql.fetchall()
    lock.release()
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

    lock.acquire()
    sql.execute(select)
    result = sql.fetchall()
    lock.release()
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
    lock.acquire()
    sql.execute('SELECT rowid FROM tb_page WHERE page = "%s"' % page)
    result = sql.fetchall()
    lock.release()
    if not result:  # вывод в случае ошибки
        print('Неверный запрос страницы в URL')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    page_id = result[0][0]

    if theme == 'browser':
        select1 = 'SELECT rowid, browser FROM tb_browser'
        select2 = '''SELECT x, y, SUM(value) FROM tb_clicks
                     WHERE browser_id = %s AND page_id = %s
                     GROUP BY x, y'''
    elif theme == 'gadget_type':
        select1 = 'SELECT rowid, gadget_type FROM tb_gadget_type'
        select2 = '''SELECT x, y, SUM(value) FROM tb_clicks
                     WHERE type_id = %s AND page_id = %s
                     GROUP BY x, y'''
    else:
        print("URL с ошибкой")
        ans = json.loads('{"data": []}')
        return json.dumps(ans)

    str_sample = ''' {"x":%s, "y": %s, "value":%s},'''
    lock.acquire()
    sql.execute(select1)
    result = sql.fetchall()
    lock.release()
    if not result:  # вывод в случае ошибки
        print('Пустая БД c браузерами')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    data_sample = '''{"data": ['''
    for i in result:
        data_sample = data_sample + '{"' + i[1] + '": ['
        lock.acquire()
        sql.execute(select2 % (i[0], page_id))
        result = sql.fetchall()
        lock.release()
        if not result:
            data_sample += ' '
        else:
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
    lock.acquire()
    sql.execute(select)
    result = sql.fetchall()
    lock.release()
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


# НОВЫЙ БЭК
# получение доступных параметров фильтрации:
@app.route('/get_list_of/<string:item>')
@cross_origin()
def get_list_of(item):
    if item == 'browser':
        select = 'SELECT rowid, browser FROM tb_browser'
    elif item == 'gadget_type':
        select = 'SELECT rowid, gadget_type FROM tb_gadget_type'
    elif item == 'page':
        select = 'SELECT rowid, page FROM tb_page'
    else:
        print("URL с ошибкой")
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    lock.acquire()
    sql.execute(select)
    result = sql.fetchall()
    lock.release()
    if not result:  # вывод в случае ошибки
        print('Пустая БД')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    str_sample = ''' {"%s":"%s"},'''
    data_sample = '''{"data": ['''
    for st in result:
        s = str_sample % st
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


# Лучший фильтр
@app.route('/get_smart_heatmap/page/<string:page>/browser/<string:browser>/gadget_type/<string:gadget_type>')
@cross_origin()
def get_smart_heatmap(page, browser, gadget_type):
    select = '''SELECT x, y, SUM(value) 
                FROM tb_clicks
                WHERE page_id = %s'''
    lock.acquire()
    sql.execute('SELECT rowid FROM tb_page WHERE page = "%s"' % page)
    page_id = sql.fetchall()   # находим индекс страницы и добавляем в условие
    lock.release()
    if not page_id:  # вывод в случае ошибки
        print('Неверно указана страница в URL')
        return json.dumps(json.loads('{"data": []}'))
    select = select % page_id[0][0]

    if browser == 'None':
        a = 1
    else:  # находим индекс браузера и добавляем в условие
        lock.acquire()
        sql.execute('SELECT rowid FROM tb_browser WHERE browser = "%s"' % browser)
        browser_id = sql.fetchall()
        lock.release()
        if not browser_id:  # вывод в случае ошибки
            print('Неверно указано имя браузера в URL')
            return json.dumps(json.loads('{"data": []}'))
        select += ' AND browser_id = %s' % browser_id[0][0]

    if gadget_type == 'None':
        a = 1
    else:  # находим индекс типа устройства и добавляем в условие
        lock.acquire()
        sql.execute('SELECT rowid FROM tb_gadget_type WHERE gadget_type = "%s"' % gadget_type)
        type_id = sql.fetchall()
        lock.release()
        if not type_id:  # вывод в случае ошибки
            print('Неверно указан тип устройства в URL')
            return json.dumps(json.loads('{"data": []}'))
        select += ' AND type_id = %s' % type_id[0][0]

    select += ' GROUP BY x, y'

    lock.acquire()
    sql.execute(select)
    result = sql.fetchall()
    lock.release()
    if not result:  # вывод в случае ошибки
        print('Итоговый запрос ничего не дал')
        ans = json.loads('{"data": []}')
        return json.dumps(ans)
    data_sample = '''{"data": ['''
    str_sample = ''' {"x":%s, "y": %s, "value":%s},'''
    for st in result:
        data_sample = data_sample + str_sample % st
    data_sample = data_sample[:-1] + "]}"
    data = json.loads(data_sample)
    return json.dumps(data)


if __name__ == "__main__":
    app.run()