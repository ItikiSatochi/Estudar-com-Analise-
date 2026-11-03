/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Safely extracts an 11-character YouTube video ID from various URL formats
 * or returns the raw ID if already provided.
 */
export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // If already a valid 11-character YouTube ID (alphanumeric, -, _)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Matches standard URLs:
  // - youtube.com/watch?v=ID
  // - youtu.be/ID
  // - youtube.com/embed/ID
  // - youtube.com/v/ID
  // - youtube.com/shorts/ID
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);

  return match && match[1] && match[1].length === 11 ? match[1] : null;
}

/**
 * Builds the safe embed URL with optional start timestamp in seconds
 */
export function buildYouTubeEmbedUrl(videoId: string, startSeconds: number = 0): string {
  const cleanId = extractYouTubeId(videoId) || videoId;
  const base = `https://www.youtube.com/embed/${cleanId}?rel=0&modestbranding=1`;
  if (startSeconds > 0) {
    return `${base}&start=${Math.floor(startSeconds)}&autoplay=1`;
  }
  return base;
}

/**
 * Formats seconds into MM:SS or HH:MM:SS format
 */
export function formatVideoTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const padSecs = secs < 10 ? `0${secs}` : `${secs}`;
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    const padMins = remMins < 10 ? `0${remMins}` : `${remMins}`;
    return `${hours}:${padMins}:${padSecs}`;
  }
  const padMins = mins < 10 ? `0${mins}` : `${mins}`;
  return `${padMins}:${padSecs}`;
}
