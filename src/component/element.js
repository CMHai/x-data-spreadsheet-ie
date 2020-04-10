"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.h = exports.Element = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global document */

/* global window */
var Element = /*#__PURE__*/function () {
  function Element(tag) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    _classCallCheck(this, Element);

    if (typeof tag === 'string') {
      this.el = document.createElement(tag);
      this.el.className = className;
    } else {
      this.el = tag;
    }

    this.data = {};
  }

  _createClass(Element, [{
    key: "data",
    value: function data(key, value) {
      if (value !== undefined) {
        this.data[key] = value;
        return this;
      }

      return this.data[key];
    }
  }, {
    key: "on",
    value: function on(eventNames, handler) {
      var _eventNames$split = eventNames.split('.'),
          _eventNames$split2 = _toArray(_eventNames$split),
          fen = _eventNames$split2[0],
          oen = _eventNames$split2.slice(1);

      var eventName = fen;

      if (eventName === 'mousewheel' && /Firefox/i.test(window.navigator.userAgent)) {
        eventName = 'DOMMouseScroll';
      }

      this.el.addEventListener(eventName, function (evt) {
        handler(evt);

        for (var i = 0; i < oen.length; i += 1) {
          var k = oen[i];

          if (k === 'left' && evt.button !== 0) {
            return;
          }

          if (k === 'right' && evt.button !== 2) {
            return;
          }

          if (k === 'stop') {
            evt.stopPropagation();
          }
        }
      });
      return this;
    }
  }, {
    key: "offset",
    value: function offset(value) {
      var _this = this;

      if (value !== undefined) {
        Object.keys(value).forEach(function (k) {
          _this.css(k, "".concat(value[k], "px"));
        });
        return this;
      }

      var _this$el = this.el,
          offsetTop = _this$el.offsetTop,
          offsetLeft = _this$el.offsetLeft,
          offsetHeight = _this$el.offsetHeight,
          offsetWidth = _this$el.offsetWidth;
      return {
        top: offsetTop,
        left: offsetLeft,
        height: offsetHeight,
        width: offsetWidth
      };
    }
  }, {
    key: "scroll",
    value: function scroll(v) {
      var el = this.el;

      if (v !== undefined) {
        if (v.left !== undefined) {
          el.scrollLeft = v.left;
        }

        if (v.top !== undefined) {
          el.scrollTop = v.top;
        }
      }

      return {
        left: el.scrollLeft,
        top: el.scrollTop
      };
    }
  }, {
    key: "box",
    value: function box() {
      return this.el.getBoundingClientRect();
    }
  }, {
    key: "parent",
    value: function parent() {
      return new Element(this.el.parentNode);
    }
  }, {
    key: "children",
    value: function children() {
      var _this2 = this;

      for (var _len = arguments.length, eles = new Array(_len), _key = 0; _key < _len; _key++) {
        eles[_key] = arguments[_key];
      }

      if (arguments.length === 0) {
        return this.el.childNodes;
      }

      eles.forEach(function (ele) {
        return _this2.child(ele);
      });
      return this;
    }
  }, {
    key: "removeChild",
    value: function removeChild(el) {
      this.el.removeChild(el);
    }
    /*
    first() {
      return this.el.firstChild;
    }
      last() {
      return this.el.lastChild;
    }
      remove(ele) {
      return this.el.removeChild(ele);
    }
      prepend(ele) {
      const { el } = this;
      if (el.children.length > 0) {
        el.insertBefore(ele, el.firstChild);
      } else {
        el.appendChild(ele);
      }
      return this;
    }
      prev() {
      return this.el.previousSibling;
    }
      next() {
      return this.el.nextSibling;
    }
    */

  }, {
    key: "child",
    value: function child(arg) {
      var ele = arg;

      if (typeof arg === 'string') {
        ele = document.createTextNode(arg);
      } else if (_instanceof(arg, Element)) {
        ele = arg.el;
      }

      this.el.appendChild(ele);
      return this;
    }
  }, {
    key: "contains",
    value: function contains(ele) {
      return this.el.contains(ele);
    }
  }, {
    key: "className",
    value: function className(v) {
      if (v !== undefined) {
        this.el.className = v;
        return this;
      }

      return this.el.className;
    }
  }, {
    key: "addClass",
    value: function addClass(name) {
      this.el.classList.add(name);
      return this;
    }
  }, {
    key: "hasClass",
    value: function hasClass(name) {
      return this.el.classList.contains(name);
    }
  }, {
    key: "removeClass",
    value: function removeClass(name) {
      if(this.el){
        this.el.classList.remove(name);
      }
      return this;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      var cls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'active';
      return this.toggleClass(cls);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(name) {
      return this.el.classList.toggle(name);
    }
  }, {
    key: "active",
    value: function active() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'active';
      if (flag) this.addClass(cls);else this.removeClass(cls);
      return this;
    }
  }, {
    key: "checked",
    value: function checked() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.active(flag, 'checked');
      return this;
    }
  }, {
    key: "disabled",
    value: function disabled() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (flag) this.addClass('disabled');else this.removeClass('disabled');
      return this;
    } // key, value
    // key
    // {k, v}...

  }, {
    key: "attr",
    value: function attr(key, value) {
      var _this3 = this;

      if (value !== undefined) {
        this.el.setAttribute(key, value);
      } else {
        if (typeof key === 'string') {
          return this.el.getAttribute(key);
        }

        Object.keys(key).forEach(function (k) {
          _this3.el.setAttribute(k, key[k]);
        });
      }

      return this;
    }
  }, {
    key: "removeAttr",
    value: function removeAttr(key) {
      this.el.removeAttribute(key);
      return this;
    }
  }, {
    key: "html",
    value: function html(content) {
      if (content !== undefined) {
        this.el.innerHTML = content;
        return this;
      }

      return this.el.innerHTML;
    }
  }, {
    key: "val",
    value: function val(v) {
      if (v !== undefined) {
        this.el.value = v;
        return this;
      }

      return this.el.value;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.el.focus();
    }
  }, {
    key: "cssRemoveKeys",
    value: function cssRemoveKeys() {
      var _this4 = this;

      for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      keys.forEach(function (k) {
        return _this4.el.style.removeProperty(k);
      });
      return this;
    } // css( propertyName )
    // css( propertyName, value )
    // css( properties )

  }, {
    key: "css",
    value: function css(name, value) {
      var _this5 = this;

      if (value === undefined && typeof name !== 'string') {
        Object.keys(name).forEach(function (k) {
          _this5.el.style[k] = name[k];
        });
        return this;
      }

      if (value !== undefined) {
        this.el.style[name] = value;
        return this;
      }

      return this.el.style[name];
    }
  }, {
    key: "computedStyle",
    value: function computedStyle() {
      return window.getComputedStyle(this.el, null);
    }
  }, {
    key: "show",
    value: function show() {
      this.css('display', 'block');
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.css('display', 'none');
      return this;
    }
  }]);

  return Element;
}();

exports.Element = Element;

var h = function h(tag) {
  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return new Element(tag, className);
};

exports.h = h;