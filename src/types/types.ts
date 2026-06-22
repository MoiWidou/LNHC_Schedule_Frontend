export interface Member {
  id: string;
  name: string;
}

export type LocationId = 'LNHC' | 'Tangway' | 'GarciaRosario';

export interface ScheduleRow {
  id: string;
  date: string; // YYYY-MM-DD
  assignments: Record<string, string>; // RoleKey -> MemberId
}

export interface LocationConfig {
  id: LocationId;
  name: string;
  roles: { key: string; label: string }[];
}

export const LOCATION_CONFIGS: Record<LocationId, LocationConfig> = {
  LNHC: {
    id: 'LNHC',
    name: 'LNHC',
    roles: [
      { key: 'songLeader', label: 'Song Leader' },
      { key: 'backup', label: 'Backup' },
      { key: 'leadGuitar', label: 'Lead Guitar' },
      { key: 'acoustic', label: 'Acoustic' },
      { key: 'bass', label: 'Bass' },
      { key: 'keyboard', label: 'Keyboard' },
      { key: 'drummer', label: 'Drummer' },
      { key: 'soundTech', label: 'Sound Tech' },
      { key: 'easyWorship', label: 'Easy Worship' },
    ],
  },
  Tangway: {
    id: 'Tangway',
    name: 'Tangway',
    roles: [
      { key: 'songLeader', label: 'Song Leader' },
      { key: 'musician', label: 'Musician' },
      { key: 'multimedia', label: 'Multimedia' },
      { key: 'soundTech', label: 'Sound Tech' },
    ],
  },
  GarciaRosario: {
    id: 'GarciaRosario',
    name: 'Garcia/Rosario',
    roles: [
      { key: 'singer', label: 'Singer' },
      { key: 'musicians', label: 'Musicians' },
    ],
  },
};