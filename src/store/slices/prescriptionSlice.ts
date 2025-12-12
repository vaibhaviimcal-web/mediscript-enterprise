// Prescription Management Redux Slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  timing?: 'BEFORE_FOOD' | 'AFTER_FOOD' | 'WITH_FOOD' | 'EMPTY_STOMACH';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: Date;
  diagnosis: string;
  symptoms?: string;
  medicines: Medicine[];
  labTests?: string[];
  advice?: string;
  followUpDate?: Date;
  aiGenerated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PrescriptionState {
  prescriptions: Prescription[];
  selectedPrescription: Prescription | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PrescriptionState = {
  prescriptions: [],
  selectedPrescription: null,
  isLoading: false,
  error: null,
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    setPrescriptions: (state, action: PayloadAction<Prescription[]>) => {
      state.prescriptions = action.payload;
      state.isLoading = false;
    },
    addPrescription: (state, action: PayloadAction<Prescription>) => {
      state.prescriptions.push(action.payload);
    },
    updatePrescription: (state, action: PayloadAction<Prescription>) => {
      const index = state.prescriptions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.prescriptions[index] = action.payload;
      }
    },
    deletePrescription: (state, action: PayloadAction<string>) => {
      state.prescriptions = state.prescriptions.filter(p => p.id !== action.payload);
    },
    setSelectedPrescription: (state, action: PayloadAction<Prescription | null>) => {
      state.selectedPrescription = action.payload;
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
  setPrescriptions,
  addPrescription,
  updatePrescription,
  deletePrescription,
  setSelectedPrescription,
  setLoading,
  setError,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
