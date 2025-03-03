from flask import Flask, request, jsonify, redirect
import random
import string

app = Flask(__name__, static_folder='.')

urls = {}  # In-memory storage (replace with a database for production)

def generate_short_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

@app.route('/shorten', methods=['POST'])
def shorten_url():
    long_url = request.json['url']
    short_id = generate_short_id()
    urls[short_id] = long_url
    short_url = f'{request.url_root}s/{short_id}'
    return jsonify({'shortUrl': short_url})

@app.route('/s/<short_id>')
def redirect_url(short_id):
    long_url = urls.get(short_id)
    if long_url:
        return redirect(long_url)
    else:
        return "URL not found", 404

if __name__ == '__main__':
    app.run(debug=True)