// Patient Management Redux Slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  isLoading: false,
  error: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
      state.isLoading = false;
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(p => p.id !== action.payload);
    },
    setSelectedPatient: (state, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setPatients,
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  setLoading,
  setError,
} = patientSlice.actions;

export default patientSlice.reducer;
