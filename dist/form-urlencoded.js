'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sorted = opts.sorted,
      skipIndex = opts.skipIndex,
      ignorenull = opts.ignorenull,
      skipBracket = opts.skipBracket,
      useDot = opts.useDot;


  var encode = function encode(value) {
    return String(value).replace(/(?:[\0-\x1F"-&\+-\}\x7F-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, encodeURIComponent).replace(/ /g, '+').replace(/[!'()~*]/g, function (ch) {
      return '%' + ch.charCodeAt().toString(16).slice(-2).toUpperCase();
    });
  };

  var keys = function keys(obj) {
    var keyarr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.keys(obj);
    return sorted ? keyarr.sort() : keyarr;
  };

  var filterjoin = function filterjoin(arr) {
    return arr.filter(function (e) {
      return e;
    }).join('&');
  };

  var objnest = function objnest(name, obj) {
    return filterjoin(keys(obj).map(function (key) {
      return useDot ? nest(name + '.' + key, obj[key]) : nest(name + '[' + key + ']', obj[key]);
    }));
  };

  var arrnest = function arrnest(name, arr) {
    var brackets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : skipBracket ? '' : '[]';
    return arr.length ? filterjoin(arr.map(function (elem, index) {
      return skipIndex ? nest(name + brackets, elem) : nest(name + '[' + index + ']', elem);
    })) : encode(name + brackets);
  };

  var setnest = function setnest(name, set) {
    return filterjoin(Array.from(set).map(function (elem) {
      return nest(name, elem);
    }));
  };

  var nest = function nest(name, value) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : typeof value === 'undefined' ? 'undefined' : _typeof(value);
    var f = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (value === f) f = ignorenull ? f : encode(name) + '=' + f;else if (/string|number|boolean/.test(type)) f = encode(name) + '=' + encode(value);else if (Array.isArray(value)) f = arrnest(name, value);else if (value instanceof Set) f = setnest(name, value);else if (type === 'object') f = objnest(name, value);

    return f;
  };

  return data && filterjoin(keys(data).map(function (key) {
    return nest(key, data[key]);
  }));
};