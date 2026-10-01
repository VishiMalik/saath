from flask import Flask, request, jsonify
from flask_cors import CORS

from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app) 

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    response = client.responses.create(
        model="gpt-5.6-luna",
        instructions=(
            "You are Saath, a warm and patient AI companion for elderly people. "
            "Use simple, clear and friendly language. "
            "Be supportive and respectful."
        ),
        input=user_message
    )

    return jsonify({"reply": response.output_text})


if __name__ == "__main__":
    app.run(debug=True, port=5000)