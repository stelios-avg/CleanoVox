import type { ImageSourcePropType } from 'react-native';

export type TeamCleaner = {
  /** Stable id stored on bookings (`preferred_cleaner`). Never rename. */
  id: string;
  nameEl: string;
  nameEn: string;
  rating: number;
  photo: ImageSourcePropType;
};

export const TEAM_CLEANERS: TeamCleaner[] = [
  {
    id: 'eleni',
    nameEl: 'Ελένη Παπαδοπούλου',
    nameEn: 'Eleni Papadopoulou',
    rating: 4.9,
    photo: require('../../assets/images/team/cleaner-1.png'),
  },
  {
    id: 'maria',
    nameEl: 'Μαρία Νικολάου',
    nameEn: 'Maria Nicolaou',
    rating: 5,
    photo: require('../../assets/images/team/cleaner-2.png'),
  },
  {
    id: 'anna',
    nameEl: 'Άννα Χριστοδούλου',
    nameEn: 'Anna Christodoulou',
    rating: 4.5,
    photo: require('../../assets/images/team/cleaner-3.png'),
  },
  {
    id: 'sofia',
    nameEl: 'Σοφία Ιωάννου',
    nameEn: 'Sofia Ioannou',
    rating: 5,
    photo: require('../../assets/images/team/cleaner-4.png'),
  },
];

export function cleanerById(id: string | null | undefined): TeamCleaner | null {
  if (!id) {
    return null;
  }
  return TEAM_CLEANERS.find((cleaner) => cleaner.id === id) ?? null;
}

/** Stable display cleaner for a booking until assignments are stored. */
export function cleanerForBooking(bookingId: string): TeamCleaner {
  let hash = 0;
  for (let i = 0; i < bookingId.length; i += 1) {
    hash = (hash + bookingId.charCodeAt(i)) % TEAM_CLEANERS.length;
  }
  return TEAM_CLEANERS[hash] ?? TEAM_CLEANERS[0];
}
