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
    `page_id` TINYINT UNSIGNED NOT NULL,
    `browser_id` TINYINT UNSIGNED NOT NULL,
    `type_id` TINYINT  UNSIGNED NOT NULL,
    `OS_id` TINYINT UNSIGNED NOT NULL
    )''')


sql.execute('''CREATE TABLE IF NOT EXISTS `tb_page` (
    `page` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_browser` (
    `browser` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_gadget_type` (
    `gadget_type` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_OS` (
    `OS` CHARACTER NOT NULL
    )''')

sql.execute('''CREATE TABLE IF NOT EXISTS `tb_sites` (
    `site` CHARACTER NOT NULL,
    `value` INTEGER UNSIGNED NOT NULL
    )''')
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


@app.route('/send_site', methods=['post'])
@cross_origin()
def send_site():
    data = request.get_json(force=True)
    url = data['URL']
    num = url.find("/") + 2
    url = url[num:]
    site_name = url[:url.find("/")]


    select = 'SELECT rowid, value FROM tb_sites WHERE site = "%s"'
    lock.acquire()  # смотрю есть ли уже site_name в tb_sites:
    sql.execute(select % site_name)
    result = sql.fetchone()
    lock.release()
    if result:  # если да,
        update = '''UPDATE tb_sites SET value = "%s" WHERE rowid = "%s"'''
        lock.acquire()
        sql.execute(update % (result[1] + 1, result[0]))  # то обновляем количество входов
        db.commit()
        lock.release()
    else:
        insert = 'INSERT INTO tb_sites (site,value) VALUES (?,?)'
        lock.acquire()
        sql.execute(insert, (site_name, 1))  # добавляем данные
        db.commit()
        lock.release()
    return "OK"


@app.route('/get_graph/site')
@cross_origin()
def get_gr_site():
    return 'OK'


@app.route('/send_data', methods=['post'])
@cross_origin()
def send_data():
    data = request.get_json(force=True)
    x = data['coordinats']['x']
    y = data['coordinats']['y']

    m = data['minutes']
    if m < 2: time = 2
    elif m < 5: time = 5
    elif m < 10: time = 10
    elif m < 15: time = 15
    else: time = 20

    def add(item, item_name, table_name, flag):  # ф-ия проверки и добавления значений в вторастепенные таблицы
        select = '''SELECT rowid FROM "%s" WHERE "%s" = "%s"'''
        lock.acquire()
        sql.execute(select % (table_name, item_name, item))
        item_id = sql.fetchone()
        lock.release()
        if item_id is None:
            insert = 'INSERT INTO "%s" VALUES (?)' % table_name
            l = item,
            lock.acquire()
            sql.execute(insert, l)  # добавляем данные
            db.commit()

            sql.execute('SELECT last_insert_rowid()')
            item_id = sql.fetchone()
            lock.release()
            ans = (False, item_id[0])  # False - значит, такой записи в tb еще не было
            return ans
        else:
            ans = (flag, item_id[0])
            return ans

    flag = True
    (flag, page_id) = add(data['page'], 'page', 'tb_page', flag)
    (flag, browser_id) = add(data['browser'], 'browser', 'tb_browser', flag)
    (flag, type_id) = add(data['gadgetType'], 'gadget_type', 'tb_gadget_type', flag)
    (flag, OS_id) = add(data['os'], 'OS', 'tb_OS', flag)

    if flag:
        select = '''
                SELECT rowid, value FROM tb_clicks
                WHERE x = "%s" AND y = "%s" AND time = "%s" 
                AND page_id = "%s" AND browser_id = "%s" AND type_id = "%s" AND OS_id = "%s"'''
        lock.acquire()  # смотрю есть ли совпадающая запись в tb_clicks:
        sql.execute(select % (x, y, time, page_id, browser_id, type_id,  OS_id))
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
            return "OK"

    insert = '''INSERT INTO tb_clicks (x,y,value,time,page_id,browser_id,type_id,OS_id) VALUES (?,?,?,?,?,?,?,?)'''
    lock.acquire()
    sql.execute(insert, (x, y, 1, time, page_id, browser_id, type_id, OS_id))  # добавляем новые данные
    db.commit()
    lock.release()
    return "OK"


@app.route('/get_gist/<string:theme>')
@cross_origin()
def get_gist(theme):

    if theme == 'page':
        select = '''SELECT b.page, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_page AS b 
                    ON a.page_id = b.rowid GROUP BY page_id'''
        str_sample = ''' {"page":"%s", "value": %s},'''

    elif theme == 'browser':
        select = '''SELECT b.browser, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_browser AS b 
                    ON a.browser_id = b.rowid GROUP BY browser_id'''
        str_sample = ''' {"browser":"%s", "value": %s},'''

    elif theme == 'gadget':
        select = '''SELECT b.gadget_type, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_gadget_type AS b 
                    ON a.type_id = b.rowid GROUP BY type_id'''
        str_sample = ''' {"gadgetType":"%s", "value": %s},'''

    elif theme == 'OS':
        select = '''SELECT b.OS, SUM(a.value) 
                    FROM tb_clicks AS a INNER JOIN tb_OS AS b 
                    ON a.OS_id = b.rowid GROUP BY OS_id'''
        str_sample = ''' {"OS":"%s", "value": %s},'''

    elif theme == 'site':
        select = '''SELECT * FROM tb_sites'''
        str_sample = ''' {"site":"%s", "value": %s},'''

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
    if item == 'page':
        select = 'SELECT rowid, page FROM tb_page'
    elif item == 'browser':
        select = 'SELECT rowid, browser FROM tb_browser'
    elif item == 'gadget_type':
        select = 'SELECT rowid, gadget_type FROM tb_gadget_type'
    elif item == 'OS':
        select = 'SELECT rowid, OS FROM tb_OS'
    elif item == 'site':
        select = 'SELECT rowid, site FROM tb_sites'
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


# новый фильтр:
@app.route('/get_smart_heatmap/page/<string:page>/browser/<string:browser>/gadget_type/<string:gadget_type>/OS/<string:OS>')
@cross_origin()
def get_smart_heatmap(page, browser, gadget_type, OS):
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
    select = select % page_id[0][0]  # потенциальный баг

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

    if OS == 'None':
        a = 1
    else:  # находим индекс типа устройства и добавляем в условие
        lock.acquire()
        sql.execute('SELECT rowid FROM tb_OS WHERE OS = "%s"' % OS)
        OS_id = sql.fetchall()
        lock.release()
        if not OS_id:  # вывод в случае ошибки
            print('Неверно указан браузер в URL')
            return json.dumps(json.loads('{"data": []}'))
        select += ' AND OS_id = %s' % OS_id[0][0]

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


# Устаревшая
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


# Устаревшая
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


if __name__ == "__main__":
    app.run()