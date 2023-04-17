import crypto from 'crypto';

/**
 * Thanks to https://stackoverflow.com/a/2117523/13491646
 */

export function uuidv4(): string {
  return (<any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}
