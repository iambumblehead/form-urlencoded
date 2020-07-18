"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = function _default(data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sorted = opts.sorted,
      skipIndex = opts.skipIndex,
      ignorenull = opts.ignorenull,
      skipBracket = opts.skipBracket,
      useDot = opts.useDot,
      _opts$whitespace = opts.whitespace,
      whitespace = _opts$whitespace === void 0 ? '+' : _opts$whitespace;

  var encode = function encode(value) {
    return String(value).replace(/(?:[\0-\x1F"-&\+-\}\x7F-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, encodeURIComponent).replace(/ /g, whitespace).replace(/[!'()~*]/g, function (ch) {
      return "%".concat(ch.charCodeAt().toString(16).slice(-2).toUpperCase());
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
      return useDot ? nest("".concat(name, ".").concat(key), obj[key]) : nest("".concat(name, "[").concat(key, "]"), obj[key]);
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
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _typeof(value);
    var f = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (value === f) f = ignorenull ? f : encode(name) + '=' + f;else if (/string|number|boolean/.test(type)) f = encode(name) + '=' + encode(value);else if (Array.isArray(value)) f = arrnest(name, value);else if (value instanceof Set) f = setnest(name, value);else if (type === 'object') f = objnest(name, value);
    return f;
  };

  return data && filterjoin(keys(data).map(function (key) {
    return nest(key, data[key]);
  }));
};

exports["default"] = _default;
