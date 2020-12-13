from flask import Flask,request,jsonify
import os

app=Flask(__name__)

@app.route('/getUser',methods=['POST'])
def getUser():
    user=request.get_json()
    user_id=user['id']

    path=os.getcwd().rstrip('server')

    os.system('python3 {path}user_cluster.py {user_id}'.format(path=path, user_id=user_id))

    return 'OK'

if __name__=="__main__":
    #app.run(debug=True)
    app.run(host='0.0.0.0', port='3001',debug=True)

