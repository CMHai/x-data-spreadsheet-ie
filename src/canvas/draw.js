"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thinLineWidth = thinLineWidth;
exports.npx = npx;
exports.DrawBox = exports.Draw = exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global window */
function dpr() {
  return window.devicePixelRatio || 1;
}

function thinLineWidth() {
  return dpr() - 0.5;
}

function npx(px) {
  return parseInt(px * dpr(), 10);
}

function npxLine(px) {
  var n = npx(px);
  return n > 0 ? n - 0.5 : 0.5;
}

var DrawBox = /*#__PURE__*/function () {
  function DrawBox(x, y, w, h) {
    var padding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, DrawBox);

    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.padding = padding;
    this.bgcolor = '#ffffff'; // border: [width, style, color]

    this.borderTop = null;
    this.borderRight = null;
    this.borderBottom = null;
    this.borderLeft = null;
  }

  _createClass(DrawBox, [{
    key: "setBorders",
    value: function setBorders(_ref) {
      var top = _ref.top,
          bottom = _ref.bottom,
          left = _ref.left,
          right = _ref.right;
      if (top) this.borderTop = top;
      if (right) this.borderRight = right;
      if (bottom) this.borderBottom = bottom;
      if (left) this.borderLeft = left;
    }
  }, {
    key: "innerWidth",
    value: function innerWidth() {
      return this.width - this.padding * 2 - 2;
    }
  }, {
    key: "innerHeight",
    value: function innerHeight() {
      return this.height - this.padding * 2 - 2;
    }
  }, {
    key: "textx",
    value: function textx(align) {
      var width = this.width,
          padding = this.padding;
      var x = this.x;

      if (align === 'left') {
        x += padding;
      } else if (align === 'center') {
        x += width / 2;
      } else if (align === 'right') {
        x += width - padding;
      }

      return x;
    }
  }, {
    key: "texty",
    value: function texty(align, h) {
      var height = this.height,
          padding = this.padding;
      var y = this.y;

      if (align === 'top') {
        y += padding;
      } else if (align === 'middle') {
        y += height / 2 - h / 2;
      } else if (align === 'bottom') {
        y += height - padding - h;
      }

      return y;
    }
  }, {
    key: "topxys",
    value: function topxys() {
      var x = this.x,
          y = this.y,
          width = this.width;
      return [[x, y], [x + width, y]];
    }
  }, {
    key: "rightxys",
    value: function rightxys() {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;
      return [[x + width, y], [x + width, y + height]];
    }
  }, {
    key: "bottomxys",
    value: function bottomxys() {
      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;
      return [[x, y + height], [x + width, y + height]];
    }
  }, {
    key: "leftxys",
    value: function leftxys() {
      var x = this.x,
          y = this.y,
          height = this.height;
      return [[x, y], [x, y + height]];
    }
  }]);

  return DrawBox;
}();

exports.DrawBox = DrawBox;

function drawFontLine(type, tx, ty, align, valign, blheight, blwidth) {
  var floffset = {
    x: 0,
    y: 0
  };

  if (type === 'underline') {
    if (valign === 'bottom') {
      floffset.y = 0;
    } else if (valign === 'top') {
      floffset.y = -(blheight + 2);
    } else {
      floffset.y = -blheight / 2;
    }
  } else if (type === 'strike') {
    if (valign === 'bottom') {
      floffset.y = blheight / 2;
    } else if (valign === 'top') {
      floffset.y = -(blheight / 2 + 2);
    }
  }

  if (align === 'center') {
    floffset.x = blwidth / 2;
  } else if (align === 'right') {
    floffset.x = blwidth;
  }

  this.line([tx - floffset.x, ty - floffset.y], [tx - floffset.x + blwidth, ty - floffset.y]);
}

var Draw = /*#__PURE__*/function () {
  function Draw(el, width, height) {
    _classCallCheck(this, Draw);

    this.el = el;
    this.ctx = el.getContext('2d');
    this.resize(width, height);
    this.ctx.scale(dpr(), dpr());
  }

  _createClass(Draw, [{
    key: "resize",
    value: function resize(width, height) {
      // console.log('dpr:', dpr);
      this.el.style.width = "".concat(width, "px");
      this.el.style.height = "".concat(height, "px");
      this.el.width = npx(width);
      this.el.height = npx(height);
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this$el = this.el,
          width = _this$el.width,
          height = _this$el.height;
      this.ctx.clearRect(0, 0, width, height);
      return this;
    }
  }, {
    key: "attr",
    value: function attr(options) {
      Object.assign(this.ctx, options);
      return this;
    }
  }, {
    key: "save",
    value: function save() {
      this.ctx.save();
      this.ctx.beginPath();
      return this;
    }
  }, {
    key: "restore",
    value: function restore() {
      this.ctx.restore();
      return this;
    }
  }, {
    key: "beginPath",
    value: function beginPath() {
      this.ctx.beginPath();
      return this;
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      this.ctx.translate(npx(x), npx(y));
      return this;
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      this.ctx.scale(x, y);
      return this;
    }
  }, {
    key: "clearRect",
    value: function clearRect(x, y, w, h) {
      this.ctx.clearRect(x, y, w, h);
      return this;
    }
  }, {
    key: "fillRect",
    value: function fillRect(x, y, w, h) {
      this.ctx.fillRect(npx(x) - 0.5, npx(y) - 0.5, npx(w), npx(h));
      return this;
    }
  }, {
    key: "fillText",
    value: function fillText(text, x, y) {
      this.ctx.fillText(text, npx(x), npx(y));
      return this;
    }
    /*
      txt: render text
      box: DrawBox
      attr: {
        align: left | center | right
        valign: top | middle | bottom
        color: '#333333',
        strike: false,
        font: {
          name: 'Arial',
          size: 14,
          bold: false,
          italic: false,
        }
      }
      textWrap: text wrapping
    */

  }, {
    key: "text",
    value: function text(mtxt, box) {
      var _this = this;

      var attr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var textWrap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var ctx = this.ctx;
      var align = attr.align,
          valign = attr.valign,
          font = attr.font,
          color = attr.color,
          strike = attr.strike,
          underline = attr.underline;
      var tx = box.textx(align);
      ctx.save();
      ctx.beginPath();
      this.attr({
        textAlign: align,
        textBaseline: valign,
        font: "".concat(font.italic ? 'italic' : '', " ").concat(font.bold ? 'bold' : '', " ").concat(npx(font.size), "px ").concat(font.name),
        fillStyle: color,
        strokeStyle: color
      });
      var txts = "".concat(mtxt).split('\n');
      var biw = box.innerWidth();
      var ntxts = [];
      txts.forEach(function (it) {
        var txtWidth = ctx.measureText(it).width;

        if (textWrap && txtWidth > biw) {
          var textLine = {
            w: 0,
            len: 0,
            start: 0
          };

          for (var i = 0; i < it.length; i += 1) {
            if (textLine.w >= biw) {
              ntxts.push(it.substr(textLine.start, textLine.len));
              textLine = {
                w: 0,
                len: 0,
                start: i
              };
            }

            textLine.len += 1;
            textLine.w += ctx.measureText(it[i]).width + 1;
          }

          if (textLine.len > 0) {
            ntxts.push(it.substr(textLine.start, textLine.len));
          }
        } else {
          ntxts.push(it);
        }
      });
      var txtHeight = (ntxts.length - 1) * (font.size + 2);
      var ty = box.texty(valign, txtHeight);
      ntxts.forEach(function (txt) {
        var txtWidth = ctx.measureText(txt).width;

        _this.fillText(txt, tx, ty);

        if (strike) {
          drawFontLine.call(_this, 'strike', tx, ty, align, valign, font.size, txtWidth);
        }

        if (underline) {
          drawFontLine.call(_this, 'underline', tx, ty, align, valign, font.size, txtWidth);
        }

        ty += font.size + 2;
      });
      ctx.restore();
      return this;
    }
  }, {
    key: "border",
    value: function border(style, color) {
      var ctx = this.ctx;
      ctx.lineWidth = thinLineWidth;
      ctx.strokeStyle = color; // console.log('style:', style);

      if (style === 'medium') {
        ctx.lineWidth = npx(2) - 0.5;
      } else if (style === 'thick') {
        ctx.lineWidth = npx(3);
      } else if (style === 'dashed') {
        ctx.setLineDash([npx(3), npx(2)]);
      } else if (style === 'dotted') {
        ctx.setLineDash([npx(1), npx(1)]);
      } else if (style === 'double') {
        ctx.setLineDash([npx(2), 0]);
      }

      return this;
    }
  }, {
    key: "line",
    value: function line() {
      var ctx = this.ctx;

      if (arguments.length > 1) {
        var _ref2 = arguments.length <= 0 ? undefined : arguments[0],
            _ref3 = _slicedToArray(_ref2, 2),
            x = _ref3[0],
            y = _ref3[1];

        ctx.moveTo(npxLine(x), npxLine(y));

        for (var i = 1; i < arguments.length; i += 1) {
          var _ref4 = i < 0 || arguments.length <= i ? undefined : arguments[i],
              _ref5 = _slicedToArray(_ref4, 2),
              x1 = _ref5[0],
              y1 = _ref5[1];

          ctx.lineTo(npxLine(x1), npxLine(y1));
        }

        ctx.stroke();
      }

      return this;
    }
  }, {
    key: "strokeBorders",
    value: function strokeBorders(box) {
      var ctx = this.ctx;
      ctx.save();
      ctx.beginPath(); // border

      var borderTop = box.borderTop,
          borderRight = box.borderRight,
          borderBottom = box.borderBottom,
          borderLeft = box.borderLeft;

      if (borderTop) {
        this.border.apply(this, _toConsumableArray(borderTop)); // console.log('box.topxys:', box.topxys());

        this.line.apply(this, _toConsumableArray(box.topxys()));
      }

      if (borderRight) {
        this.border.apply(this, _toConsumableArray(borderRight));
        this.line.apply(this, _toConsumableArray(box.rightxys()));
      }

      if (borderBottom) {
        this.border.apply(this, _toConsumableArray(borderBottom));
        this.line.apply(this, _toConsumableArray(box.bottomxys()));
      }

      if (borderLeft) {
        this.border.apply(this, _toConsumableArray(borderLeft));
        this.line.apply(this, _toConsumableArray(box.leftxys()));
      }

      ctx.restore();
    }
  }, {
    key: "dropdown",
    value: function dropdown(box) {
      var ctx = this.ctx;
      var x = box.x,
          y = box.y,
          width = box.width,
          height = box.height;
      var sx = x + width - 15;
      var sy = y + height - 15;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(npx(sx), npx(sy));
      ctx.lineTo(npx(sx + 8), npx(sy));
      ctx.lineTo(npx(sx + 4), npx(sy + 6));
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 0, 0, .45)';
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "error",
    value: function error(box) {
      var ctx = this.ctx;
      var x = box.x,
          y = box.y,
          width = box.width;
      var sx = x + width - 1;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(npx(sx - 8), npx(y - 1));
      ctx.lineTo(npx(sx), npx(y - 1));
      ctx.lineTo(npx(sx), npx(y + 8));
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 0, .65)';
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "frozen",
    value: function frozen(box) {
      var ctx = this.ctx;
      var x = box.x,
          y = box.y,
          width = box.width;
      var sx = x + width - 1;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(npx(sx - 8), npx(y - 1));
      ctx.lineTo(npx(sx), npx(y - 1));
      ctx.lineTo(npx(sx), npx(y + 8));
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 255, 0, .85)';
      ctx.fill();
      ctx.restore();
    }
  }, {
    key: "rect",
    value: function rect(box, dtextcb) {
      var ctx = this.ctx;
      var x = box.x,
          y = box.y,
          width = box.width,
          height = box.height,
          bgcolor = box.bgcolor;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = bgcolor || '#fff';
      ctx.rect(npxLine(x + 1), npxLine(y + 1), npx(width - 2), npx(height - 2));
      ctx.clip();
      ctx.fill();
      dtextcb();
      ctx.restore();
    }
  }]);

  return Draw;
}();

exports.Draw = Draw;
var _default = {};
exports["default"] = _default;