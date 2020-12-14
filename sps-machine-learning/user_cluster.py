
import pandas as pd
from clustering import *
#from visualization import *
from functions import *
from database import *
import numpy as np
import sys

# DB연결
db=database()
user_payment=pd.DataFrame(db.get_userpayment()) # user_payments 테이블에서 한달기준 값 가져오기

ft=functions(user_payment)
user_payment=ft.change_format() # format 변환

hour_label=ft.hour_label(user_payment)
day_label=ft.day_label(user_payment)
weekday_label=ft.weekday_label(user_payment)

total=[hour_label,day_label,weekday_label]
total_label=ft.total_label(total) # 품목별 day,dayOfweek,hour 에 대한 지출금 집계

cluster=clustering()
user_id=sys.argv[1]

cluster.make_knn(total_label,user_id) # 군집
print('모델 생성')

'''
visual=visualization(user_id)
visual.show(cluster.data ,cluster.similar)
print('{user} 그래프 저장'.format(user=user_id))
'''

total_label=total_label.drop([user_id]).reset_index()

result=total_label.loc[cluster.similar]['user_id'].tolist()


user_id="'"+user_id+"'"
db.delete_user(user_id)
for i in result:
    same_user="'"+i+"'"
    db.insert_same_user(user_id,same_user)


print('DB입력 완료')