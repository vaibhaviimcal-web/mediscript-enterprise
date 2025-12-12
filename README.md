# 🏥 MediScript Enterprise

**AI-Powered Healthcare Management Platform**

## 🚀 Live Demo

Deploying to Vercel...

## ✨ Features

### Complete Authentication System
- ✅ Email/Password login
- ✅ Google Sign-In
- ✅ Role-based access control (RBAC)
- ✅ 8 user roles with granular permissions

### 8 Role-Based Dashboards

1. **Super Admin** - System-wide administration
2. **Admin** - Clinic management
3. **Doctor** - Patient care and prescriptions
4. **Nurse** - Vitals and patient assistance
5. **Receptionist** - Registration and billing
6. **Lab Technician** - Laboratory operations
7. **Pharmacist** - Pharmacy management
8. **Patient** - Personal health portal

### Technology Stack

- **Frontend:** React 18 + TypeScript
- **State Management:** Redux Toolkit
- **UI Framework:** Material-UI (MUI)
- **Backend:** Firebase (Authentication + Firestore)
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/vaibhaviimcal-web/mediscript-enterprise.git
cd mediscript-enterprise

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔧 Configuration

Create a `.env` file with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 📖 Documentation

- [Setup Guide](SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

## 🎯 Project Status

**Phase 1: Complete ✅**
- Authentication system
- 8 role-based dashboards
- Protected routing
- Material-UI design

**Phase 2: Coming Soon**
- Patient management (CRUD)
- Appointment scheduling
- AI prescription engine
- Billing module

## 🏗️ Architecture

```
mediscript-enterprise/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Dashboard pages
│   ├── store/          # Redux store
│   ├── services/       # API services
│   ├── types/          # TypeScript types
│   └── config/         # Configuration files
├── public/             # Static assets
└── docs/              # Documentation
```

## 👥 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| Super Admin | Full system access |
| Admin | Clinic management |
| Doctor | Patient care, prescriptions |
| Nurse | Vitals, patient assistance |
| Receptionist | Registration, billing |
| Lab Tech | Lab tests, results |
| Pharmacist | Pharmacy, inventory |
| Patient | Personal health records |

## 🔐 Security

- Firebase Authentication
- Role-based access control (RBAC)
- Protected routes
- Firestore security rules
- Environment variable protection

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop layouts
- Material-UI responsive components

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Developer

Built by MediScript Team

## 📞 Support

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/vaibhaviimcal-web/mediscript-enterprise/issues)
- Email: vaibhav.iimcal@gmail.com

---

**⭐ Star this repository if you find it helpful!**
