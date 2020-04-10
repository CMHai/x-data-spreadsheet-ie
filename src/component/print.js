"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

var _button = _interopRequireDefault(require("./button"));

var _draw = require("../canvas/draw");

var _table = require("./table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// resolution: 72 => 595 x 842
// 150 => 1240 x 1754
// 200 => 1654 x 2339
// 300 => 2479 x 3508
// 96 * cm / 2.54 , 96 * cm / 2.54
var PAGER_SIZES = [['A3', 11.69, 16.54], ['A4', 8.27, 11.69], ['A5', 5.83, 8.27], ['B4', 9.84, 13.90], ['B5', 6.93, 9.84]];

function inches2px(inc) {
  return 96 * inc;
}

function btnClick(type) {
  if (type === 'cancel') {
    this.el.hide();
  } else {
    this.toPrint();
  }
}

function pagerSizeChange(evt) {
  var paper = this.paper;
  var value = evt.target.value;
  var ps = PAGER_SIZES[value];
  paper.width = inches2px(ps[1]);
  paper.height = inches2px(ps[2]); // console.log('paper:', ps, paper);

  this.preview();
}

var Print = /*#__PURE__*/function () {
  function Print(data) {
    var _h;

    _classCallCheck(this, Print);

    this.paper = {
      width: inches2px(PAGER_SIZES[0][1]),
      height: inches2px(PAGER_SIZES[0][2]),
      padding: 50
    };
    this.data = data;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-print")).children((0, _element.h)('div', "".concat(_config.cssPrefix, "-print-bar")).children((0, _element.h)('div', '-title').child('Print settings'), (0, _element.h)('div', '-right').children((0, _element.h)('div', "".concat(_config.cssPrefix, "-buttons")).children(new _button["default"]('cancel').on('click', btnClick.bind(this, 'cancel')), new _button["default"]('next', 'primary').on('click', btnClick.bind(this, 'next'))))), (0, _element.h)('div', "".concat(_config.cssPrefix, "-print-content")).children(this.contentEl = (0, _element.h)('div', '-content'), (0, _element.h)('div', '-sider').child((0, _element.h)('form', '').children((0, _element.h)('fieldset', '').children((0, _element.h)('label', '').child('Pager size'), (_h = (0, _element.h)('select', '')).children.apply(_h, _toConsumableArray(PAGER_SIZES.map(function (it, index) {
      return (0, _element.h)('option', '').attr('value', index).child("".concat(it[0], " ( ").concat(it[1], "''x").concat(it[2], "'' )"));
    }))).on('change', pagerSizeChange.bind(this))))))).hide();
  }

  _createClass(Print, [{
    key: "resetData",
    value: function resetData(data) {
      this.data = data;
    }
  }, {
    key: "preview",
    value: function preview() {
      var _this = this;

      var data = this.data,
          paper = this.paper;
      var width = paper.width,
          height = paper.height,
          padding = paper.padding;
      var iwidth = width - padding * 2;
      var iheight = height - padding * 2;
      var cr = data.contentRange();
      var pages = parseInt(cr.h / iheight, 10) + 1;
      var scale = iwidth / cr.w;
      var left = padding;
      var top = padding;

      if (scale > 1) {
        left += (iwidth - cr.w) / 2;
      }

      var ri = 0;
      var yoffset = 0;
      this.contentEl.html('');
      this.canvases = [];
      var mViewRange = {
        sri: 0,
        sci: 0,
        eri: 0,
        eci: 0
      };

      var _loop = function _loop(i) {
        var th = 0;
        var yo = 0;
        var wrap = (0, _element.h)('div', "".concat(_config.cssPrefix, "-canvas-card")).css('height', "".concat(height, "px")).css('width', "".concat(width, "px"));
        var canvas = (0, _element.h)('canvas', "".concat(_config.cssPrefix, "-canvas"));

        _this.canvases.push(canvas.el);

        var draw = new _draw.Draw(canvas.el, width, height); // cell-content

        draw.save();
        draw.translate(left, top);
        if (scale < 1) draw.scale(scale, scale); // console.log('ri:', ri, cr.eri, yoffset);

        for (; ri <= cr.eri; ri += 1) {
          var rh = data.rows.getHeight(ri);
          th += rh;

          if (th < iheight) {
            for (var ci = 0; ci <= cr.eci; ci += 1) {
              (0, _table.renderCell)(draw, data, ri, ci, yoffset);
              mViewRange.eci = ci;
            }
          } else {
            yo = -(th - rh);
            break;
          }
        }

        mViewRange.eri = ri;
        draw.restore(); // merge-cell

        draw.save();
        draw.translate(left, top);
        if (scale < 1) draw.scale(scale, scale);
        var yof = yoffset;
        data.eachMergesInView(mViewRange, function (_ref) {
          var sri = _ref.sri,
              sci = _ref.sci;
          (0, _table.renderCell)(draw, data, sri, sci, yof);
        });
        draw.restore();
        mViewRange.sri = mViewRange.eri;
        mViewRange.sci = mViewRange.eci;
        yoffset += yo;

        _this.contentEl.child((0, _element.h)('div', "".concat(_config.cssPrefix, "-canvas-card-wraper")).child(wrap.child(canvas)));
      };

      for (var i = 0; i < pages; i += 1) {
        _loop(i);
      }

      this.el.show();
    }
  }, {
    key: "toPrint",
    value: function toPrint() {
      this.el.hide();
      var paper = this.paper;
      var iframe = (0, _element.h)('iframe', '').hide();
      var el = iframe.el;
      window.document.body.appendChild(el);
      var contentWindow = el.contentWindow;
      var idoc = contentWindow.document;
      var style = document.createElement('style');
      style.innerHTML = "\n      @page { size: ".concat(paper.width, "px ").concat(paper.height, "px; };\n      canvas {\n        page-break-before: auto;        \n        page-break-after: always;\n      };\n    ");
      idoc.head.appendChild(style);
      this.canvases.forEach(function (it) {
        var cn = it.cloneNode();
        cn.getContext('2d').drawImage(it, 0, 0);
        idoc.body.appendChild(cn);
      });
      contentWindow.print();
    }
  }]);

  return Print;
}();

exports["default"] = Print;