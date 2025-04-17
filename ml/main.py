from flask import Flask
from flask_cors import CORS
from salary_api.routes import salary_bp
from industry_api.routes import industry_bp
from jd_api.routes import jobd_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/")
def health_check():
    return "ML API Running", 200

# Register blueprints
app.register_blueprint(salary_bp, url_prefix='/salary')
app.register_blueprint(industry_bp, url_prefix='/industry')
app.register_blueprint(jobd_bp, url_prefix='/job-desc')

if __name__ == '__main__':
    app.run(debug=True)
