"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Scrollbar = /*#__PURE__*/function () {
  function Scrollbar(vertical) {
    var _this = this;

    _classCallCheck(this, Scrollbar);

    this.vertical = vertical;
    this.moveFn = null;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-scrollbar ").concat(vertical ? 'vertical' : 'horizontal')).child(this.contentEl = (0, _element.h)('div', '')).on('mousemove.stop', function () {}).on('scroll.stop', function (evt) {
      var _evt$target = evt.target,
          scrollTop = _evt$target.scrollTop,
          scrollLeft = _evt$target.scrollLeft; // console.log('scrollTop:', scrollTop);

      if (_this.moveFn) {
        _this.moveFn(_this.vertical ? scrollTop : scrollLeft, evt);
      } // console.log('evt:::', evt);

    });
  }

  _createClass(Scrollbar, [{
    key: "move",
    value: function move(v) {
      this.el.scroll(v);
      return this;
    }
  }, {
    key: "scroll",
    value: function scroll() {
      return this.el.scroll();
    }
  }, {
    key: "set",
    value: function set(distance, contentDistance) {
      var d = distance - 1; // console.log('distance:', distance, ', contentDistance:', contentDistance);

      if (contentDistance > d) {
        var cssKey = this.vertical ? 'height' : 'width'; // console.log('d:', d);

        this.el.css(cssKey, "".concat(d - 15, "px")).show();
        this.contentEl.css(this.vertical ? 'width' : 'height', '1px').css(cssKey, "".concat(contentDistance, "px"));
      } else {
        this.el.hide();
      }

      return this;
    }
  }]);

  return Scrollbar;
}();

exports["default"] = Scrollbar;