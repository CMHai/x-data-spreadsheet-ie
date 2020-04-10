"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locale = locale;
exports.t = t;
exports.tf = tf;
exports["default"] = void 0;

var _en = _interopRequireDefault(require("./en"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global window */
var $lang = 'en';
var $messages = {
  en: _en["default"]
};

function translate(key, messages) {
  if (messages && messages[$lang]) {
    var message = messages[$lang];
    var keys = key.split('.');

    for (var i = 0; i < keys.length; i += 1) {
      var property = keys[i];
      var value = message[property];
      if (i === keys.length - 1) return value;
      if (!value) return undefined;
      message = value;
    }
  }

  return undefined;
}

function t(key) {
  var v = translate(key, $messages);

  if (!v && window && window.x && window.x.spreadsheet && window.x.spreadsheet.$messages) {
    v = translate(key, window.x.spreadsheet.$messages);
  }

  return v || '';
}

function tf(key) {
  return function () {
    return t(key);
  };
}

function locale(lang, message) {
  $lang = lang;

  if (message) {
    $messages[lang] = message;
  }
}

var _default = {
  t: t
};
exports["default"] = _default;