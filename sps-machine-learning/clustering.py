# -*- coding: utf-8 -*-
"""
Created on Thu Dec 10 21:47:03 2020

@author: river
"""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import PCA
from sklearn import __version__ as vs
import joblib

class clustering():
    def __init__(self):
        self.data=None
            
    # knn 모델 생성
    def make_knn(self,data):
        scaler=StandardScaler()
        scaler.fit(data)
        x=scaler.transform(data)
        pca=PCA(n_components=0.95)
        pca.fit(x)
        x_pca=pca.transform(x)
        knn=NearestNeighbors(n_neighbors=50).fit(x_pca)
        
        sk_version=vs.rstrip('.post1')

        joblib.dump(scaler,'./model/SCALE_{version}.pkl'.format(version=sk_version))
        joblib.dump(pca,'./model/PCA_{version}.pkl'.format(version=sk_version))
        joblib.dump(knn,'./model/KNN_{version}.pkl'.format(version=sk_version))
        
        return
    
    #make_knn(df.iloc[:-50])
    
    # scaler 로드
    def load_scaler(self):
        scaler=joblib.load('./model/SCALE_0.22.1.pkl')
        
        return scaler
    
    #scaler=load_scaler(self)
    
    # knn 모델 로드
    def load_knn(self):
        knn=joblib.load('./model/KNN_0.22.1.pkl')
        
        return knn
       
    #knn=load_knn()  
    
    # pca 모델 로드
    def load_pca(self):
        pca=joblib.load('./model/PCA_0.22.1.pkl')
        
        return pca
    
    #pca=load_pca()
    
    
    # 소비패턴이 비슷한 유저 찾기
    def find_similar_user(self,user_data,version): # version == 사이킷런 버전
        
        knn=joblib.load('./model/KNN_{version}.pkl'.format(version=version))
        scaler=joblib.load('./model/SCALE_{version}.pkl'.format(version=version))
        pca=joblib.load('./model/PCA_{version}.pkl'.format(version=version))
        
        x_test=scaler.transform(user_data.values.reshape(1,-1))
        x_pca=pca.transform(x_test)
        similar=knn.kneighbors(x_pca,return_distance=False).tolist()[0]
        
        return similar
    
    '''
    similar_user=find_similar_user(knn,pca,scaler,df.iloc[-3])
    
    similar_user[:10]
    '''
