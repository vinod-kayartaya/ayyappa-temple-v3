from flask import Flask, request, jsonify
from flask_cors import CORS
from printer_utils import print_bill

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/print-bill', methods=['POST'])
def handle_print_bill():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate request data
        if not data:
            return jsonify({
                'success': False,
                'message': 'TEST MESSAGE: Invalid request. Expected JSON data.'
            }), 400
            
        # Validate required fields
        required_fields = ['billNumber', 'transactionDate', 'items', 'totalAmount']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'message': f'TEST MESSAGE: Missing required field: {field}'
                }), 400
        
        # Validate items format
        if not isinstance(data['items'], list):
            return jsonify({
                'success': False,
                'message': 'TEST MESSAGE: Items must be an array'
            }), 400
            
        for item in data['items']:
            required_item_fields = ['vazhipaduName', 'devoteeName', 'devoteeNakshtram', 'deityName', 'amount']
            for field in required_item_fields:
                if field not in item:
                    return jsonify({
                        'success': False,
                        'message': f'TEST MESSAGE: Missing required field in item: {field}'
                    }), 400
        
        # Print the bill
        success, message = print_bill(data)
        
        if success:
            return jsonify({
                'success': True,
                'message': message
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': message
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Server error: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 