# import necessary libraries
import os
import sqlalchemy
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

#################################################
# Database Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///data/all_data.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
# engine = create_engine("sqlite:///data/all_data.sqlite")
# Base = automap_base()
# Base.prepare(engine, reflect=True)
# db2016 = Base.classes.db_2016
# db2017 = Base.classes.db_2017
# db2018 = Base.classes.db_2018
# db2019 = Base.classes.db_2019
# session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("api/weather")
def weather():
    results = db.session.query(db_2016.Weather_Condition, 
                               db_2017.Weather_Condition, 
                               db_2018.Weather_Condition, 
                               db_2019.Weather_Condition)
    
    return jsonify(results)

@app.route("api/environment")
def environment():

    environments = ()
        
    return jsonify(environments)

@app.route("api/db2016")
def db2016():


@app.route("api/db2017")
def db2017():
    

@app.route("api/db2018")
def db2018():
    

@app.route("api/db2019")
def db2019():
    