from flask import Blueprint, request , jsonify
import joblib
import pandas as pd

jobd_bp = Blueprint('jobd_bp', __name__)

xg_model = joblib.load("xgb_salary_model.pkl")
rf_model = joblib.load("rf_salary_model.pkl")
encoder = joblib.load("salary_encoder.pkl")

@jobd_bp.route('/')
def hey():
    return "Welcome to the job salary prediction API "

@jobd_bp.route('/predict', methods = ['POST'])

def predict_salary():


    data = request.get_json()

    job_title  = data.get("job_title","")
    skills = data.get("skills","")
    experience = data.get("experience","")
    industry = data.get("industry","")
    location = data.get("location","")
    job_type = data.get("job_type","")
    model_choice = data.get("model", "rf")  # default to 'rf' if not provided



    # Creating dataframe
    job_data = pd.DataFrame([[job_title, skills, experience, industry, location, job_type]],
                            columns=["job_title", "skills", "experience", "industry", "location", "job_type"])

    # Encoding
    X_encoded = encoder.transform(job_data)

    # Model selection
    model = rf_model if model_choice == "rf" else xg_model

    # Predict
    predicted_salary = model.predict(X_encoded)[0]


    return jsonify({
    "predicted_salary": round(float(predicted_salary), 2),
    "model_used": "Random Forest" if model_choice == "rf" else "XGBoost"
})


