# 🚀 MediScript Enterprise - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Firebase account
- Git installed

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/vaibhaviimcal-web/mediscript-enterprise.git
cd mediscript-enterprise
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyAZH8VLSoUV5f2D9ptwIi6m3bTV3SZSwGg
VITE_FIREBASE_AUTH_DOMAIN=mediscript-ai-78d2f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mediscript-ai-78d2f
VITE_FIREBASE_STORAGE_BUCKET=mediscript-ai-78d2f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=590655526128
VITE_FIREBASE_APP_ID=1:590655526128:web:bd52e56obddd562fe1e35
VITE_FIREBASE_MEASUREMENT_ID=G-TYTEEY9SFC
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for Production

```bash
npm run build
```

## Firebase Setup

### 1. Enable Authentication

1. Go to Firebase Console
2. Navigate to Authentication
3. Enable Email/Password provider
4. Enable Google provider
5. Add authorized domain: `localhost`

### 2. Create Firestore Database

1. Go to Firestore Database
2. Create database in production mode
3. Set location: `asia-south1` (Mumbai, India)

### 3. Set Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['SUPER_ADMIN', 'ADMIN'];
    }
    
    // Patients collection
    match /patients/{patientId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['DOCTOR', 'RECEPTIONIST', 'ADMIN', 'SUPER_ADMIN'];
      allow update, delete: if request.auth != null && 
                              get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['DOCTOR', 'ADMIN', 'SUPER_ADMIN'];
    }
    
    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Select:
# - Hosting
# - Use existing project: mediscript-ai-78d2f
# - Public directory: dist
# - Single-page app: Yes
# - GitHub Actions: No

# Build and deploy
npm run build
firebase deploy
```

## Testing

### Create Test Users

Use the registration page to create users with different roles:

1. **Super Admin:** superadmin@test.com
2. **Admin:** admin@test.com
3. **Doctor:** doctor@test.com
4. **Nurse:** nurse@test.com
5. **Receptionist:** receptionist@test.com
6. **Lab Tech:** labtech@test.com
7. **Pharmacist:** pharmacist@test.com
8. **Patient:** patient@test.com

Password for all: `Test@123`

### Test Each Role

1. Login with each user
2. Verify correct dashboard loads
3. Check navigation menu
4. Test logout functionality

## Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Firebase Connection Issues

- Check Firebase credentials in `.env`
- Verify Firebase project is active
- Check authorized domains in Firebase Console

### Authentication Issues

- Verify Email/Password provider is enabled
- Check Google provider configuration
- Verify authorized domains include your deployment URL

## Support

For issues, contact: vaibhav.iimcal@gmail.com
