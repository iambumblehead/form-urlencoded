var isArray = require('util').isArray;

var formUrlencoded = module.exports = {
  encode : function (data) {
    var pairs = [], regexp = /%20/g, val; // regex to match whitespace
    // input: {one:1,two:2} return: '[one]=1&[two]-2'
    function getObjNestVals (name, obj) {
      var nestVals = [];
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          nestVals.push(getNestVals(name + '[' + o + ']', obj[o]));
        }
      }
      return nestVals.join('&');
    }

    function getArrNestVals (name, arr) {
      var nestVals = [], x, len;
      for (x = 0, len = arr.length; x < len; x++) {
        nestVals.push(getNestVals(name + '[]', arr[+x]));
      }
      return nestVals.join('&');
    }

    function getNestVals (name, value) {
      var type = typeof value;
      if (type === 'string' || type === 'number') {
        return encodeURIComponent(name) + '=' +
          encodeURIComponent(value).replace(regexp, "+");
      } else if (isArray(value)) {
        return getArrNestVals(name, value);
      } else if (type === 'object') {
        return getObjNestVals(name, value);
      } else if (type === 'boolean') {
        return encodeURIComponent(name) + '=' + value;
      }
      return null;
    }

    for (var name in data) {
      val = getNestVals(name, data[name]);
      if (val) {
        pairs.push(val.valueOf());
      }
    }
    return pairs.join('&');
  }
};


