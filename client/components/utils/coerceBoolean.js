export default (val) => (typeof val !== 'string' ? val
  : val === 'true'      ? true
  : val === 'false'     ? false
  : val === 'null'      ? false
  : val === 'undefined' ? false
  : val)