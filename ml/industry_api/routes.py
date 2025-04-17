from flask import Blueprint, Flask, request, jsonify
import joblib



industry_bp = Blueprint('industry_bp', __name__)

# Step 1: Load everything you trained earlier
# These are your pre-saved model files
tfidf = joblib.load("tfidf_vectorizer.pkl")  # Converts text to numbers
model = joblib.load("industry_rf_model_vec.pkl")  # Trained classifier
le = joblib.load("industry_label_encoder_vec.pkl")  # Label encoder to get readable output

@industry_bp.route('/')
def hello():
    return "Industry Prediction API is running!"

# Step 2: Define the predict route
@industry_bp.route('/predict', methods=['POST'])
def predict():
    # Get the input text from the POST request
    data = request.get_json()
    job_desc = data.get("job_description", "")
    skills = data.get("required_skills", "")
    experience_level = data.get("experience_level", "")

    # Join all text fields to create one input string
    combined_text = f"{job_desc} {skills} {experience_level}"

    # Transform using TF-IDF
    text_vector = tfidf.transform([combined_text])

    # Predict
    prediction = model.predict(text_vector)

    # Decode label
    predicted_label = le.inverse_transform(prediction)[0]

    return jsonify({'prediction': predicted_label})