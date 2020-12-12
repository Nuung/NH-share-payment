# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 21:56:01 2020

@author: 82108
"""
import pandas as pd
import numpy as np
import random
import math
import pymysql

def createdate():
    month = random.randrange(1,13)
    day =random.randrange(1,28)
    if month<10:
        month = '0'+str(month)
    else:
        month =str(month)
    if day<10:
        day = '0'+str(day)
    else:
        day = str(day)
    date = '2019-'+month+'-'+day
    return date

def randomdate():
    year = str(random.randrange(1940,2000))
    month = random.randrange(1,13)
    day =random.randrange(1,28)
    if month<10:
        month = '0'+str(month)
    else:
        month =str(month)
    if day<10:
        day = '0'+str(day)
    else:
        day = str(day)
    date = year+'-'+month+'-'+day
    return date

def randombudget(num):
    if num ==1:
        budget = random.randrange(50,100)*10000
    elif num ==2:
        budget = random.randrange(80,140)*10000
    elif num ==2:
        budget = random.randrange(130,180)*10000
    elif num ==2:
        budget = random.randrange(170,220)*10000
    else:
        budget = random.randrange(200,300)*10000
    return budget
def fincard(num):
    fincard = '00829101234560000'+str(112345678919+int(num)*100)
    return fincard
def cardsuccess():
    return math.floor(random.random()*(40000000))+10000000
def gm_num(num):
    if num ==0:#사업자 등록번호 10자리
        return math.floor(random.random()*(4000000000))+1000000000
    else:
        return math.floor(random.random()*(40000000000000000000))+10000000000000000000


conn = pymysql.connect(host='ec2-44-242-175-149.us-west-2.compute.amazonaws.com', port=3306, user='root', password='45812Qlgks!',
                       db='spsProject', charset='utf8')

curs = conn.cursor()
#sql1 = """insert into users(id,password,name,birthday, gender,login_type,fin_account,family,budget,created_at,updated_at) values ('abc1@nh.com','123456','abc1','1990-11-01',0,'None','None',1, 970000,'2019-02-06','2020-12-11')"""        
df=pd.read_csv('./user_dummy.csv', index_col=0, encoding='CP949')
#db명 user_payments  - id, user_id, card_id, CardAthzNo, Trdd, Txtm, Usam, AfsNoBrno, AfsNo, AfsNm, AmslKnd, Tris, category, created_at, 
df=df[['fn','date','labeling','price','franchise']]
df=df.reset_index()

#id, user_id
ident_num=1
for i in range(1,1001):
    a=df[df['user_id']==i]
    apds=a.iloc[0]
    apds1=apds[:2].tolist()
    #User Table
    user_list = [0]*11
    user_list[0]= 'abc'+str(apds1[0])+'@nh.com'#id
    user_list[1] = '123456'#password
    user_list[2] = 'abc' +str(apds1[0])#name
    user_list[3] = randomdate()#birthday
    user_list[4] = str(random.randrange(0,2)) #gender
    user_list[5] = 'None'#login_type
    user_list[6] = 'None'#finaccount
    user_list[7] = str(apds1[1])#family
    user_list[8] = str(randombudget(apds1[1]))#budget
    user_list[9] =  str(createdate())
    user_list[10] = '2020-12-11'
    sql1 = "insert into users(id,password,name,birthday, gender,login_type,fin_account,family,budget,created_at,updated_at) values ('"+user_list[0]+"','"+user_list[1]+"','"+user_list[2]+"','"+user_list[3]+"',"+user_list[4]+",'"+user_list[5]+"','"+user_list[6]+"',"+user_list[7]+","+user_list[8]+",'"+user_list[9]+"','"+user_list[10]+"');"
    curs.execute(sql1)
    conn.commit()
    #user_cards
    user_cards_list = [0]*6
    user_cards_list[0] = '011abc'+str(apds1[0])#id
    user_cards_list[1] =user_list[0]#user_id
    user_cards_list[2] = 'abc'+str(apds1[0])+'card'#name
    user_cards_list[3] = fincard(apds1[0]) #fincard
    user_cards_list[4] = user_list[9]#created at
    user_cards_list[5] = '2020-12-11'#updateat
    sql2="insert into user_cards(id, user_id, name, fin_card, created_at, updated_at) values ('"+user_cards_list[0]+"','"+user_cards_list[1]+"','"+user_cards_list[2]+"','"+user_cards_list[3]+"','"+user_cards_list[4]+"','"+user_cards_list[5]+"');"
    curs.execute(sql2)
    conn.commit()
    sql3=''
    for j in range(len(a)):
        #user_payments
        pds=a.iloc[j]
        pds3=pds[2].split()
        pds2=pds.values[3:].tolist()
        pds4=pds3+pds2# user_id, date, labeling, price, fn
        user_payments_list = [0]*14
        user_payments_list[0] =str(ident_num)
        user_payments_list[1] = user_list[0]#user_id
        user_payments_list[2] = user_cards_list[0]#card_id
        user_payments_list[3] = str(cardsuccess())#CardAthzNo
        user_payments_list[4] = pds4[0]#거래일자 Trdd
        user_payments_list[5] = pds4[1]#거래시각 Txtm
        user_payments_list[6] = str(pds4[3])#이용금액 Usam
        user_payments_list[7] = str(gm_num(0))#AfsNoBrno 가맹점 사업등록번호
        user_payments_list[8]=str(gm_num(1))#AfstNo 가맹점번호
        user_payments_list[9]=pds4[4]#AfsNm 가맹점명
        user_payments_list[10]='1'#AmslKnd 매출종류
        user_payments_list[11]='00'#Tris 할부기간
        user_payments_list[12]=str(pds4[2])#category
        user_payments_list[13]= pds4[0]#created_at   
        sql3 = "insert into user_payments(id,user_id,card_id,CardAthzNo,Trdd,Txtm,Usam,AfstNoBrno,AfstNo,AfstNm,AmslKnd,Tris,category,created_at) values ('"+user_payments_list[0]+"','"+user_payments_list[1]+"','"+user_payments_list[2]+"','"+user_payments_list[3]+"','"+user_payments_list[4]+"','"+user_payments_list[5]+"','"+user_payments_list[6]+"','"+user_payments_list[7]+"','"+user_payments_list[8]+"','"+user_payments_list[9]+"','"+user_payments_list[10]+"','"+user_payments_list[11]+"','"+user_payments_list[12]+"','"+user_payments_list[13]+"');"
        curs.execute(sql3)
        ident_num+=1
    conn.commit()
 
conn.close()









