import sqlite3
import flask
from flask import request, render_template
from flask_cors import CORS, cross_origin
import json

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
    `gadgetType_id` TINYINT  UNSIGNED NOT NULL
    )''')

db.commit()
sql.execute('''CREATE TABLE IF NOT EXISTS `tb_browser` (
    `browser` CHARACTER NOT NULL
    )''')
db.commit()
sql.execute('''CREATE TABLE IF NOT EXISTS `tb_gadget_type` (
    `gadgetType` CHARACTER NOT NULL
    )''')
db.commit()

# Посмотреть содержимое бд:
# for value in sql.execute("SELECT rowid, x, y, value FROM 'tb_clicks'"):
#    print(value)
@app.route('/')
def home():
    return render_template("StartPage.html")


@app.route('/send_data', methods=['post'])
@cross_origin()
def send_data():
    data = request.get_json(force=True)
    i = 0  # флаг
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
    sql.execute(select_br % browser)  # смотрю есть ли совпадающий браузер в списке
    result = sql.fetchone()
    if result:  # если есть, то запоминаем индекс
        br = result[0]
    else:  # если нет, то вписываем и запоминаем индекс
        i = 1  # флаг
        insert_br = 'INSERT INTO tb_browser VALUES(?)'
        l = browser,
        sql.execute(insert_br, l)  # добавляем данные
        db.commit()
        sql.execute(select_br % browser)
        res = sql.fetchone()
        br = res[0]

    gadget_type = data['gadgetType']
    select_gt = '''
            SELECT rowid FROM tb_gadget_type
            WHERE gadgetType = "%s"'''
    sql.execute(select_gt % gadget_type)  # смотрю есть ли совпадающий тип устройства в списке
    result = sql.fetchone()
    if result:  # если есть, то запоминаем индекс
        gt = result[0]
    else:  # если нет, то вписываем и запоминаем индекс
        i = 1  # флаг
        insert_gt = 'INSERT INTO tb_gadget_type VALUES(?)'
        l = gadget_type,
        sql.execute(insert_gt, l)  # добавляем данные
        db.commit()
        sql.execute(select_gt % gadget_type)
        gt = sql.fetchone()[0]

    if i == 0:
        select = '''
                SELECT value FROM tb_clicks
                WHERE x = "%s" AND y = "%s" AND time = "%s" AND browser_id = "%s" AND gadgetType_id = "%s"'''
        sql.execute(select % (x, y, time, br, gt))  # смотрю есть ли совпадающая запись в списке
        result = sql.fetchone()
        if result:  # если да,
            update = '''
                    UPDATE tb_clicks SET value = "%s"
                    WHERE x = "%s" AND y = "%s" AND time = "%s" AND browser_id = "%s" AND gadgetType_id = "%s"'''
            sql.execute(update % (result[0] + 1, x, y, time, br, gt))  # то обновляем количество кликов
            db.commit()
            for value in sql.execute("SELECT * FROM 'tb_clicks'"):
                print(value)
            return "OK"

    insert = '''INSERT INTO tb_clicks (x,y,value,time,browser_id,gadgetType_id) VALUES (?,?,?,?,?,?)'''
    sql.execute(insert, (x, y, 1, time, br, gt))  # добавляем данные
    db.commit()

    for value in sql.execute("SELECT * FROM 'tb_clicks'"):
        print(value)
    return "OK"


@app.route('/get_data')
@cross_origin()
def get_data():
    select = '''SELECT x, y, SUM(value) FROM tb_clicks GROUP BY x, y'''
    sql.execute(select)
    result = sql.fetchall()
    if result is None:
        return 'пустая БД'
    data_sample = '''{ "data": [ '''
    str_sample = '''{"x":%s, "y": %s, "value":%s},'''
    for st in result:
        s = str_sample % st
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + " ] }"
    data = json.loads(data_sample)
    print(data)
    #print(type(data))
    return json.dumps(data)


@app.route('/get_data/browser_gist')
@cross_origin()
def browser_gist():
    select = '''SELECT b.browser, SUM(a.value) 
            FROM tb_clicks AS a INNER JOIN tb_browser AS b 
            ON a.browser_id = b.rowid GROUP BY browser_id'''
    sql.execute(select)
    result = sql.fetchall()
    data_sample = '''{ "data": [ '''
    str_sample = '''{"browser":"%s", "value": %s},'''
    for st in result:
        s = str_sample % st
        data_sample = data_sample + s
    data_sample = data_sample[:-1] + " ] }"
    data = json.loads(data_sample)
    print(data)
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