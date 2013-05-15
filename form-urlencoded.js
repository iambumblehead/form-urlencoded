var isArray = require('util').isArray;

var formUrlencoded = module.exports = {

  // input: {one:1,two:2} return: '[one]=1&[two]-2'
  encode : function (data) {
    var pairs = [], regexp = /%20/g, // regex to match whitespace
        nvObjKeyStr = ':name[:prop]',
        nvArrKeyStr = ':name[]';

    function getNestValsArrAsStr(arr) {
      return arr.filter(function (e) {
        return e.length ? true : false;
      }).join('&');
    }

    function getObjNestVals (name, obj) {
      var nestVals = [];
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          nestVals.push(getNestVals(name + '[' + o + ']', obj[o]));
        }
      }
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
      } else if (isArray(value)) {
        f = getArrNestVals(name, value);
      } else if (type === 'object') {
        f = getObjNestVals(name, value);
      }
      return f;
    }

    for (var name in data) {
      if (data.hasOwnProperty(name)) {
        pairs.push(getNestVals(name, data[name]));
      }
    }

    return getNestValsArrAsStr(pairs);
  }
};


