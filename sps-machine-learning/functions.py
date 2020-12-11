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
        def make_2digit(value):
            if len(value)<2:
                value='0'+value
            return value
    
        self.data=self.data.drop(['date','minute','year','month'],axis=1)
        catvar=['labeling','fn','day','hour','dayOfweek']
        for i in catvar:
            self.data[i]=self.data[i].astype('str')
        
        self.data['day']=self.data['day'].apply(lambda x:make_2digit(x))
        self.data['day']=self.data['day'].apply(lambda x:x+'d')
        self.data['hour']=self.data['hour'].apply(lambda x:make_2digit(x))
        self.data['hour']=self.data['hour'].apply(lambda x:x+'h')
        self.data['dayOfweek']=self.data['dayOfweek'].map({'0':'Mon','1':'Tue','2':'Wed','3':'Thu','4':'Fri','5':'Sat','6':'Sun'})

        return self.data

    # 가구수에 따른 지출 통계
    def fn_statistics(self,data):
        result=data.groupby(['user_id','fn']).sum().groupby('fn').describe()
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][1])
        result.columns=col_list
        return result
    
    '''
    fn_statistics=fn_statistics(users)
    '''
        
    # ----------------- For Clustering -----------------
    
    # 시간에 따른 품목 지출
    def hour_label(self,data):
        result=data.groupby(['user_id','hour','labeling'])['price'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    
    '''
    hour_label=hour_label(users)
    hour_label.to_csv('c://Users//river//Desktop//NH해커톤//NH-share-payment//sps-machine-learning//user_grouped//hour_label.csv', index=True)
    '''
    
    # 요일에 따른 품목 지출
    def weekday_label(self,data):
        result=data.groupby(['user_id','dayOfweek','labeling'])['price'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    
    '''
    weekday_label=weekday_label(users)
    weekday_label.to_csv('c://Users//river//Desktop//NH해커톤//NH-share-payment//sps-machine-learning//user_grouped//weekday_label.csv', index=True)
    '''
    
    # 날(day)에 따른 품목 지출
    def day_label(self,data):
        result=data.groupby(['user_id','day','labeling'])['price'].sum().unstack().fillna(0).unstack().fillna(0)
        col_list=list()
        for i in range(0,len(result.columns)):
            col_list.append(result.columns[i][0]+'-'+result.columns[i][1])
        
        result.columns=col_list
        return result
    
    '''
    day_label=day_label(users)
    day_label.to_csv('c://Users//river//Desktop//NH해커톤//NH-share-payment//sps-machine-learning//user_grouped//day_label.csv', index=True)
    '''
    def total_label(self,list):
        result=pd.concat(list,axis=1)
        
        return result
    # 위 3가지의 결과를 이어붙혀 특성으로 활용
    #total_label=pd.concat([day_label,weekday_label,hour_label], axis=1)
    #total_label.to_csv('c://Users//river//Desktop//NH해커톤//NH-share-payment//sps-machine-learning//user_grouped//total_label.csv', index=True)
