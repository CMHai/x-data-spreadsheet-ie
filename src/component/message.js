"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xtoast = xtoast;
exports["default"] = void 0;

var _element = require("./element");

var _icon = _interopRequireDefault(require("./icon"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global document */
function xtoast(title, content) {
  var el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-toast"));
  var dimmer = (0, _element.h)('div', "".concat(_config.cssPrefix, "-dimmer active"));

  var remove = function remove() {
    document.body.removeChild(el.el);
    document.body.removeChild(dimmer.el);
  };

  el.children((0, _element.h)('div', "".concat(_config.cssPrefix, "-toast-header")).children(new _icon["default"]('close').on('click.stop', function () {
    return remove();
  }), title), (0, _element.h)('div', "".concat(_config.cssPrefix, "-toast-content")).html(content));
  document.body.appendChild(el.el);
  document.body.appendChild(dimmer.el); // set offset

  var _el$box = el.box(),
      width = _el$box.width,
      height = _el$box.height;

  var _document$documentEle = document.documentElement,
      clientHeight = _document$documentEle.clientHeight,
      clientWidth = _document$documentEle.clientWidth;
  el.offset({
    left: (clientWidth - width) / 2,
    top: (clientHeight - height) / 3
  });
}

var _default = {};
exports["default"] = _default;