import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# Inisialisasi Firebase Admin SDK
cred = credentials.Certificate("firebase-credentials.json")  # Ganti dengan path ke file JSON Firebase Anda
firebase_admin.initialize_app(cred)

# Inisialisasi Firestore
db = firestore.client()

@app.route('/submit-form', methods=['POST'])
def submit_form():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    # Simpan data ke Firestore
    data = db.collection('submissions').add({
        'name': name,
        'email': email,
        'message': message,
    })

    return jsonify({'success': True, 'message': 'Form berhasil dikirim dan data disimpan ke Firestore!'}, data=data)






if __name__ == '__main__':
    app.run(debug=True)
