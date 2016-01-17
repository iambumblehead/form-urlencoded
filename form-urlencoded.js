// Filename: formurlencoded.js
// Timestamp: 2016.01.17-14:31:12 (last modified)
// Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com)
//
// http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
// input: {one:1,two:2} return: '[one]=1&[two]=2'

var formurlencoded = module.exports = function (data, opts) {
  opts = typeof opts === 'object' ? opts : {};

  function encode (value) {
    return String(value)
      .replace(/[^ !'()~\*]*/g, encodeURIComponent)
      .replace(/ /g, '+')
      .replace(/[!'()~\*]/g, function manuallyEncodeChar (ch) {
        return '%' + ('0' + ch.charCodeAt(0).toString(16)).slice(-2).toUpperCase();
      });
  }

  function keys (obj) {
    var keys = Object.keys(obj);

    return opts.sorted ? keys.sort() : keys;
  }

  function filterjoin (arr) {
    return arr.filter(function (e) { return e; }).join('&');
  }

  function objnest (name, obj) {
    return filterjoin(keys(obj).map(function (key) {
      return nest(name + '[' + key + ']', obj[key]);
    }));
  }

  function arrnest (name, arr) {
    return filterjoin(arr.map(function (elem) {
      return nest(name + '[]', elem);
    }));
  }

  function nest (name, value) {
    var type = typeof value,
        f = null;

    if (value === null) {
      f = opts.ignorenull ? f : encode(name) + '=' + f;
    } else if (/string|number|boolean/.test(type)) {
      f = encode(name) + '=' + encode(value);
    } else if (Array.isArray(value)) {
      f = arrnest(name, value);
    } else if (type === 'object') {
      f = objnest(name, value);
    }

    return f;
  }

  return filterjoin(keys(data).map(function (key) {
    return nest(encode(key), data[key]);
  }));
};
