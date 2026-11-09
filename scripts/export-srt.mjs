import {captions} from '../src/captions.js';
import {writeFileSync} from 'node:fs';
const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const hh = Math.floor(ms / 3600000);
  const mm = Math.floor(ms / 60000) % 60;
  const ss = Math.floor(ms / 1000) % 60;
  return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')},${String(ms % 1000).padStart(3,'0')}`;
};
writeFileSync('out/world-without-birds.srt', captions.map(([start, end, text], i) => `${i + 1}\n${stamp(start)} --> ${stamp(end)}\n${text}\n`).join('\n'));
