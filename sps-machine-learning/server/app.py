from flask import Flask,request,jsonify
import os

app=Flask(__name__)

@app.route('/getUser',methods=['POST'])
def getUser():
    user=request.get_json()
    user_id=user['userID']

    path=os.getcwd().rstrip('server')

    os.system('python {path}user_cluster.py {user_id}'.format(path=path, user_id=user_id))

    return 'OK'

if __name__=="__main__":
    #app.run(debug=True)
    app.run(host='44.242.175.149', port='3001',debug=True)

