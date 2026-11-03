import test from 'node:test';
import assert from 'node:assert/strict';
import { extractYouTubeId, buildYouTubeEmbedUrl, formatVideoTime } from './youtube';

test('extractYouTubeId extracts ID from standard youtube.com/watch URLs', () => {
  const url = 'https://www.youtube.com/watch?v=8EMW7io4rSI';
  assert.equal(extractYouTubeId(url), '8EMW7io4rSI');
});

test('extractYouTubeId extracts ID from youtu.be short URLs', () => {
  const url = 'https://youtu.be/8EMW7io4rSI?t=120';
  assert.equal(extractYouTubeId(url), '8EMW7io4rSI');
});

test('extractYouTubeId extracts ID from embed URLs', () => {
  const url = 'https://www.youtube.com/embed/8EMW7io4rSI';
  assert.equal(extractYouTubeId(url), '8EMW7io4rSI');
});

test('extractYouTubeId extracts ID from shorts URLs', () => {
  const url = 'https://www.youtube.com/shorts/8EMW7io4rSI';
  assert.equal(extractYouTubeId(url), '8EMW7io4rSI');
});

test('extractYouTubeId accepts raw 11-character video IDs directly', () => {
  assert.equal(extractYouTubeId('8EMW7io4rSI'), '8EMW7io4rSI');
});

test('extractYouTubeId returns null for invalid strings', () => {
  assert.equal(extractYouTubeId(''), null);
  assert.equal(extractYouTubeId('not-a-youtube-url'), null);
});

test('buildYouTubeEmbedUrl creates clean embed link with optional start time', () => {
  const standard = buildYouTubeEmbedUrl('8EMW7io4rSI');
  assert.equal(standard, 'https://www.youtube.com/embed/8EMW7io4rSI?rel=0&modestbranding=1');

  const withTimestamp = buildYouTubeEmbedUrl('8EMW7io4rSI', 135);
  assert.equal(withTimestamp, 'https://www.youtube.com/embed/8EMW7io4rSI?rel=0&modestbranding=1&start=135&autoplay=1');
});

test('formatVideoTime formats seconds correctly', () => {
  assert.equal(formatVideoTime(45), '00:45');
  assert.equal(formatVideoTime(125), '02:05');
  assert.equal(formatVideoTime(3665), '1:01:05');
});
