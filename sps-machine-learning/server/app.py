from flask import Flask, render_template

app=Flask(__name__)

@app.route('/go-server')
def index():
    return render_template('user_name.html')

if __name__=="__main__":
    app.run(debug=True)
    #app.run(host='44.242.175.149', port='3000',debug=True)
    