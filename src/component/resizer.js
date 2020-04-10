"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _event = require("./event");

var _config = require("../config");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Resizer = /*#__PURE__*/function () {
  function Resizer() {
    var _this = this;

    var vertical = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var minDistance = arguments[1];

    _classCallCheck(this, Resizer);

    this.moving = false;
    this.vertical = vertical;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-resizer ").concat(vertical ? 'vertical' : 'horizontal')).children(this.unhideHoverEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-resizer-hover")).on('dblclick.stop', function (evt) {
      return _this.mousedblclickHandler(evt);
    }).css('position', 'absolute').hide(), this.hoverEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-resizer-hover")).on('mousedown.stop', function (evt) {
      return _this.mousedownHandler(evt);
    }), this.lineEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-resizer-line")).hide()).hide(); // cell rect

    this.cRect = null;
    this.finishedFn = null;
    this.minDistance = minDistance;

    this.unhideFn = function () {};
  }

  _createClass(Resizer, [{
    key: "showUnhide",
    value: function showUnhide(index) {
      this.unhideIndex = index;
      this.unhideHoverEl.show();
    }
  }, {
    key: "hideUnhide",
    value: function hideUnhide() {
      this.unhideHoverEl.hide();
    } // rect : {top, left, width, height}
    // line : {width, height}

  }, {
    key: "show",
    value: function show(rect, line) {
      var moving = this.moving,
          vertical = this.vertical,
          hoverEl = this.hoverEl,
          lineEl = this.lineEl,
          el = this.el,
          unhideHoverEl = this.unhideHoverEl;
      if (moving) return;
      this.cRect = rect;
      var left = rect.left,
          top = rect.top,
          width = rect.width,
          height = rect.height;
      el.offset({
        left: vertical ? left + width - 5 : left,
        top: vertical ? top : top + height - 5
      }).show();
      hoverEl.offset({
        width: vertical ? 5 : width,
        height: vertical ? height : 5
      });
      lineEl.offset({
        width: vertical ? 0 : line.width,
        height: vertical ? line.height : 0
      });
      unhideHoverEl.offset({
        left: vertical ? 5 - width : left,
        top: vertical ? top : 5 - height,
        width: vertical ? 5 : width,
        height: vertical ? height : 5
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.offset({
        left: 0,
        top: 0
      }).hide();
      this.hideUnhide();
    }
  }, {
    key: "mousedblclickHandler",
    value: function mousedblclickHandler() {
      if (this.unhideIndex) this.unhideFn(this.unhideIndex);
    }
  }, {
    key: "mousedownHandler",
    value: function mousedownHandler(evt) {
      var _this2 = this;

      var startEvt = evt;
      var el = this.el,
          lineEl = this.lineEl,
          cRect = this.cRect,
          vertical = this.vertical,
          minDistance = this.minDistance;
      var distance = vertical ? cRect.width : cRect.height; // console.log('distance:', distance);

      lineEl.show();
      (0, _event.mouseMoveUp)(window, function (e) {
        _this2.moving = true;

        if (startEvt !== null && e.buttons === 1) {
          // console.log('top:', top, ', left:', top, ', cRect:', cRect);
          if (vertical) {
            if(!e.movementX){
              distance += e.screenX - startEvt.screenX;
            }else{
              distance += e.movementX;
            }

            if (distance > minDistance) {
              el.css('left', "".concat(cRect.left + distance, "px"));
            }
          } else {
            if(!e.movementY){
              distance += e.screenY - startEvt.screenY;
            }else{
              distance += e.movementY;
            }
            if (distance > minDistance) {
              el.css('top', "".concat(cRect.top + distance, "px"));
            }
          }

          startEvt = e;
        }
      }, function () {
        startEvt = null;
        lineEl.hide();
        _this2.moving = false;

        _this2.hide();

        if (_this2.finishedFn) {
          if (distance < minDistance) distance = minDistance;

          _this2.finishedFn(cRect, distance);
        }
      });
    }
  }]);

  return Resizer;
}();

exports["default"] = Resizer;