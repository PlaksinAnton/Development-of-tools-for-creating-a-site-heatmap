import sqlite3

with sqlite3.connect('HeatMap.db', check_same_thread=False) as db:
    sql = db.cursor()

sql.execute('SELECT * FROM tb_clicks')
result = sql.fetchall()
for i in result:
    print(i)

print('\n')
select = '''SELECT x, y, SUM(value) 
            FROM tb_clicks
            WHERE browser_id = %s
            GROUP BY x, y, browser_id'''
sql.execute('SELECT rowid, browser FROM tb_browser')
result = sql.fetchall()
for i in result:
    print(i[1])
    br = i[1]
    sql.execute(select % i[0])
    result = sql.fetchall()
    for j in result:
        print(j)


select_test = '''SELECT b.browser, a.x, a.y, SUM(a.value) 
            FROM tb_clicks AS a INNER JOIN tb_browser AS b
            ON a.browser_id = b.rowid GROUP BY x, y, browser'''