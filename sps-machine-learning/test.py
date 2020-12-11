# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 15:26:36 2020

@author: river
"""

from random import randint
import pandas as pd
from clustering import *
from visualization import *
from functions import *

    # 더미데이터 불러오기 -> SQL 구문으로 변경 예정
users=pd.read_csv('user_dummy.csv',encoding='cp949')

# 데이터 포맷변경 -> 군집화에 필요한 요소만 남기기  
ft=functions(users)
users=ft.change_format()

hour_label=ft.hour_label(users)
day_label=ft.day_label(users)
weekday_label=ft.weekday_label(users)

total=[hour_label,day_label,weekday_label]
total_label=ft.total_label(total)

cluster=clustering()

x_train=total_label.iloc[:-100]
cluster.make_knn(x_train)
print('모델 생성')

num=randint(1,1000)
x_test=total_label.iloc[num]

similar=cluster.find_similar_user(x_test,'0.22.2')

visual=visualization('user{num}'.format(num=num))
visual.show(total_label,similar)
print('그래프 저장')