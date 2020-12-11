# -*- coding: utf-8 -*-
"""
Created on Thu Dec 10 21:47:03 2020

@author: river
"""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn import __version__ as vs
import joblib


# 시간+요일+일 에 따른 품목에 대한 지출 합계
df=pd.read_csv('c://Users//river//Desktop//NH해커톤//sps-machine-learning//user_grouped//total_label.csv', index_col=0)

# knn 모델 생성
def make_knn(data):
    scaler=StandardScaler()
    x=scaler.fit_transform(data)
    knn=NearestNeighbors(n_neighbors=50).fit(x)
    
    joblib.dump(knn,'c://Users//river//Desktop//NH해커톤//sps-machine-learning//KNN_{version}.pkl'.format(version=vs))
    return
'''
make_knn(df.iloc[:-1])
'''

# knn 모델 로드
def load_knn():
    knn=joblib.load('c://Users//river//Desktop//NH해커톤//sps-machine-learning//KNN_0.22.1.pkl')
    
    return knn
    
model=load_knn()  

# 소비패턴이 비슷한 유저 찾기
def find_similar_user(model,user_data):
    scaler=StandardScaler()
    x_test=scaler.fit_transform(user_data.values.reshape(1,-1))
    similar=model.kneighbors(x_test,return_distance=False).tolist()[0]
    
    return similar

similar_user=find_similar_user(model,df.iloc[-1])

similar_user[:5]
