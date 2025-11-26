'use strict';

const ANSI_PATTERN =
  '[\\u001B\\u009B][[\\]()#;?]*(?:' +
  '(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?' +
  '[0-9A-PR-TZcf-nq-uy=><~]' +
  ')';

function getRegex(onlyFirst) {
  return new RegExp(ANSI_PATTERN, onlyFirst ? undefined : 'g');
}

function stripAnsi(input, {onlyFirst = false} = {}) {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`);
  }

  return input.replace(getRegex(onlyFirst), '');
}

module.exports = stripAnsi;
module.exports.default = stripAnsi;

