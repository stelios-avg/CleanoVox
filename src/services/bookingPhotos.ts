import { supabase } from '../lib/supabase';

export const BOOKING_PHOTO_BUCKET = 'booking-photos';
export const MAX_BOOKING_PHOTOS = 4;
export const MAX_BOOKING_NOTES = 1000;

/** UUID v4 without `crypto`, which is missing in Expo Go's Hermes. */
function newId(): string {
  const bytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function extensionFor(uri: string): 'jpg' | 'png' | 'webp' | 'heic' | 'heif' {
  const lower = uri.split('?')[0].toLowerCase();
  if (lower.endsWith('.png')) {
    return 'png';
  }
  if (lower.endsWith('.webp')) {
    return 'webp';
  }
  if (lower.endsWith('.heif')) {
    return 'heif';
  }
  if (lower.endsWith('.heic')) {
    return 'heic';
  }
  return 'jpg';
}

function contentType(ext: ReturnType<typeof extensionFor>): string {
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'heic':
      return 'image/heic';
    case 'heif':
      return 'image/heif';
    default:
      return 'image/jpeg';
  }
}

/** Uploads checkout photos to Storage. Skips files that fail so payment can still complete. */
export async function uploadBookingPhotos(localUris: string[]): Promise<string[]> {
  const uris = localUris.slice(0, MAX_BOOKING_PHOTOS);
  if (uris.length === 0) {
    return [];
  }

  const folder = newId();
  const uploaded: string[] = [];

  for (const uri of uris) {
    const ext = extensionFor(uri);
    const path = `${folder}/${newId()}.${ext}`;
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        continue;
      }
      const body = await response.arrayBuffer();
      const { error } = await supabase.storage.from(BOOKING_PHOTO_BUCKET).upload(path, body, {
        contentType: contentType(ext),
        upsert: false,
      });
      if (!error) {
        uploaded.push(path);
      }
    } catch {
      // Best-effort: a missed photo must not block the paid booking.
    }
  }

  return uploaded;
}
