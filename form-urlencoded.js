// Filename: formurlencoded.js
// Timestamp: 2014.04.18-10:14:24 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com), JBlashill (james@blashill.com)


var formurlencoded = ((typeof module === 'object') ? module : {}).exports = {
  
  // input: {one:1,two:2} return: '[one]=1&[two]-2'

  encode : function (data, options) {
    function getNestValsArrAsStr(arr) {
      return arr.filter(function (e) {
        return typeof e === 'string' && e.length;
      }).join('&');
    }

    function getKeys(obj) {
      var keys = Object.keys(obj);

      return options && options.sorted ? keys.sort() : keys;
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
          type = typeof value, 
          f = null;

      if (type === 'string') {
        f = encodeURIComponent(name) + '=' +
          formEncodeString(value);
      } else if (type === 'number') {
        f = encodeURIComponent(name) + '=' +
            encodeURIComponent(value).replace(whitespaceRe, '+');
      } else if (type === 'boolean') {
        f = encodeURIComponent(name) + '=' + value;
      } else if (Array.isArray(value)) {
        f = getArrNestVals(name, value);
      } else if (type === 'object') {
        f = getObjNestVals(name, value);
      }

      return f;
    }

    // 5.1, http://www.w3.org/TR/html5/forms.html#url-encoded-form-data
    function manuallyEncodeChar (ch) {
      return '%' + ('0' + ch.charCodeAt(0).toString(16)).slice(-2).toUpperCase();
    };

    function formEncodeString (value) {
      return value
        .replace(/[^ !'()~\*]*/g, encodeURIComponent)
        .replace(/ /g, '+')
        .replace(/[!'()~\*]/g, manuallyEncodeChar);
    };

    return getNestValsArrAsStr(getKeys(data).map(function (key) {
      return getNestVals(key, data[key]);
    }));
  }
};


