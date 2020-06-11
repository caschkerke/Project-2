# import necessary libraries.
import os
import sqlalchemy
import json
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///database_2019.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)

class db2019(db.Model):
    __table__ = db.Model.metadata.tables['db_2019']

    def __repr__(self):
        return self.DISTRICT

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data", methods=['POST', 'GET'])
def data():
    
    if request.method == 'POST':

        weather = request.form['weather']
        env = request.form['env']

        if weather != "" & env != "":
            response = db2019.query.filter(db2019.Weather_Condition == weather & db2019.env.value >= 1)

        elif weather != "":
            response = db2019.query.filter(db2019.Weather_Condition == weather)

        elif env != "":
            response = db2019.query.filter(db2019.env.value >= 1)

        else:
            response = db2019.query.all()

    else:
        response = db2019.query.all()

    return print(response)
        

if __name__ == "__main__":
    app.run(debug=True)