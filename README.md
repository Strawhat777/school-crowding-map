from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

areas = {
    "Main Gate": {"status": "medium", "people": 15},
    "Admin Office": {"status": "low", "people": 5},
    "Main Corridor": {"status": "high", "people": 38},
    "Library": {"status": "medium", "people": 20},
    "Canteen": {"status": "high", "people": 45},
    "Science Lab": {"status": "medium", "people": 25},
    "Classroom A": {"status": "low", "people": 10},
    "Classroom B": {"status": "medium", "people": 24},
    "Classroom C": {"status": "high", "people": 35},
    "Staff Room": {"status": "low", "people": 8},
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/areas')
def get_areas():
    return jsonify(areas)

@app.route('/api/areas/<area_name>/status', methods=['POST'])
def update_status(area_name):
    data = request.json
    if area_name in areas:
        areas[area_name]['status'] = data['status']
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)
