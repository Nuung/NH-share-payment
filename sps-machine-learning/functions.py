# -*- coding: utf-8 -*-
"""
Created on Sun Dec  6 23:31:58 2020

@author: river
"""

import pandas as pd


class functions():
    def __init__(self,data):
        self.data=data

    # data type 변경
    def change_format(self):
        self.data.columns=['user_id','Trdd','Txtm','Usam','labeling']
        
        self.data['Trdd']=pd.to_datetime(self.data['Trdd'])
        self.data['Txtm']=self.data['Txtm'].astype('str')
        self.data['Usam']=self.data['Usam'].astype('int')

        self.data['dayOfweek']=self.data['Trdd'].dt.weekday.astype('str')
        self.data['day']=self.data['Trdd'].dt.day.astype('str')
        self.data['hour']=self.data['Txtm'].apply(lambda x:x[7:9])

        self.data['day']=self.data['day'].apply(lambda x:x+'d')
        self.data['hour']=self.data['hour'].apply(lambda x:x+'h')
        self.data['dayOfweek']=self.data['dayOfweek'].map({'0':'Mon','1':'Tue','2':'Wed','3':'Thu','4':'Fri','5':'Sat','6':'Sun'})

        self.data=self.data.drop(['Trdd','Txtm'],axis=1)
        return self.data

    # 가구수에 따른 지출 통계
    def fn_statistics(self,data):
        result=data.groupby(['user_id','fn']).sum().groupby('fn').describe()
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][1])
        result.columns=col_list
        return result
    
        
    # ----------------- For Clustering -----------------
    
    # 시간에 따른 품목 지출
    def hour_label(self,data):
        result=data.groupby(['user_id','hour','labeling'])['Usam'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    
    # 요일에 따른 품목 지출
    def weekday_label(self,data):
        result=data.groupby(['user_id','dayOfweek','labeling'])['Usam'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    
    # 날(day)에 따른 품목 지출
    def day_label(self,data):
        result=data.groupby(['user_id','day','labeling'])['Usam'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    

    def total_label(self,list):
        result=pd.concat(list,axis=1)
        
        return result