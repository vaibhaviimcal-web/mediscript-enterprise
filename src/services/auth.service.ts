// Authentication Service
// Handles user authentication, registration, and role management

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase.config';
import { User, UserRole, getRolePermissions } from '@/types/user.types';

const googleProvider = new GoogleAuthProvider();

export class AuthService {
  /**
   * Register new user with email and password
   */
  static async registerWithEmail(
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ): Promise<User> {
    try {
      // Create Firebase auth user
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      await updateProfile(userCredential.user, { displayName });

      // Create user document in Firestore
      const userData: User = {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        role: role,
        permissions: getRolePermissions(role),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        mfaEnabled: false,
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return userData;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Failed to register user');
    }
  }

  /**
   * Sign in with email and password
   */
  static async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login
      await updateDoc(doc(db, 'users', userCredential.user.uid), {
        lastLogin: serverTimestamp(),
      });

      // Fetch user data
      return await this.getUserData(userCredential.user.uid);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  /**
   * Sign in with Google
   */
  static async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // New user - create with default PATIENT role
        const userData: User = {
          uid: result.user.uid,
          email: result.user.email!,
          displayName: result.user.displayName || 'User',
          role: UserRole.PATIENT,
          permissions: getRolePermissions(UserRole.PATIENT),
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: new Date(),
          mfaEnabled: false,
        };

        await setDoc(doc(db, 'users', result.user.uid), {
          ...userData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });

        return userData;
      } else {
        // Existing user - update last login
        await updateDoc(doc(db, 'users', result.user.uid), {
          lastLogin: serverTimestamp(),
        });

        return await this.getUserData(result.user.uid);
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  /**
   * Send password reset email
   */
  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  }

  /**
   * Get user data from Firestore
   */
  static async getUserData(uid: string): Promise<User> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const data = userDoc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate(),
      } as User;
    } catch (error: any) {
      console.error('Get user data error:', error);
      throw new Error(error.message || 'Failed to get user data');
    }
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return auth.currentUser !== null;
  }
}
