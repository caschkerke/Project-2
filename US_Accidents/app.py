# import necessary libraries.
import os
import sqlalchemy
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

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dataq", methods=['POST'])
def dataq():

    if request.method == 'POST':

        if (year == "2016") & (weather != "") & (env != ""):
            results = session.query(db_2016).filter(db_2016.Weather_Condition == weather)
            # .filter(db_2016.?environments? == env)
        elif (year == "2016") & (weather != ""):
            results = session.query(db_2016).filter(db_2016.Weather_Condition == weather)
        elif (year == "2016") & (env != ""):
            results = session.query(db_2016)
            # .filter(db_2016.?environments? == env)
        elif year == "2016":
            results = session.query(db_2016)

        elif (year == "2017") & (weather != "") & (env != ""):
            results = session.query(db_2017).filter(db_2017.Weather_Condition == weather)
            # .filter(db_20176.?environments? == env)
        elif (year == "2017") & (weather != ""):
            results = session.query(db_2017).filter(db_2017.Weather_Condition == weather)
        elif (year == "2017") & (env != ""):
            results = session.query(db_2017)
            # .filter(db_2017.?environments? == env)
        elif year == "2017":
            results = session.query(db_2017)

        elif (year == "2018") & (weather != "") & (env != ""):
            results = session.query(db_2018).filter(db_2018.Weather_Condition == weather)
            # .filter(db_2018.?environments? == env)
        elif (year == "2018") & (weather != ""):
            results = session.query(db_2018).filter(db_2018.Weather_Condition == weather)
        elif (year == "2018") & (env != ""):
            results = session.query(db_2018)
            # .filter(db_2018.?environments? == env)
        elif year == "2018":
            results = session.query(db_2018)

        elif (year == "2019") & (weather != "") & (env != ""):
            results = session.query(db_2019).filter(db_2019.Weather_Condition == weather)
        # .filter(db_2019.?environments? == env)
        elif (year == "2019") & (weather != ""):
            results = session.query(db_2019).filter(db_2019.Weather_Condition == weather)
        elif (year == "2019") & (env != ""):
            results = session.query(db_2019)
            # .filter(db_2019.?environments? == env)
        elif year == "2019":
            results = session.query(db_2019)

        return jsonify(results)


if __name__ == "__main__":
    app.run()