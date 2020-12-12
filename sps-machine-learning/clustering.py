# -*- coding: utf-8 -*-
"""
Created on Thu Dec 10 21:47:03 2020

@author: river
"""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import PCA

class clustering():
    def __init__(self):
        self.data=None
        self.similar=None    

    # knn 모델 생성
    def make_knn(self,data,user_id):
        train_data=data.drop([user_id]).reset_index(drop=True)

        scaler=StandardScaler()
        scaler.fit(train_data)
        x_train=scaler.transform(train_data)
        pca=PCA(n_components=0.95)
        pca.fit(x_train)
        x_train_pca=pca.transform(x_train)
        knn=NearestNeighbors(n_neighbors=30).fit(x_train_pca)
        self.data=x_train_pca
        
        x_test=scaler.transform(data.loc[user_id].values.reshape(1,-1))
        x_test_pca=pca.transform(x_test)
        similar=knn.kneighbors(x_test_pca,return_distance=False).tolist()[0]
        
        self.similar=similar
        return 
