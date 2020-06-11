# import necessary libraries.
import os
import sqlalchemy
import json
import requests
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

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///all_data.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
db.Model.metadata.reflect(db.engine)


# creating classes that refer to the existing tables.
class db2016(db.Model):
    __table__ = db.Model.metadata.tables['db_2016']

class db2017(db.Model):
    __table__ = db.Model.metadata.tables['db_2017']

class db2018(db.Model):
    __table__ = db.Model.metadata.tables['db_2018']

class db2019(db.Model):
    __table__ = db.Model.metadata.tables['db_2019']

class distwea(db.Model):
    __table__ = db.Model.metadata.tables['db_distwea']

# create route that renders index.html template
@app.route("/")
def home():

    year = request.args.get('year')
    weather = request.args.get('weather')
    env = request.args.get('env')

    # Attempted to declare response as a global variable to avoid error, still returns nameError
    # global response

    # Returns list weather condition options as found in tables, however the return is formatted as "('return'),"
    # weaList = distwea.query.value(distwea.Weather_Condition)
    
    if year == "2016":
        db = db2016
        if weather != "" & env != "":
            response = db.query.filter(db.Weather_Condition == weather & db.env.value >= 1)

        elif weather != "":
            response = db.query.filter(db.Weather_Condition == weather)

        elif env != "":
            response = db.query.filter(db.env.value >= 1)

        else:
            response = db.query

    if year == "2017":
        db = db2017
        if weather != "" & env != "":
            response = db.query.filter(db.Weather_Condition == weather & db.env.value >= 1)

        elif weather != "":
            response = db.query.filter(db.Weather_Condition == weather)

        elif env != "":
            response = db.query.filter(db.env.value >= 1)

        else:
            response = db.query

    if year == "2018":
        db = db2018
        if weather != "" & env != "":
            response = db.query.filter(db.Weather_Condition == weather & db.env.value >= 1)

        elif weather != "":
            response = db.query.filter(db.Weather_Condition == weather)

        elif env != "":
            response = db.query.filter(db.env.value >= 1)

        else:
            response = db.query

    elif year == "2019":
        db = db2019
        if weather != "" & env != "":
            response = db.query.filter(db.Weather_Condition == weather & db.env.value >= 1)

        elif weather != "":
            response = db.query.filter(db.Weather_Condition == weather)

        elif env != "":
            response = db.query.filter(db.env.value >= 1)

        else:
            response = db.query

    return render_template("index.html", query=response)

# @app.route("/data/<data>", methods=['POST', 'GET'])
# def dataq(data, session):



#     if request.method == ['POST']:

#         result = select([%s])

#         return jsonify(result)

# @app.route("/menu/", methods=['POST', 'GET'])
# def weather(self, session):

#     if request.method == ['GET']:
        
#         result = session.query(db2016.Weather_Condition, db2017.Weather_Condition, db2018.Weather_Condition, db2019.Weather_Condition).distinct()
        
#         return jsonify(result)  


if __name__ == "__main__":
    app.run(debug=True)