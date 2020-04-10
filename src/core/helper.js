"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

/* eslint-disable no-param-reassign */
function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

var mergeDeep = function mergeDeep() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      var v = source[key]; // console.log('k:', key, ', v:', source[key], typeof v, v instanceof Object);

      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        object[key] = v;
      } else if (typeof v !== 'function' && !Array.isArray(v) && _instanceof(v, Object)) {
        object[key] = object[key] || {};
        mergeDeep(object[key], v);
      } else {
        object[key] = v;
      }
    });
  }); // console.log('::', object);

  return object;
};

function equals(obj1, obj2) {
  var keys = Object.keys(obj1);
  if (keys.length !== Object.keys(obj2).length) return false;

  for (var i = 0; i < keys.length; i += 1) {
    var k = keys[i];
    var v1 = obj1[k];
    var v2 = obj2[k];
    if (v2 === undefined) return false;

    if (typeof v1 === 'string' || typeof v1 === 'number' || typeof v1 === 'boolean') {
      if (v1 !== v2) return false;
    } else if (Array.isArray(v1)) {
      if (v1.length !== v2.length) return false;

      for (var ai = 0; ai < v1.length; ai += 1) {
        if (!equals(v1[ai], v2[ai])) return false;
      }
    } else if (typeof v1 !== 'function' && !Array.isArray(v1) && _instanceof(v1, Object)) {
      if (!equals(v1, v2)) return false;
    }
  }

  return true;
}
/*
  objOrAry: obejct or Array
  cb: (value, index | key) => { return value }
*/


var sum = function sum(objOrAry) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
    return value;
  };
  var total = 0;
  var size = 0;
  Object.keys(objOrAry).forEach(function (key) {
    total += cb(objOrAry[key], key);
    size += 1;
  });
  return [total, size];
};

function deleteProperty(obj, property) {
  var oldv = obj["".concat(property)];
  delete obj["".concat(property)];
  return oldv;
}

function rangeReduceIf(min, max, inits, initv, ifv, getv) {
  var s = inits;
  var v = initv;
  var i = min;

  for (; i < max; i += 1) {
    if (s > ifv) break;
    v = getv(i);
    s += v;
  }

  return [i, s - v, v];
}

function rangeSum(min, max, getv) {
  var s = 0;

  for (var i = min; i < max; i += 1) {
    s += getv(i);
  }

  return s;
}

function rangeEach(min, max, cb) {
  for (var i = min; i < max; i += 1) {
    cb(i);
  }
}

function arrayEquals(a1, a2) {
  if (a1.length === a2.length) {
    for (var i = 0; i < a1.length; i += 1) {
      if (a1[i] !== a2[i]) return false;
    }
  } else return false;

  return true;
}

var _default = {
  cloneDeep: cloneDeep,
  merge: function merge() {
    for (var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      sources[_key2] = arguments[_key2];
    }

    return mergeDeep.apply(void 0, [{}].concat(sources));
  },
  equals: equals,
  arrayEquals: arrayEquals,
  sum: sum,
  rangeEach: rangeEach,
  rangeSum: rangeSum,
  rangeReduceIf: rangeReduceIf,
  deleteProperty: deleteProperty
};
exports["default"] = _default;