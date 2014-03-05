// Filename: formurlencoded.js
// Timestamp: 2013.10.06-21:36:29 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

if (!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}

var formurlencoded = ((typeof module === 'object') ? module : {}).exports = {

  // input: {one:1,two:2} return: '[one]=1&[two]-2'
  encode : function (data, options) {
    var pairs = [], regexp = /%20/g, // regex to match whitespace
        nvObjKeyStr = ':name[:prop]',
        nvArrKeyStr = ':name[]';
    options = options || {};

    function getNestValsArrAsStr(arr) {
      return arr.filter(function (e) {
        return (typeof e === 'string' && e.length) ? true : false;
      }).join('&');
    }

    function getObjNestVals (name, obj) {
      var nestVals = [];
      var keys = Object.keys(obj);
      if (options.sorted) {
        keys.sort();
      }
      keys.forEach(function(key) {
        nestVals.push(getNestVals(name + '[' + key + ']', obj[key]));
      });
      return getNestValsArrAsStr(nestVals);
    }

    function getArrNestVals (name, arr) {
      var nestVals = [], x, len;
      for (x = 0, len = arr.length; x < len; x++) {
        nestVals.push(getNestVals(name + '[]', arr[+x]));
      }
      return getNestValsArrAsStr(nestVals);
    }

    function getNestVals (name, value) {
      var type = typeof value, f = null;
      if (type === 'string' || type === 'number') {
        f = encodeURIComponent(name) + '=' +
            encodeURIComponent(value).replace(regexp, "+");
      } else if (type === 'boolean') {
        f = encodeURIComponent(name) + '=' + value;
      } else if (Array.isArray(value)) {
        f = getArrNestVals(name, value);
      } else if (type === 'object') {
        f = getObjNestVals(name, value);
      }
      return f;
    }

    var keys = Object.keys(data);
    if (options.sorted) {
      keys.sort();
    }
    keys.forEach(function(key) {
      pairs.push(getNestVals(key, data[key]));
    });

    return getNestValsArrAsStr(pairs);
  }
};


