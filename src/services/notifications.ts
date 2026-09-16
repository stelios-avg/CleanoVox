import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { supabase } from '../lib/supabase';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let cachedToken: string | null = null;

export function getCachedPushToken(): string | null {
  return cachedToken;
}

function easProjectId(): string | undefined {
  return (
    Constants.easConfig?.projectId ??
    (Constants.expoConfig?.extra?.eas as { projectId?: string } | undefined)?.projectId
  );
}

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') {
    return;
  }
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Κρατήσεις',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#30CCCC',
  });
}

function remotePushSupported(): boolean {
  // SDK 55+: remote push in Expo Go on Android throws instead of warning.
  return !(Platform.OS === 'android' && Constants.appOwnership === 'expo');
}

export function remotePushWorks(): boolean {
  return Boolean(cachedToken) && remotePushSupported();
}

/** Asks permission and stores an Expo push token when the device supports it. */
export async function registerPushNotifications(): Promise<string | null> {
  try {
    await ensureAndroidChannel();
  } catch {
    return null;
  }

  const existing = await Notifications.getPermissionsAsync();
  let status = existing.status;
  if (status !== 'granted') {
    const asked = await Notifications.requestPermissionsAsync();
    status = asked.status;
  }
  if (status !== 'granted') {
    return null;
  }

  if (!remotePushSupported()) {
    return null;
  }

  try {
    const projectId = easProjectId();
    const token = projectId
      ? (await Notifications.getExpoPushTokenAsync({ projectId })).data
      : (await Notifications.getExpoPushTokenAsync()).data;
    cachedToken = token;
    return token;
  } catch {
    cachedToken = null;
    return null;
  }
}

export async function savePushTokenToProfile(userId: string, token: string): Promise<void> {
  await supabase.from('profiles').update({ push_token: token }).eq('id', userId);
}

const CYPRUS_TZ = 'Europe/Nicosia';

function offsetMsAt(instant: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      map[part.type] = part.value;
    }
  }
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return asUtc - instant.getTime();
}

function arrivalInstant(serviceDate: string, arrivalTime: string): Date | null {
  const [year, month, day] = serviceDate.split('-').map(Number);
  const [hour, minute] = arrivalTime.split(':').map(Number);
  if (![year, month, day, hour, minute].every((n) => Number.isFinite(n))) {
    return null;
  }
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let instant = utcGuess - offsetMsAt(new Date(utcGuess), CYPRUS_TZ);
  instant = Date.UTC(year, month - 1, day, hour, minute, 0) - offsetMsAt(new Date(instant), CYPRUS_TZ);
  return new Date(instant);
}

export function formatArrivalWhen(
  serviceDate: string,
  arrivalTime: string,
  locale: string
): string {
  const dateLabel = new Date(`${serviceDate}T12:00:00`).toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return `${dateLabel} · ${arrivalTime}`;
}

export function isWithinArrivalReminderWindow(serviceDate: string, arrivalTime: string): boolean {
  const arrival = arrivalInstant(serviceDate, arrivalTime);
  if (!arrival) {
    return false;
  }
  const now = Date.now();
  return arrival.getTime() - 3_600_000 <= now && now < arrival.getTime();
}

function arrivalReminderId(bookingId: string) {
  return `booking-arrival-1h-${bookingId}`;
}

export async function cancelArrivalReminder(bookingId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(arrivalReminderId(bookingId)).catch(() => {});
}

/** Local 1-hour-before backup when remote Expo push is unavailable (Android Expo Go). */
export async function scheduleArrivalReminder(input: {
  bookingId: string;
  serviceDate: string;
  arrivalTime: string;
  address?: string | null;
  title: string;
  body: string;
  /** When due already, show immediately. Off for app-launch hydrate so it does not spam. */
  presentIfDue?: boolean;
}): Promise<void> {
  const arrival = arrivalInstant(input.serviceDate, input.arrivalTime);
  if (!arrival) {
    return;
  }
  const now = Date.now();
  if (arrival.getTime() <= now) {
    await cancelArrivalReminder(input.bookingId);
    return;
  }

  const remindAt = new Date(arrival.getTime() - 3_600_000);
  const isDue = remindAt.getTime() <= now + 5000;
  if (isDue && !input.presentIfDue) {
    return;
  }

  await ensureAndroidChannel();
  await cancelArrivalReminder(input.bookingId);

  await Notifications.scheduleNotificationAsync({
    identifier: arrivalReminderId(input.bookingId),
    content: {
      title: input.title,
      body: input.body,
      sound: 'default',
      data: {
        bookingId: input.bookingId,
        type: 'booking_arrival_soon',
        address: input.address ?? '',
      },
    },
    trigger: isDue
      ? null
      : {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: remindAt,
        },
  });
}

export async function presentArrivalNotice(input: {
  bookingId: string;
  serviceDate: string;
  arrivalTime: string;
  locale: string;
  title: string;
  body: string;
  address?: string | null;
}): Promise<void> {
  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    identifier: `booking-accepted-${input.bookingId}`,
    content: {
      title: input.title,
      body: input.body,
      sound: 'default',
      data: {
        bookingId: input.bookingId,
        type: 'booking_accepted',
        address: input.address ?? '',
      },
    },
    trigger: null,
  });
}

export async function presentRejectedNotice(input: {
  bookingId: string;
  title: string;
  body: string;
}): Promise<void> {
  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    identifier: `booking-rejected-${input.bookingId}`,
    content: {
      title: input.title,
      body: input.body,
      sound: 'default',
      data: {
        bookingId: input.bookingId,
        type: 'booking_rejected',
      },
    },
    trigger: null,
  });
}

export async function presentCompletedNotice(input: {
  bookingId: string;
  title: string;
  body: string;
  serviceDate?: string;
  timeSlot?: string;
  address?: string;
}): Promise<void> {
  await ensureAndroidChannel();
  await Notifications.scheduleNotificationAsync({
    identifier: `booking-completed-${input.bookingId}`,
    content: {
      title: input.title,
      body: input.body,
      sound: 'default',
      data: {
        bookingId: input.bookingId,
        type: 'booking_completed',
        serviceDate: input.serviceDate ?? '',
        timeSlot: input.timeSlot ?? '',
        address: input.address ?? '',
      },
    },
    trigger: null,
  });
}

export function parseNoticeData(data: unknown): {
  type: string;
  bookingId: string;
  serviceDate?: string;
  timeSlot?: string;
  address?: string;
} | null {
  if (!data || typeof data !== 'object') {
    return null;
  }
  const record = data as Record<string, unknown>;
  const bookingId = typeof record.bookingId === 'string' ? record.bookingId : '';
  const type = typeof record.type === 'string' ? record.type : '';
  if (!bookingId || !type) {
    return null;
  }
  const optional = (value: unknown) =>
    typeof value === 'string' && value.length > 0 ? value : undefined;
  return {
    type,
    bookingId,
    serviceDate: optional(record.serviceDate),
    timeSlot: optional(record.timeSlot),
    address: optional(record.address),
  };
}
