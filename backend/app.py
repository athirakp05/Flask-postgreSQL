from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend to call API

@app.route('/')
def home():
    return jsonify({"message": "Flask API is working!"})

if __name__ == '__main__':
    app.run(debug=True)
