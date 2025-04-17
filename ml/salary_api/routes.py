from flask import Blueprint, request, jsonify
import pickle
import pandas as pd


salary_bp = Blueprint('salary_bp', __name__)


with open('salary_model.pkl','rb') as file:
    model = pickle.load(file)


@salary_bp.route('/predict',methods=['POST'])
def predict_salary():
    data=request.get_json()

    location = data.get('location')
    job_title = data.get('job_title')

    input_df = pd.DataFrame([{
        'Location': location,
        'Job Title': job_title}])

    prediction = model.predict(input_df)[0]
    return jsonify({'Estimated Salary': prediction})

