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
from .models import (db2016, db2017, db2018, db2019)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///all_data.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/weather/", methods=['POST', 'GET'])
def weather(self, session):
    if request.method == 'POST':
        
        results = session.query(db2016.Weather_Condition, db2017.Weather_Condition, db2018.Weather_Condition, db2019.Weather_Condition).distinct()
        
        return jsonify(results)    

@app.route("/dataq/", methods=['POST', 'GET'])
def dataq(self, session):

    year = request.args.get('year')
    weather = request.args.get('weather')
    env = request.args.get('env')

    if request.method == 'POST':

        if (year == "2016") & (weather != "") & (env != ""):
            results = session.query(db2016).filter(db2016.Weather_Condition == weather)
            # .filter(db_2016.?environments? == env)
        elif (year == "2016") & (weather != ""):
            results = session.query(db2016).filter(db2016.Weather_Condition == weather)
        elif (year == "2016") & (env != ""):
            results = session.query(db2016)
            # .filter(db_2016.?environments? == env)
        elif year == "2016":
            results = session.query(db2016)

        elif (year == "2017") & (weather != "") & (env != ""):
            results = session.query(db2017).filter(db2017.Weather_Condition == weather)
            # .filter(db_20176.?environments? == env)
        elif (year == "2017") & (weather != ""):
            results = session.query(db2017).filter(db2017.Weather_Condition == weather)
        elif (year == "2017") & (env != ""):
            results = session.query(db2017)
            # .filter(db_2017.?environments? == env)
        elif year == "2017":
            results = session.query(db2017)

        elif (year == "2018") & (weather != "") & (env != ""):
            results = session.query(db2018).filter(db2018.Weather_Condition == weather)
            # .filter(db_2018.?environments? == env)
        elif (year == "2018") & (weather != ""):
            results = session.query(db2018).filter(db2018.Weather_Condition == weather)
        elif (year == "2018") & (env != ""):
            results = session.query(db2018)
            # .filter(db_2018.?environments? == env)
        elif year == "2018":
            results = session.query(db2018)

        elif (year == "2019") & (weather != "") & (env != ""):
            results = session.query(db2019).filter(db2019.Weather_Condition == weather)
        # .filter(db_2019.?environments? == env)
        elif (year == "2019") & (weather != ""):
            results = session.query(db2019).filter(db2019.Weather_Condition == weather)
        elif (year == "2019") & (env != ""):
            results = session.query(db2019)
            # .filter(db_2019.?environments? == env)
        elif year == "2019":
            results = session.query(db2019)

        return jsonify(results)


if __name__ == "__main__":
    app.run()