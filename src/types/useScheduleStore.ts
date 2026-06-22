import { create } from 'zustand';
import type { Member, LocationId, ScheduleRow } from '../types/types';

interface ScheduleState {
  members: Member[];
  schedules: Record<LocationId, ScheduleRow[]>;
  addMember: (name: string) => void;
  deleteMember: (id: string) => void;
  addScheduleRow: (locationId: LocationId, date: string) => void;
  updateAssignment: (locationId: LocationId, rowId: string, roleKey: string, memberId: string) => void;
  updateRowDate: (locationId: LocationId, rowId: string, date: string) => void;
  deleteScheduleRow: (locationId: LocationId, rowId: string) => void;
  isMemberAssignedElsewhere: (memberId: string, date: string, currentLocationId: LocationId, currentRowId: string, currentRoleKey: string) => boolean;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  members: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mark Carpio' },
    { id: '4', name: 'Sarah Geronimo' },
  ],
  schedules: {
    LNHC: [],
    Tangway: [],
    GarciaRosario: [],
  },

  addMember: (name) => set((state) => ({
    members: [...state.members, { id: crypto.randomUUID(), name }]
  })),

  deleteMember: (id) => set((state) => ({
    members: state.members.filter(m => m.id !== id)
  })),

  addScheduleRow: (locationId, date) => set((state) => {
    const newRow: ScheduleRow = {
      id: crypto.randomUUID(),
      date: date || new Date().toISOString().split('T')[0],
      assignments: {},
    };
    return {
      schedules: {
        ...state.schedules,
        [locationId]: [...state.schedules[locationId], newRow],
      },
    };
  }),

  updateRowDate: (locationId, rowId, date) => set((state) => ({
    schedules: {
      ...state.schedules,
      [locationId]: state.schedules[locationId].map((row) =>
        row.id === rowId ? { ...row, date, assignments: {} } : row // Clear assignments on date change to reset conflicts safely
      ),
    },
  })),

  updateAssignment: (locationId, rowId, roleKey, memberId) => set((state) => ({
    schedules: {
      ...state.schedules,
      [locationId]: state.schedules[locationId].map((row) =>
        row.id === rowId
          ? { ...row, assignments: { ...row.assignments, [roleKey]: memberId } }
          : row
      ),
    },
  })),

  deleteScheduleRow: (locationId, rowId) => set((state) => ({
    schedules: {
      ...state.schedules,
      [locationId]: state.schedules[locationId].filter((row) => row.id !== rowId),
    },
  })),

  // Core validation conflict check engine
  isMemberAssignedElsewhere: (memberId, date, currentLocationId, currentRowId, currentRoleKey) => {
    if (!memberId || !date) return false;
    const { schedules } = get();

    for (const locId of Object.keys(schedules) as LocationId[]) {
      for (const row of schedules[locId]) {
        if (row.date === date) {
          for (const [roleKey, assignedMemberId] of Object.entries(row.assignments)) {
            if (assignedMemberId === memberId) {
              // Ignore if it's the exact same cell we are evaluating
              if (locId === currentLocationId && row.id === currentRowId && roleKey === currentRoleKey) {
                continue;
              }
              return true; // Conflict found
            }
          }
        }
      }
    }
    return false;
  },
}));