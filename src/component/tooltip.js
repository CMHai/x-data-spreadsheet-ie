"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = tooltip;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

/* global document */
function tooltip(html, target) {
  if (target.classList.contains('active')) {
    return;
  }

  var _target$getBoundingCl = target.getBoundingClientRect(),
      left = _target$getBoundingCl.left,
      top = _target$getBoundingCl.top,
      width = _target$getBoundingCl.width,
      height = _target$getBoundingCl.height;

  var el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-tooltip")).html(html).show();
  document.body.appendChild(el.el);
  var elBox = el.box(); // console.log('elBox:', elBox);

  el.css('left', "".concat(left + width / 2 - elBox.width / 2, "px")).css('top', "".concat(top + height + 2, "px"));
  (0, _event.bind)(target, 'mouseleave', function () {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });
  (0, _event.bind)(target, 'click', function () {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });
}