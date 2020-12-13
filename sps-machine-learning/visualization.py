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
        
    def show(self,data,similar): 
        pca=PCA(n_components=2)
        data_pca=pd.DataFrame(pca.fit_transform(data))
        
        data_pca['grouped']='Different'
        data_pca.at[similar,'grouped']='Similar'
        data_pca.columns=['x1','x2','grouped']
        same=data_pca[data_pca['grouped']=='Similar']

        sns.scatterplot(x='x1',y='x2',data=data_pca,alpha=0.25,color='green',label='Different')
        sns.scatterplot(x='x1',y='x2',data=same,markers='x',color='mediumpurple',label='Similar')
        plt.title('<Similar User Distribution>')
        plt.legend()
        plt.xlabel('PCA_1')
        plt.ylabel('PCA_2')
        
        plt.savefig('./plot/cluster_{user_id}.png'.format(user_id=self.user_id))
        
        return

