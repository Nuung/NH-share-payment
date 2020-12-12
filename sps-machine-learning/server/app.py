from flask import Flask, render_template,request
import requests
import json
import pandas as pd
#from random import randint
#import os


app=Flask(__name__)


@app.route('/go-server',methods=('GET','POST'))

def index():
    if request.method=='POST':
        
        IsTuno=request.form.get('IsTuno')
       
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        }

        data = '{ "Header": { "ApiNm": "InquireCreditCardAuthorizationHistory", "Tsymd": "20201213", "Trtm": "112428", "Iscd": "000571", "FintechApsno": "001", "ApiSvcCd": "CardInfo", "IsTuno": "'+IsTuno+'", "AccessToken": "38020bbc17d9f5dc06f82f69762b441f2b259cbfbf4b4b18a067d81c9515c8aa" }, "FinCard": "00829101234560000112345678919", "IousDsnc": "1", "Insymd": "20191105", "Ineymd": "20191109", "PageNo": "1", "Dmcnt": "15"}'

        response = requests.post('https://developers.nonghyup.com/InquireCreditCardAuthorizationHistory.nh', headers=headers, data=data)
        js=response.json()

        df=pd.DataFrame(js['REC'])
        print(df.head())

        #path=os.getcwd().rstrip('server')
        #user='abc412@nh.com'
        #os.system('python {path}user_cluster.py {user}'.format(path=path,user=user))

        return render_template('send_istuno.html',IsTuno=IsTuno)

    elif request.method=='GET':
        IsTuno=' '
        return render_template('send_istuno.html',IsTuno=IsTuno)

if __name__=="__main__":
    app.run(debug=True)
    #app.run(host='44.242.175.149', port='3001',debug=True)

