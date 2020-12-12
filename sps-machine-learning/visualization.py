# -*- coding: utf-8 -*-
"""
Created on Fri Dec 11 12:02:46 2020

@author: river
"""

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

class visualization():
    def __init__(self,user_id):
        self.user_id=user_id
        self.same=None
    '''    
    def show(self,data,similar): 
        scaler=StandardScaler()
        data_std=scaler.fit_transform(data)
        
        pca=PCA(n_components=2)
        data_pca=pd.DataFrame(pca.fit_transform(data_std))
        
        data_pca['grouped']='Other'
        data_pca.at[similar,'grouped']='Same'
        data_pca.columns=['x1','x2','grouped']

        same=data_pca[data_pca['grouped']=='Same']

        sns.scatterplot(data_pca['x1'],data_pca['x2'],alpha=0.25,color='green')
        sns.scatterplot(same['x1'],same['x2'],markers='x',color='mediumpurple')
        plt.title('<Similar User Distribution> {user_id}'.format(user_id=self.user_id))
        plt.savefig('./plot/graph_{user_id}.png'.format(user_id=self.user_id))
        
        return
    '''
    def show(self,data,similar): 
        pca=PCA(n_components=2)
        data_pca=pd.DataFrame(pca.fit_transform(data))
        
        data_pca['grouped']='Other'
        data_pca.at[similar,'grouped']='Same'
        data_pca.columns=['x1','x2','grouped']

        same=data_pca[data_pca['grouped']=='Same']

        sns.scatterplot(x='x1',y='x2',data=data_pca,alpha=0.25,color='green')
        sns.scatterplot(x='x1',y='x2',data=same,markers='x',color='mediumpurple')
        plt.title('<Similar User Distribution> {user_id}'.format(user_id=self.user_id))
        plt.xlabel('PCA_1')
        plt.ylabel('PCA_2')
        plt.savefig('./plot/graph_{user_id}.png'.format(user_id=self.user_id))
        
        self.same=same
        return

