export default (data, opts = {}) => {
  const {
    sorted, skipIndex, ignorenull, skipBracket, useDot, whitespace = '+'
  } = opts;

  const encode = value => String(value)
    .replace(/[^ !'()~*]/gu, encodeURIComponent)
    .replace(/ /g, whitespace)
    .replace(/[!'()~*]/g, ch =>
      `%${ch.charCodeAt().toString(16).slice(-2).toUpperCase()}`);

  const keys = (obj, keyarr = Object.keys(obj)) =>
    sorted ? keyarr.sort() : keyarr;

  const filterjoin = arr => arr.filter(e => e).join('&');

  const objnest = (name, obj) => filterjoin(keys(obj).map(key => useDot
    ? nest(`${name}.${key}`, obj[key])
    : nest(`${name}[${key}]`, obj[key])));

  const arrnest = (name, arr, brackets = skipBracket ? '' : '[]') => arr.length
    ? filterjoin(arr.map((elem, index) => skipIndex
      ? nest(name + brackets, elem)
      : nest(name + '[' + index + ']', elem)))
    : encode(name + brackets);

  const setnest = (name, set) => filterjoin(
    Array.from(set).map(elem => nest(name, elem)));

  const nest = (name, value, type = typeof value, f = null) => {
    if (value === f)
      f = ignorenull ? f : encode(name) + '=' + f;
    else if (/string|number|boolean/.test(type))
      f = encode(name) + '=' + encode(value);
    else if (Array.isArray(value))
      f = arrnest(name, value);
    else if (value instanceof Set)
      f = setnest(name, value);
    else if (type === 'object')
      f = objnest(name, value);

    return f;
  };

  return data && filterjoin(keys(data).map(key => nest(key, data[key])));
};
