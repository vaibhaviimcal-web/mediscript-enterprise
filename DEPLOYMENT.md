# 🚀 MediScript Enterprise - Deployment Guide

## Firebase Hosting Deployment

### Automatic Deployment (GitHub Actions)

The project is configured for automatic deployment to Firebase Hosting whenever code is pushed to the `main` branch.

**Live URL:** https://mediscript-ai-78d2f.web.app

### Manual Deployment

If you need to deploy manually:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

### Environment Variables

For GitHub Actions deployment, add these secrets to your repository:

1. Go to GitHub repository settings
2. Navigate to Secrets and variables → Actions
3. Add the following secrets:

```
VITE_FIREBASE_API_KEY=AIzaSyAZH8VLSoUV5f2D9ptwIi6m3bTV3SZSwGg
VITE_FIREBASE_AUTH_DOMAIN=mediscript-ai-78d2f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mediscript-ai-78d2f
VITE_FIREBASE_STORAGE_BUCKET=mediscript-ai-78d2f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=590655526128
VITE_FIREBASE_APP_ID=1:590655526128:web:bd52e56obddd562fe1e35
VITE_FIREBASE_MEASUREMENT_ID=G-TYTEEY9SFC
FIREBASE_SERVICE_ACCOUNT=<your-service-account-json>
```

### Getting Firebase Service Account

1. Go to Firebase Console
2. Project Settings → Service Accounts
3. Generate new private key
4. Copy the entire JSON content
5. Add as `FIREBASE_SERVICE_ACCOUNT` secret in GitHub

### Deployment Status

Check deployment status:
- GitHub Actions tab in repository
- Firebase Console → Hosting

### Custom Domain (Optional)

To add a custom domain:

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the verification steps
4. Update DNS records as instructed

### Rollback

To rollback to a previous version:

```bash
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

## Testing After Deployment

### 1. Access the Application

Visit: https://mediscript-ai-78d2f.web.app

### 2. Create Test Users

Register users with different roles:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@test.com | Test@123 |
| Admin | admin@test.com | Test@123 |
| Doctor | doctor@test.com | Test@123 |
| Nurse | nurse@test.com | Test@123 |
| Receptionist | receptionist@test.com | Test@123 |
| Lab Tech | labtech@test.com | Test@123 |
| Pharmacist | pharmacist@test.com | Test@123 |
| Patient | patient@test.com | Test@123 |

### 3. Test Each Dashboard

1. Login with each user
2. Verify correct dashboard loads
3. Check navigation menu
4. Test logout functionality
5. Verify responsive design on mobile

### 4. Performance Testing

- Check page load speed
- Test on different devices
- Verify Firebase connection
- Check console for errors

## Monitoring

### Firebase Analytics

View analytics in Firebase Console:
- User engagement
- Page views
- User demographics
- Real-time users

### Error Tracking

Monitor errors:
- Firebase Console → Crashlytics
- Browser console logs
- Network tab for API errors

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Fails

- Check Firebase service account permissions
- Verify GitHub secrets are set correctly
- Check Firebase project quota

### 404 Errors

- Verify `firebase.json` rewrites configuration
- Check build output in `dist` folder
- Ensure `index.html` exists in dist

## Support

For deployment issues:
- Email: vaibhav.iimcal@gmail.com
- Repository: https://github.com/vaibhaviimcal-web/mediscript-enterprise

---

**Deployment Status:** ✅ Ready for Production

**Live URL:** https://mediscript-ai-78d2f.web.app
