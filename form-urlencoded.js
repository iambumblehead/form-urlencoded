// Filename: formurlencoded.js
// Timestamp: 2016.01.10-10:46:11 (last modified)
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

  function getKeys (obj) {
    var keys = Object.keys(obj);

    return opts.sorted ? keys.sort() : keys;
  }

  function joinFilter (arr) {
    return arr.filter(function (e) {
      return typeof e === 'string' && e.length;
    }).join('&');
  }

  function getObjNestVals (name, obj) {
    return joinFilter(getKeys(obj).map(function (key) {
      return getNestVals(name + '[' + key + ']', obj[key]);
    }));
  }

  function getArrNestVals (name, arr) {
    return joinFilter(arr.map(function (elem) {
      return getNestVals(name + '[]', elem);
    }));
  }

  function getNestVals (name, value) {
    var type = typeof value,
        f = null;

    if (value === null) {
      f = opts.ignorenull ? f : encode(name) + '=' + f;
    } else if (/string|number|boolean/.test(type)) {
      f = encode(name) + '=' + encode(value);
    } else if (Array.isArray(value)) {
      f = getArrNestVals(name, value);
    } else if (type === 'object') {
      f = getObjNestVals(name, value);
    }

    return f;
  }

  return joinFilter(getKeys(data).map(function (key) {
    return getNestVals(encode(key), data[key]);
  }));
};
