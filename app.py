from flask import Flask, render_template, url_for, request, jsonify
from datetime import datetime
import pyrebase

app = Flask(__name__)

@app.route("/")                             # Landing Page
def index():
    return render_template("index.html")

@app.route("/authors")                      # Authors Page
def authors():
    return render_template("authors.html")

@app.route("/procedure")                    # Procedure Page
def procedure():
    return render_template("procedure.html")

@app.route("/results")                      # Results Page
def results():
    return render_template("results.html")

# Run server on local IP address on port 5000
if __name__ == "__main__":
    app.run(debug=False, host='10.133.132.212', port=5000)