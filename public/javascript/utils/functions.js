export function appError(message) {
  const error = new Error(message);
  error.isOperational = true;
  return error;
}

/**
 * Turn a query from string to object
 * @param {String} queryString url search string
 * @returns Object - query
 */
export function parseQuery(queryString) {
  const obj = {};
  queryString
    .slice(1)
    .split('&')
    .forEach((q) => {
      const [key, value] = q.split('=');
      if (!key.includes('[')) obj[key] = value;
      // When there is nested querying wiht operators
      else {
        const [first, last] = key.split('['); // first = main name of the query field. last = the query operator with "]"
        const innerKey = last.slice(0, last.length - 1); // the query operator
        const innerOb = {}; //
        innerOb[innerKey] = value;
        if (obj[first]) obj[first][innerKey] = value; // when the key aready exist, we only add the innner key
        else obj[first] = innerOb; // when the key does not exist we add the inner object
      }
    });
  return obj;
}

/**
 * Turns a query object to a string
 * @param {Object} query to turn to string
 * @returns String - url search string
 */
export function stringifyQuery(query) {
  let string = Object.entries(query);
  string = string.map(([key, value]) => breakOb(key, value));
  string = string.join('&');

  function breakOb(key, value) {
    if (typeof value !== 'object') return `${key}=${value}`;
    let i = Object.entries(value);
    i = i.map(([a, b]) => inner(key, a, b));
    return i.join('&');
  }
  function inner(key, op, value) {
    return `${key}[${op}]=${value}`;
  }

  string = `?${string}`;
  return string;
}

/**
 * Merges the date and the time to one full date
 * @param {Date} date Date form an input element
 * @param {Date} time Time from an input element
 * @returns ISOString
 */
export function mergeDate(date, time) {
  if (!date || !time) return;
  const value = `${date} ${time}`;
  const newDate = new Date(value).toISOString();
  return newDate;
}

/**
 * Builds a date and time value for an input element
 * @param {Date} iso ISOString
 * @returns Object {date, time}
 */
export function unmergeDate(iso) {
  const a = new Date(iso);
  const y = `${a.getFullYear()}`.padStart(2, '0');
  const m = `${a.getMonth() + 1}`.padStart(2, '0');
  const d = `${a.getDate()}`.padStart(2, '0');

  const hh = `${a.getHours()}`.padStart(2, '0');
  const mm = `${a.getMinutes()}`.padStart(2, '0');

  const date = `${y}-${m}-${d}`;
  const time = `${hh}:${mm}`;
  return { date, time };
}

export function cutString(str, endAt = 60) {
  const cutAt = endAt - 3;
  if (str.length > endAt) {
    const newStr = str.slice(0, cutAt);
    const last = newStr.charAt(newStr.length - 1);

    let reten;
    if (last === ' ') reten = `${newStr.slice(0, newStr.length - 1)}...`;
    else reten = `${newStr}...`;
    return reten;
  }
  return str;
}

/**
 * Takes a single date and return a user visible data
 * @param {Date} iso ISOString date
 * @returns Object containing {tiem, date, localDate, lateralDate, fullDate, timeZone}
 */
export function getTime(iso) {
  const s = new Date(iso);
  const time = s.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
  const date = s.toDateString();
  const localDate = s.toLocaleDateString();
  const simple = s.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const lateralDate = s.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const fullLocalDate = `${localDate}   ${time}`;
  const fullDate = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(s);
  const complete = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(s);
  const simpleDate = new Intl.DateTimeFormat(undefined, {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  }).format(s);

  let timeZone = s.toLocaleTimeString(undefined, { timeZoneName: 'short' }).split(' ').at(-1).slice(0, 3);

  return { time, date, simpleDate, localDate, lateralDate, fullDate, fullLocalDate, timeZone, simple, complete };
}

export function mergeQueries(oldquery = {}, newquery = {}, fields = []) {
  for (const key in newquery) {
    if (fields.includes(key)) {
      if (oldquery[key]) oldquery[key] = `${newquery[key]},${oldquery[key]}`;
      else oldquery[key] = newquery[key];
      continue;
    }
    oldquery[key] = newquery[key];
  }

  return oldquery;
}
