// Filename: formurlencoded.js
// Timestamp: 2014.04.18-10:14:24 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com)
//
// 5.1, http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
// input: {one:1,two:2} return: '[one]=1&[two]=2'

var formurlencoded = module.exports = function (data, options) {
  var opts = typeof options === 'object' ? options : {},
      optignorenull = opts.ignorenull || false,
      optsorted     = opts.sorted || false;

  function getKeys(obj) {
    var keys = Object.keys(obj);

    return optsorted ? keys.sort() : keys;
  }
  
  function getNestValsArrAsStr(arr) {
    return arr.filter(function (e) {
      return typeof e === 'string' && e.length;
    }).join('&');
  }

  function getObjNestVals (name, obj) {
    var objKeyStr = ':name[:prop]';

    return getNestValsArrAsStr(getKeys(obj).map(function (key) {
      return getNestVals(
        objKeyStr.replace(/:name/, name).replace(/:prop/, key), obj[key]
      );
    }));
  }

  function getArrNestVals (name, arr) {
    var arrKeyStr = ':name[]';

    return getNestValsArrAsStr(arr.map(function (elem) {
      return getNestVals(
        arrKeyStr.replace(/:name/, name), elem
      );
    }));
  }

  function getNestVals (name, value) {
    var whitespaceRe = /%20/g,
        encode = encodeURIComponent,
        type = typeof value, 
        f = null;

    if (value === null) {
      f = optignorenull ? f : encode(name) + '=' + f;
    } else if (type === 'string') {
      f = encode(name) + '=' + formEncodeString(value);
    } else if (type === 'number') {
      f = encode(name) + '=' + formEncodeString(value);
    } else if (type === 'boolean') {
      f = encode(name) + '=' + value;
    } else if (Array.isArray(value)) {      
      f = getArrNestVals(name, value);
    } else if (type === 'object') {
      f = getObjNestVals(name, value);      
    }

    return f;
  }

  function manuallyEncodeChar (ch) {
    return '%' + ('0' + ch.charCodeAt(0).toString(16)).slice(-2).toUpperCase();
  }

  function formEncodeString (value) {
    return String(value)
      .replace(/[^ !'()~\*]*/g, encodeURIComponent)
      .replace(/ /g, '+')
      .replace(/[!'()~\*]/g, manuallyEncodeChar);
  }

  return getNestValsArrAsStr(getKeys(data).map(function (key) {
    return getNestVals(key, data[key]);
  }));
};
