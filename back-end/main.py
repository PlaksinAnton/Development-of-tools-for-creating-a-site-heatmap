import sqlite3
import flask
from flask import request
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True

with sqlite3.connect('HeatMap.db', check_same_thread=False) as db:
    sql = db.cursor()

# sql.execute('''CREATE TABLE IF NOT EXISTS `tb_clicks` (
#  `x` INTEGER UNSIGNED NOT NULL,
#  `y` INTEGER UNSIGNED NOT NULL,
#  `value` INTEGER UNSIGNED NOT NULL,
#  PRIMARY KEY (`x`, `y`)
# )''')
# db.commit()


for value in sql.execute("SELECT * FROM 'tb_clicks'"):
    print(value)


@app.route('/login', methods=['post'])
def get_data():
    data = request.get_json(force=True)
    new_data = []
    for str in data['data']:
        x = str['x']
        y = str['y']
        v = str['value']
        select = '''
                    SELECT value FROM tb_clicks
                    WHERE x = "%s" and y = "%s"'''
        sql.execute(select % (x, y)) # проверяем существует ли запись об пиксиле x y
        result = sql.fetchone()
        if result: # если да,
            update = '''
                        UPDATE tb_clicks SET value = "%s"
                        WHERE x = "%s" AND y = "%s"'''
            sql.execute(update % (result[0] + v, x, y)) # то обновляем количество кликов
            db.commit()
        else: # если нет,
            ins = (x, y, v)
            new_data.append(ins) # то сохраняем данные в массив
    if new_data:
        insert = 'INSERT INTO tb_clicks (x,y,value) VALUES (?,?,?)'
        sql.executemany(insert, new_data) # добавляем данные
        db.commit()
    return "OK"


if __name__ == "__main__":
    app.run()


# sql.execute("INSERT INTO tb_clicks (x,y,value) VALUES (5,5,1)")
# db.commit()

# for value in sql.execute("SELECT * FROM'tb_clicks'"):
#   print(value)
