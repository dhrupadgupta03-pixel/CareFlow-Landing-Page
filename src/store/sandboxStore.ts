import { create } from 'zustand';

type BookingStatus = 'none' | 'pending_approval' | 'approved';

interface SandboxState {
    bookingStatus: BookingStatus;
    patientName: string;
    sandboxMode: boolean;
    setBookingStatus: (status: BookingStatus) => void;
    setPatientName: (name: string) => void;
    setSandboxMode: (enabled: boolean) => void;
    resetSandbox: () => void;
}

export const useSandboxStore = create<SandboxState>((set) => ({
    bookingStatus: 'none',
    patientName: 'John Doe (Demo)',
    sandboxMode: true, // defaults to true for the marketing flow
    setBookingStatus: (status) => set({ bookingStatus: status }),
    setPatientName: (name) => set({ patientName: name }),
    setSandboxMode: (enabled) => set({ sandboxMode: enabled }),
    resetSandbox: () => set({ bookingStatus: 'none', patientName: 'John Doe (Demo)' }),
}));
