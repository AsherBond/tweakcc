// Please see the note about writing patches in ./index

import { LocationResult, showDiff } from './index';

const getSpinnerNoFreezeLocation = (oldFile: string): LocationResult | null => {
  // Simple pattern: if(!V){D(4);return}
  const freezePattern = /if\(![$\w]+\)\{[$\w]+\(4\);return\}/;
  const match = oldFile.match(freezePattern);

  if (match && match.index !== undefined) {
    return {
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    };
  }

  console.error('patch: spinner no-freeze: failed to find wholeMatch');
  return null;
};

export const writeSpinnerNoFreeze = (oldFile: string): string | null => {
  const location = getSpinnerNoFreezeLocation(oldFile);
  if (!location) {
    return null;
  }

  const newFile =
    oldFile.slice(0, location.startIndex) + oldFile.slice(location.endIndex);

  showDiff(oldFile, newFile, '', location.startIndex, location.endIndex);
  return newFile;
};
