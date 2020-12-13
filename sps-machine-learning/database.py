import pymysql
#import datetime

class database():
    def __init__(self):
        self.conn = pymysql.connect(
            host = 'localhost', 
            user = 'root',
            password = '45812Qlgks!', 
            db='spsProject', 
            charset='utf8')
        self.cursor = self.conn.cursor()

    # 유저 카드승인 내역 정보 받아오기
    def get_userpayment(self):
        #today="'"+datetime.datetime.today().strftime('%Y-%m-%d')+"'"
        #before30days="'"+(datetime.datetime.today()-datetime.timedelta(days=30)).strftime('%Y-%m-%d')+"'"

        #sql = "SELECT user_id, Trdd, Txtm, Usam, category FROM user_payments WHERE Trdd <="+today+"and Trdd >="+before30days+";"
        sql = "SELECT user_id, Trdd, Txtm, Usam, category FROM user_payments WHERE Trdd BETWEEN '2019-11-01' and '2019-12-01' ;"
        self.cursor.execute(sql)
        self.conn.commit()

        db_res=self.cursor.fetchall()
        return db_res

    # 같은 군집의 user_id 결과넣기
    def insert_same_user(self,user,same_user):
        sql="INSERT INTO same_cluster_user(user_id,user_id_same) VALUES ("+user+","+same_user+");"
        self.cursor.execute(sql)
        self.conn.commit()

    # 존재하는 user_id 삭제
    def delete_user(self,user):
        sql="DELETE FROM same_cluster_user WHERE user_id="+user+";"
        self.cursor.execute(sql)
        self.conn.commit()
