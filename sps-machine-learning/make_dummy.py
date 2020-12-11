# -*- coding: utf-8 -*-
"""
Created on Sun Dec  6 19:16:37 2020

@author: river
"""

import pandas as pd
from random import randint,randrange,choices
import datetime as dt

zeropay=pd.read_excel('c://Users//river//Desktop//NH해커톤//sps-machine-learning//new_zeropay.xlsx')[['pobsAfstrName','labeling','minPrice','maxPrice','district']]


# 날짜,시간 랜덤생성
def random_date():
    day=randint(1,30)
    hour=randint(7,23)
    minute=randint(0,59)
    mk_date=dt.datetime(2020,11,day,hour,minute).strftime("%Y-%m-%d %H:%M")
    
    return mk_date

# 거래내역 랜덤생성
def make_user(i,fn):
    user_id=i # 유저 ID
    date=random_date() # 거래날짜, 시간
    n=randint(0,len(zeropay))
    franchise=zeropay.iloc[n][0] # 상호명
    labeling=zeropay.iloc[n][1] # 라벨
    rn_fn=randint(1,fn)
    price=str(randint(zeropay.iloc[n][2],zeropay.iloc[n][3])*rn_fn) # 가격
    district=zeropay.iloc[n][4] # 가맹점 지역구
    familyNum=fn # 가구수
    
    price=price[:-2]+'0'
    result={'user_id':user_id,'date':date,'franchise':franchise,'labeling':labeling,'price':int(price),'district':district,'fn':fn}
    
    return result
    

user_dummy=pd.DataFrame(columns=['user_id','date','franchise','labeling','price','district','fn'])

for i in range(1,1001):
    fn=choices(range(1,6), weights=[0.35,0.27,0.23,0.1,0.05])[0]
    num=randint(40,100)
    for _ in range(num):
        try:
            user_dummy=user_dummy.append(make_user(i,fn),ignore_index=True)
        except:
            continue

user_dummy=user_dummy.sort_values(by=['user_id','date']).reset_index(drop=True)

user_dummy['date']=pd.to_datetime(user_dummy['date'])

user_dummy['year']=user_dummy['date'].dt.year
user_dummy['month']=user_dummy['date'].dt.month
user_dummy['day']=user_dummy['date'].dt.day
user_dummy['hour']=user_dummy['date'].dt.hour
user_dummy['minute']=user_dummy['date'].dt.minute
user_dummy['dayOfweek']=user_dummy['date'].dt.weekday # 월:0 ~ 일:7

user_dummy.to_csv('c://Users/river/Desktop//NH해커톤//sps-machine-learning//user_dummy.csv', encoding='cp949', index=False)
