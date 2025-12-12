// User Role Types for MediScript Enterprise
// 8 distinct roles with granular permissions

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  PHARMACIST = 'PHARMACIST',
  PATIENT = 'PATIENT',
}

export enum Permission {
  // System Management
  MANAGE_SYSTEM = 'MANAGE_SYSTEM',
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_CLINICS = 'MANAGE_CLINICS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  
  // Patient Management
  CREATE_PATIENT = 'CREATE_PATIENT',
  VIEW_PATIENT = 'VIEW_PATIENT',
  EDIT_PATIENT = 'EDIT_PATIENT',
  DELETE_PATIENT = 'DELETE_PATIENT',
  VIEW_MEDICAL_RECORDS = 'VIEW_MEDICAL_RECORDS',
  EDIT_MEDICAL_RECORDS = 'EDIT_MEDICAL_RECORDS',
  
  // Prescriptions
  CREATE_PRESCRIPTION = 'CREATE_PRESCRIPTION',
  VIEW_PRESCRIPTION = 'VIEW_PRESCRIPTION',
  EDIT_PRESCRIPTION = 'EDIT_PRESCRIPTION',
  DELETE_PRESCRIPTION = 'DELETE_PRESCRIPTION',
  
  // Appointments
  CREATE_APPOINTMENT = 'CREATE_APPOINTMENT',
  VIEW_APPOINTMENT = 'VIEW_APPOINTMENT',
  EDIT_APPOINTMENT = 'EDIT_APPOINTMENT',
  DELETE_APPOINTMENT = 'DELETE_APPOINTMENT',
  
  // Billing
  CREATE_INVOICE = 'CREATE_INVOICE',
  VIEW_INVOICE = 'VIEW_INVOICE',
  PROCESS_PAYMENT = 'PROCESS_PAYMENT',
  
  // Lab
  CREATE_LAB_ORDER = 'CREATE_LAB_ORDER',
  VIEW_LAB_ORDER = 'VIEW_LAB_ORDER',
  ENTER_LAB_RESULTS = 'ENTER_LAB_RESULTS',
  
  // Pharmacy
  VIEW_PHARMACY_ORDERS = 'VIEW_PHARMACY_ORDERS',
  DISPENSE_MEDICINE = 'DISPENSE_MEDICINE',
  MANAGE_INVENTORY = 'MANAGE_INVENTORY',
  
  // Vitals
  ENTER_VITALS = 'ENTER_VITALS',
  VIEW_VITALS = 'VIEW_VITALS',
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  permissions: Permission[];
  clinicId?: string;
  phoneNumber?: string;
  photoURL?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  mfaEnabled: boolean;
}

export interface UserProfile extends User {
  address?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  specialization?: string; // For doctors
  licenseNumber?: string; // For doctors, nurses
  department?: string;
}

// Role-Permission Matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission), // All permissions
  
  [UserRole.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.MANAGE_CLINICS,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_PATIENT,
    Permission.VIEW_APPOINTMENT,
    Permission.VIEW_INVOICE,
    Permission.VIEW_LAB_ORDER,
    Permission.VIEW_PHARMACY_ORDERS,
  ],
  
  [UserRole.DOCTOR]: [
    Permission.CREATE_PATIENT,
    Permission.VIEW_PATIENT,
    Permission.EDIT_PATIENT,
    Permission.VIEW_MEDICAL_RECORDS,
    Permission.EDIT_MEDICAL_RECORDS,
    Permission.CREATE_PRESCRIPTION,
    Permission.VIEW_PRESCRIPTION,
    Permission.EDIT_PRESCRIPTION,
    Permission.CREATE_APPOINTMENT,
    Permission.VIEW_APPOINTMENT,
    Permission.EDIT_APPOINTMENT,
    Permission.CREATE_LAB_ORDER,
    Permission.VIEW_LAB_ORDER,
    Permission.VIEW_VITALS,
  ],
  
  [UserRole.NURSE]: [
    Permission.VIEW_PATIENT,
    Permission.VIEW_MEDICAL_RECORDS,
    Permission.VIEW_PRESCRIPTION,
    Permission.VIEW_APPOINTMENT,
    Permission.ENTER_VITALS,
    Permission.VIEW_VITALS,
    Permission.VIEW_LAB_ORDER,
  ],
  
  [UserRole.RECEPTIONIST]: [
    Permission.CREATE_PATIENT,
    Permission.VIEW_PATIENT,
    Permission.EDIT_PATIENT,
    Permission.CREATE_APPOINTMENT,
    Permission.VIEW_APPOINTMENT,
    Permission.EDIT_APPOINTMENT,
    Permission.DELETE_APPOINTMENT,
    Permission.CREATE_INVOICE,
    Permission.VIEW_INVOICE,
    Permission.PROCESS_PAYMENT,
  ],
  
  [UserRole.LAB_TECHNICIAN]: [
    Permission.VIEW_LAB_ORDER,
    Permission.ENTER_LAB_RESULTS,
    Permission.VIEW_PATIENT,
  ],
  
  [UserRole.PHARMACIST]: [
    Permission.VIEW_PHARMACY_ORDERS,
    Permission.DISPENSE_MEDICINE,
    Permission.MANAGE_INVENTORY,
    Permission.VIEW_PATIENT,
    Permission.VIEW_PRESCRIPTION,
  ],
  
  [UserRole.PATIENT]: [
    Permission.VIEW_PATIENT, // Own records only
    Permission.VIEW_PRESCRIPTION, // Own prescriptions only
    Permission.VIEW_APPOINTMENT, // Own appointments only
    Permission.CREATE_APPOINTMENT, // Book own appointments
    Permission.VIEW_INVOICE, // Own invoices only
  ],
};

export const getRolePermissions = (role: UserRole): Permission[] => {
  return ROLE_PERMISSIONS[role] || [];
};

export const hasPermission = (user: User, permission: Permission): boolean => {
  return user.permissions.includes(permission);
};

export const hasAnyPermission = (user: User, permissions: Permission[]): boolean => {
  return permissions.some(permission => user.permissions.includes(permission));
};

export const hasAllPermissions = (user: User, permissions: Permission[]): boolean => {
  return permissions.every(permission => user.permissions.includes(permission));
};
