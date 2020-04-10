"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = require("./element");

var _config = require("../config");

var _cell_range = require("../core/cell_range");

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var selectorHeightBorderWidth = 2 * 2 - 1;
var startZIndex = 10;

var SelectorElement = /*#__PURE__*/function () {
  function SelectorElement() {
    var _this = this;

    var useHideInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, SelectorElement);

    this.useHideInput = useHideInput;

    this.inputChange = function () {};

    this.cornerEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selector-corner"));
    this.areaEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selector-area")).child(this.cornerEl).hide();
    this.clipboardEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selector-clipboard")).hide();
    this.autofillEl = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selector-autofill")).hide();
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selector")).css('z-index', "".concat(startZIndex)).children(this.areaEl, this.clipboardEl, this.autofillEl).hide();

    if (useHideInput) {
      this.hideInput = (0, _element.h)('input', '').on('input', function (evt) {
        _this.inputChange(evt.target.value);
      });
      this.el.child(this.hideInputDiv = (0, _element.h)('div', 'hide-input').child(this.hideInput));
    }

    startZIndex += 1;
  }

  _createClass(SelectorElement, [{
    key: "setOffset",
    value: function setOffset(v) {
      this.el.offset(v).show();
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.hide();
      return this;
    }
  }, {
    key: "setAreaOffset",
    value: function setAreaOffset(v) {
      var left = v.left,
          top = v.top,
          width = v.width,
          height = v.height;
      var of = {
        width: width - selectorHeightBorderWidth + 0.8,
        height: height - selectorHeightBorderWidth + 0.8,
        left: left - 0.8,
        top: top - 0.8
      };
      this.areaEl.offset(of).show();

      if (this.useHideInput) {
        this.hideInputDiv.offset(of);
        this.hideInput.val('').focus();
      }
    }
  }, {
    key: "setClipboardOffset",
    value: function setClipboardOffset(v) {
      var left = v.left,
          top = v.top,
          width = v.width,
          height = v.height;
      this.clipboardEl.offset({
        left: left,
        top: top,
        width: width - 5,
        height: height - 5
      });
    }
  }, {
    key: "showAutofill",
    value: function showAutofill(v) {
      var left = v.left,
          top = v.top,
          width = v.width,
          height = v.height;
      this.autofillEl.offset({
        width: width - selectorHeightBorderWidth,
        height: height - selectorHeightBorderWidth,
        left: left,
        top: top
      }).show();
    }
  }, {
    key: "hideAutofill",
    value: function hideAutofill() {
      this.autofillEl.hide();
    }
  }, {
    key: "showClipboard",
    value: function showClipboard() {
      this.clipboardEl.show();
    }
  }, {
    key: "hideClipboard",
    value: function hideClipboard() {
      this.clipboardEl.hide();
    }
  }]);

  return SelectorElement;
}();

function calBRAreaOffset(offset) {
  var data = this.data;
  var left = offset.left,
      top = offset.top,
      width = offset.width,
      height = offset.height,
      scroll = offset.scroll,
      l = offset.l,
      t = offset.t;
  var ftwidth = data.freezeTotalWidth();
  var ftheight = data.freezeTotalHeight();
  var left0 = left - ftwidth;
  if (ftwidth > l) left0 -= scroll.x;
  var top0 = top - ftheight;
  if (ftheight > t) top0 -= scroll.y;
  return {
    left: left0,
    top: top0,
    width: width,
    height: height
  };
}

function calTAreaOffset(offset) {
  var data = this.data;
  var left = offset.left,
      width = offset.width,
      height = offset.height,
      l = offset.l,
      t = offset.t,
      scroll = offset.scroll;
  var ftwidth = data.freezeTotalWidth();
  var left0 = left - ftwidth;
  if (ftwidth > l) left0 -= scroll.x;
  return {
    left: left0,
    top: t,
    width: width,
    height: height
  };
}

function calLAreaOffset(offset) {
  var data = this.data;
  var top = offset.top,
      width = offset.width,
      height = offset.height,
      l = offset.l,
      t = offset.t,
      scroll = offset.scroll;
  var ftheight = data.freezeTotalHeight();
  var top0 = top - ftheight; // console.log('ftheight:', ftheight, ', t:', t);

  if (ftheight > t) top0 -= scroll.y;
  return {
    left: l,
    top: top0,
    width: width,
    height: height
  };
}

function setBRAreaOffset(offset) {
  var br = this.br;
  br.setAreaOffset(calBRAreaOffset.call(this, offset));
}

function setTLAreaOffset(offset) {
  var tl = this.tl;
  tl.setAreaOffset(offset);
}

function setTAreaOffset(offset) {
  var t = this.t;
  t.setAreaOffset(calTAreaOffset.call(this, offset));
}

function setLAreaOffset(offset) {
  var l = this.l;
  l.setAreaOffset(calLAreaOffset.call(this, offset));
}

function setLClipboardOffset(offset) {
  var l = this.l;
  l.setClipboardOffset(calLAreaOffset.call(this, offset));
}

function setBRClipboardOffset(offset) {
  var br = this.br;
  br.setClipboardOffset(calBRAreaOffset.call(this, offset));
}

function setTLClipboardOffset(offset) {
  var tl = this.tl;
  tl.setClipboardOffset(offset);
}

function setTClipboardOffset(offset) {
  var t = this.t;
  t.setClipboardOffset(calTAreaOffset.call(this, offset));
}

function setAllAreaOffset(offset) {
  setBRAreaOffset.call(this, offset);
  setTLAreaOffset.call(this, offset);
  setTAreaOffset.call(this, offset);
  setLAreaOffset.call(this, offset);
}

function setAllClipboardOffset(offset) {
  setBRClipboardOffset.call(this, offset);
  setTLClipboardOffset.call(this, offset);
  setTClipboardOffset.call(this, offset);
  setLClipboardOffset.call(this, offset);
}

var Selector = /*#__PURE__*/function () {
  function Selector(data) {
    var _this2 = this;

    _classCallCheck(this, Selector);

    this.inputChange = function () {};

    this.data = data;
    this.br = new SelectorElement(true);
    this.t = new SelectorElement();
    this.l = new SelectorElement();
    this.tl = new SelectorElement();

    this.br.inputChange = function (v) {
      _this2.inputChange(v);
    };

    this.br.el.show();
    this.offset = null;
    this.areaOffset = null;
    this.indexes = null;
    this.range = null;
    this.arange = null;
    this.el = (0, _element.h)('div', "".concat(_config.cssPrefix, "-selectors")).children(this.tl.el, this.t.el, this.l.el, this.br.el).hide(); // for performance

    this.lastri = -1;
    this.lastci = -1;
    startZIndex += 1;
  }

  _createClass(Selector, [{
    key: "resetData",
    value: function resetData(data) {
      this.data = data;
      this.range = data.selector.range;
      this.resetAreaOffset();
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.hide();
    }
  }, {
    key: "resetOffset",
    value: function resetOffset() {
      var data = this.data,
          tl = this.tl,
          t = this.t,
          l = this.l,
          br = this.br;
      var freezeHeight = data.freezeTotalHeight();
      var freezeWidth = data.freezeTotalWidth();

      if (freezeHeight > 0 || freezeWidth > 0) {
        tl.setOffset({
          width: freezeWidth,
          height: freezeHeight
        });
        t.setOffset({
          left: freezeWidth,
          height: freezeHeight
        });
        l.setOffset({
          top: freezeHeight,
          width: freezeWidth
        });
        br.setOffset({
          left: freezeWidth,
          top: freezeHeight
        });
      } else {
        tl.hide();
        t.hide();
        l.hide();
        br.setOffset({
          left: 0,
          top: 0
        });
      }
    }
  }, {
    key: "resetAreaOffset",
    value: function resetAreaOffset() {
      // console.log('offset:', offset);
      var offset = this.data.getSelectedRect();
      var coffset = this.data.getClipboardRect();
      setAllAreaOffset.call(this, offset);
      setAllClipboardOffset.call(this, coffset);
      this.resetOffset();
    }
  }, {
    key: "resetBRTAreaOffset",
    value: function resetBRTAreaOffset() {
      var offset = this.data.getSelectedRect();
      var coffset = this.data.getClipboardRect();
      setBRAreaOffset.call(this, offset);
      setTAreaOffset.call(this, offset);
      setBRClipboardOffset.call(this, coffset);
      setTClipboardOffset.call(this, coffset);
      this.resetOffset();
    }
  }, {
    key: "resetBRLAreaOffset",
    value: function resetBRLAreaOffset() {
      var offset = this.data.getSelectedRect();
      var coffset = this.data.getClipboardRect();
      setBRAreaOffset.call(this, offset);
      setLAreaOffset.call(this, offset);
      setBRClipboardOffset.call(this, coffset);
      setLClipboardOffset.call(this, coffset);
      this.resetOffset();
    }
  }, {
    key: "set",
    value: function set(ri, ci) {
      var indexesUpdated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var data = this.data;
      var cellRange = data.calSelectedRangeByStart(ri, ci);
      var sri = cellRange.sri,
          sci = cellRange.sci;

      if (indexesUpdated) {
        var cri = ri,
            cci = ci;
        if (ri < 0) cri = 0;
        if (ci < 0) cci = 0;
        data.selector.setIndexes(cri, cci);
        this.indexes = [cri, cci];
      }

      this.moveIndexes = [sri, sci]; // this.sIndexes = sIndexes;
      // this.eIndexes = eIndexes;

      this.range = cellRange;
      this.resetAreaOffset();
      this.el.show();
    }
  }, {
    key: "setEnd",
    value: function setEnd(ri, ci) {
      var moving = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var data = this.data,
          lastri = this.lastri,
          lastci = this.lastci;

      if (moving) {
        if (ri === lastri && ci === lastci) return;
        this.lastri = ri;
        this.lastci = ci;
      }

      this.range = data.calSelectedRangeByEnd(ri, ci);
      setAllAreaOffset.call(this, this.data.getSelectedRect());
    }
  }, {
    key: "reset",
    value: function reset() {
      // console.log('::::', this.data);
      var _this$data$selector$r = this.data.selector.range,
          eri = _this$data$selector$r.eri,
          eci = _this$data$selector$r.eci;
      this.setEnd(eri, eci);
    }
  }, {
    key: "showAutofill",
    value: function showAutofill(ri, ci) {
      if (ri === -1 && ci === -1) return; // console.log('ri:', ri, ', ci:', ci);
      // const [sri, sci] = this.sIndexes;
      // const [eri, eci] = this.eIndexes;

      var _this$range = this.range,
          sri = _this$range.sri,
          sci = _this$range.sci,
          eri = _this$range.eri,
          eci = _this$range.eci;
      var nri = ri,
          nci = ci; // const rn = eri - sri;
      // const cn = eci - sci;

      var srn = sri - ri;
      var scn = sci - ci;
      var ern = eri - ri;
      var ecn = eci - ci;

      if (scn > 0) {
        // left
        // console.log('left');
        this.arange = new _cell_range.CellRange(sri, nci, eri, sci - 1); // this.saIndexes = [sri, nci];
        // this.eaIndexes = [eri, sci - 1];
        // data.calRangeIndexes2(
      } else if (srn > 0) {
        // top
        // console.log('top');
        // nri = sri;
        this.arange = new _cell_range.CellRange(nri, sci, sri - 1, eci); // this.saIndexes = [nri, sci];
        // this.eaIndexes = [sri - 1, eci];
      } else if (ecn < 0) {
        // right
        // console.log('right');
        // nci = eci;
        this.arange = new _cell_range.CellRange(sri, eci + 1, eri, nci); // this.saIndexes = [sri, eci + 1];
        // this.eaIndexes = [eri, nci];
      } else if (ern < 0) {
        // bottom
        // console.log('bottom');
        // nri = eri;
        this.arange = new _cell_range.CellRange(eri + 1, sci, nri, eci); // this.saIndexes = [eri + 1, sci];
        // this.eaIndexes = [nri, eci];
      } else {
        // console.log('else:');
        this.arange = null; // this.saIndexes = null;
        // this.eaIndexes = null;

        return;
      }

      if (this.arange !== null) {
        // console.log(this.saIndexes, ':', this.eaIndexes);
        var offset = this.data.getRect(this.arange);
        offset.width += 2;
        offset.height += 2;
        var br = this.br,
            l = this.l,
            t = this.t,
            tl = this.tl;
        br.showAutofill(calBRAreaOffset.call(this, offset));
        l.showAutofill(calLAreaOffset.call(this, offset));
        t.showAutofill(calTAreaOffset.call(this, offset));
        tl.showAutofill(offset);
      }
    }
  }, {
    key: "hideAutofill",
    value: function hideAutofill() {
      var _this3 = this;

      ['br', 'l', 't', 'tl'].forEach(function (property) {
        _this3[property].hideAutofill();
      });
    }
  }, {
    key: "showClipboard",
    value: function showClipboard() {
      var _this4 = this;

      var coffset = this.data.getClipboardRect();
      setAllClipboardOffset.call(this, coffset);
      ['br', 'l', 't', 'tl'].forEach(function (property) {
        _this4[property].showClipboard();
      });
    }
  }, {
    key: "hideClipboard",
    value: function hideClipboard() {
      var _this5 = this;

      ['br', 'l', 't', 'tl'].forEach(function (property) {
        _this5[property].hideClipboard();
      });
    }
  }]);

  return Selector;
}();

exports["default"] = Selector;