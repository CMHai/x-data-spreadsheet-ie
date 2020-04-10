"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCell = renderCell;
exports["default"] = void 0;

var _alphabet = require("../core/alphabet");

var _font = require("../core/font");

var _cell2 = _interopRequireDefault(require("../core/cell"));

var _formula = require("../core/formula");

var _format = require("../core/format");

var _draw = require("../canvas/draw");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// gobal var
var cellPaddingWidth = 5;
var tableFixedHeaderCleanStyle = {
  fillStyle: '#f4f5f8'
};
var tableGridStyle = {
  fillStyle: '#fff',
  lineWidth: _draw.thinLineWidth,
  strokeStyle: '#e6e6e6'
};

function tableFixedHeaderStyle() {
  return {
    textAlign: 'center',
    textBaseline: 'middle',
    font: "500 ".concat((0, _draw.npx)(12), "px Source Sans Pro"),
    fillStyle: '#585757',
    lineWidth: (0, _draw.thinLineWidth)(),
    strokeStyle: '#e6e6e6'
  };
}

function getDrawBox(data, rindex, cindex) {
  var yoffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var _data$cellRect = data.cellRect(rindex, cindex),
      left = _data$cellRect.left,
      top = _data$cellRect.top,
      width = _data$cellRect.width,
      height = _data$cellRect.height;

  return new _draw.DrawBox(left, top + yoffset, width, height, cellPaddingWidth);
}
/*
function renderCellBorders(bboxes, translateFunc) {
  const { draw } = this;
  if (bboxes) {
    const rset = new Set();
    // console.log('bboxes:', bboxes);
    bboxes.forEach(({ ri, ci, box }) => {
      if (!rset.has(ri)) {
        rset.add(ri);
        translateFunc(ri);
      }
      draw.strokeBorders(box);
    });
  }
}
*/


function renderCell(draw, data, rindex, cindex) {
  var yoffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sortedRowMap = data.sortedRowMap,
      rows = data.rows,
      cols = data.cols;
  if (rows.isHide(rindex) || cols.isHide(cindex)) return;
  var nrindex = rindex;

  if (sortedRowMap.has(rindex)) {
    nrindex = sortedRowMap.get(rindex);
  }

  var cell = data.getCell(nrindex, cindex);
  if (cell === null) return;
  var frozen = false;

  if ('editable' in cell && cell.editable === false) {
    frozen = true;
  }

  var style = data.getCellStyleOrDefault(nrindex, cindex);
  var dbox = getDrawBox(data, rindex, cindex, yoffset);
  dbox.bgcolor = style.bgcolor;

  if (style.border !== undefined) {
    dbox.setBorders(style.border); // bboxes.push({ ri: rindex, ci: cindex, box: dbox });

    draw.strokeBorders(dbox);
  }

  draw.rect(dbox, function () {
    // render text
    var cellText = _cell2["default"].render(cell.text || '', _formula.formulam, function (y, x) {
      return data.getCellTextOrDefault(x, y);
    });

    if (style.format) {
      // console.log(data.formatm, '>>', cell.format);
      cellText = _format.formatm[style.format].render(cellText);
    }

    var font = Object.assign({}, style.font);
    font.size = (0, _font.getFontSizePxByPt)(font.size); // console.log('style:', style);

    draw.text(cellText, dbox, {
      align: style.align,
      valign: style.valign,
      font: font,
      color: style.color,
      strike: style.strike,
      underline: style.underline
    }, style.textwrap); // error

    var error = data.validations.getError(rindex, cindex);

    if (error) {
      // console.log('error:', rindex, cindex, error);
      draw.error(dbox);
    }

    if (frozen) {
      draw.frozen(dbox);
    }
  });
}

function renderAutofilter(viewRange) {
  var data = this.data,
      draw = this.draw;

  if (viewRange) {
    var autoFilter = data.autoFilter;
    if (!autoFilter.active()) return;
    var afRange = autoFilter.hrange();

    if (viewRange.intersects(afRange)) {
      afRange.each(function (ri, ci) {
        var dbox = getDrawBox(data, ri, ci);
        draw.dropdown(dbox);
      });
    }
  }
}

function renderContent(viewRange, fw, fh, tx, ty) {
  var draw = this.draw,
      data = this.data;
  draw.save();
  draw.translate(fw, fh).translate(tx, ty);
  var exceptRowSet = data.exceptRowSet; // const exceptRows = Array.from(exceptRowSet);

  var filteredTranslateFunc = function filteredTranslateFunc(ri) {
    var ret = exceptRowSet.has(ri);

    if (ret) {
      var height = data.rows.getHeight(ri);
      draw.translate(0, -height);
    }

    return !ret;
  };

  var exceptRowTotalHeight = data.exceptRowTotalHeight(viewRange.sri, viewRange.eri); // 1 render cell

  draw.save();
  draw.translate(0, -exceptRowTotalHeight);
  viewRange.each(function (ri, ci) {
    renderCell(draw, data, ri, ci);
  }, function (ri) {
    return filteredTranslateFunc(ri);
  });
  draw.restore(); // 2 render mergeCell

  var rset = new Set();
  draw.save();
  draw.translate(0, -exceptRowTotalHeight);
  data.eachMergesInView(viewRange, function (_ref) {
    var sri = _ref.sri,
        sci = _ref.sci,
        eri = _ref.eri;

    if (!exceptRowSet.has(sri)) {
      renderCell(draw, data, sri, sci);
    } else if (!rset.has(sri)) {
      rset.add(sri);
      var height = data.rows.sumHeight(sri, eri + 1);
      draw.translate(0, -height);
    }
  });
  draw.restore(); // 3 render autofilter

  renderAutofilter.call(this, viewRange);
  draw.restore();
}

function renderSelectedHeaderCell(x, y, w, h) {
  var draw = this.draw;
  draw.save();
  draw.attr({
    fillStyle: 'rgba(75, 137, 255, 0.08)'
  }).fillRect(x, y, w, h);
  draw.restore();
} // viewRange
// type: all | left | top
// w: the fixed width of header
// h: the fixed height of header
// tx: moving distance on x-axis
// ty: moving distance on y-axis


function renderFixedHeaders(type, viewRange, w, h, tx, ty) {
  var _this = this;

  var draw = this.draw,
      data = this.data;
  var sumHeight = viewRange.h; // rows.sumHeight(viewRange.sri, viewRange.eri + 1);

  var sumWidth = viewRange.w; // cols.sumWidth(viewRange.sci, viewRange.eci + 1);

  var nty = ty + h;
  var ntx = tx + w;
  draw.save(); // draw rect background

  draw.attr(tableFixedHeaderCleanStyle);
  if (type === 'all' || type === 'left') draw.fillRect(0, nty, w, sumHeight);
  if (type === 'all' || type === 'top') draw.fillRect(ntx, 0, sumWidth, h);
  var _data$selector$range = data.selector.range,
      sri = _data$selector$range.sri,
      sci = _data$selector$range.sci,
      eri = _data$selector$range.eri,
      eci = _data$selector$range.eci; // console.log(data.selectIndexes);
  // draw text
  // text font, align...

  draw.attr(tableFixedHeaderStyle()); // y-header-text

  if (type === 'all' || type === 'left') {
    data.rowEach(viewRange.sri, viewRange.eri, function (i, y1, rowHeight) {
      var y = nty + y1;
      var ii = i;
      draw.line([0, y], [w, y]);

      if (sri <= ii && ii < eri + 1) {
        renderSelectedHeaderCell.call(_this, 0, y, w, rowHeight);
      }

      draw.fillText(ii + 1, w / 2, y + rowHeight / 2);

      if (i > 0 && data.rows.isHide(i - 1)) {
        draw.save();
        draw.attr({
          strokeStyle: '#c6c6c6'
        });
        draw.line([5, y + 5], [w - 5, y + 5]);
        draw.restore();
      }
    });
    draw.line([0, sumHeight + nty], [w, sumHeight + nty]);
    draw.line([w, nty], [w, sumHeight + nty]);
  } // x-header-text


  if (type === 'all' || type === 'top') {
    data.colEach(viewRange.sci, viewRange.eci, function (i, x1, colWidth) {
      var x = ntx + x1;
      var ii = i;
      draw.line([x, 0], [x, h]);

      if (sci <= ii && ii < eci + 1) {
        renderSelectedHeaderCell.call(_this, x, 0, colWidth, h);
      }

      draw.fillText((0, _alphabet.stringAt)(ii), x + colWidth / 2, h / 2);

      if (i > 0 && data.cols.isHide(i - 1)) {
        draw.save();
        draw.attr({
          strokeStyle: '#c6c6c6'
        });
        draw.line([x + 5, 5], [x + 5, h - 5]);
        draw.restore();
      }
    });
    draw.line([sumWidth + ntx, 0], [sumWidth + ntx, h]);
    draw.line([0, h], [sumWidth + ntx, h]);
  }

  draw.restore();
}

function renderFixedLeftTopCell(fw, fh) {
  var draw = this.draw;
  draw.save(); // left-top-cell

  draw.attr({
    fillStyle: '#f4f5f8'
  }).fillRect(0, 0, fw, fh);
  draw.restore();
}

function renderContentGrid(_ref2, fw, fh, tx, ty) {
  var sri = _ref2.sri,
      sci = _ref2.sci,
      eri = _ref2.eri,
      eci = _ref2.eci,
      w = _ref2.w,
      h = _ref2.h;
  var draw = this.draw,
      data = this.data;
  var settings = data.settings;
  draw.save();
  draw.attr(tableGridStyle).translate(fw + tx, fh + ty); // const sumWidth = cols.sumWidth(sci, eci + 1);
  // const sumHeight = rows.sumHeight(sri, eri + 1);
  // console.log('sumWidth:', sumWidth);

  draw.clearRect(0, 0, w, h);

  if (!settings.showGrid) {
    draw.restore();
    return;
  } // console.log('rowStart:', rowStart, ', rowLen:', rowLen);


  data.rowEach(sri, eri, function (i, y, ch) {
    // console.log('y:', y);
    if (i !== sri) draw.line([0, y], [w, y]);
    if (i === eri) draw.line([0, y + ch], [w, y + ch]);
  });
  data.colEach(sci, eci, function (i, x, cw) {
    if (i !== sci) draw.line([x, 0], [x, h]);
    if (i === eci) draw.line([x + cw, 0], [x + cw, h]);
  });
  draw.restore();
}

function renderFreezeHighlightLine(fw, fh, ftw, fth) {
  var draw = this.draw,
      data = this.data;
  var twidth = data.viewWidth() - fw;
  var theight = data.viewHeight() - fh;
  draw.save().translate(fw, fh).attr({
    strokeStyle: 'rgba(75, 137, 255, .6)'
  });
  draw.line([0, fth], [twidth, fth]);
  draw.line([ftw, 0], [ftw, theight]);
  draw.restore();
}
/** end */


var Table = /*#__PURE__*/function () {
  function Table(el, data) {
    _classCallCheck(this, Table);

    this.el = el;
    this.draw = new _draw.Draw(el, data.viewWidth(), data.viewHeight());
    this.data = data;
  }

  _createClass(Table, [{
    key: "resetData",
    value: function resetData(data) {
      this.data = data;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      // resize canvas
      var data = this.data;
      var rows = data.rows,
          cols = data.cols; // fixed width of header

      var fw = cols.indexWidth; // fixed height of header

      var fh = rows.height;
      this.draw.resize(data.viewWidth(), data.viewHeight());
      this.clear();
      var viewRange = data.viewRange(); // renderAll.call(this, viewRange, data.scroll);

      var tx = data.freezeTotalWidth();
      var ty = data.freezeTotalHeight();
      var _data$scroll = data.scroll,
          x = _data$scroll.x,
          y = _data$scroll.y; // 1

      renderContentGrid.call(this, viewRange, fw, fh, tx, ty);
      renderContent.call(this, viewRange, fw, fh, -x, -y);
      renderFixedHeaders.call(this, 'all', viewRange, fw, fh, tx, ty);
      renderFixedLeftTopCell.call(this, fw, fh);

      var _data$freeze = _slicedToArray(data.freeze, 2),
          fri = _data$freeze[0],
          fci = _data$freeze[1];

      if (fri > 0 || fci > 0) {
        // 2
        if (fri > 0) {
          var vr = viewRange.clone();
          vr.sri = 0;
          vr.eri = fri - 1;
          vr.h = ty;
          renderContentGrid.call(this, vr, fw, fh, tx, 0);
          renderContent.call(this, vr, fw, fh, -x, 0);
          renderFixedHeaders.call(this, 'top', vr, fw, fh, tx, 0);
        } // 3


        if (fci > 0) {
          var _vr = viewRange.clone();

          _vr.sci = 0;
          _vr.eci = fci - 1;
          _vr.w = tx;
          renderContentGrid.call(this, _vr, fw, fh, 0, ty);
          renderFixedHeaders.call(this, 'left', _vr, fw, fh, 0, ty);
          renderContent.call(this, _vr, fw, fh, 0, -y);
        } // 4


        var freezeViewRange = data.freezeViewRange();
        renderContentGrid.call(this, freezeViewRange, fw, fh, 0, 0);
        renderFixedHeaders.call(this, 'all', freezeViewRange, fw, fh, 0, 0);
        renderContent.call(this, freezeViewRange, fw, fh, 0, 0); // 5

        renderFreezeHighlightLine.call(this, fw, fh, tx, ty);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.draw.clear();
    }
  }]);

  return Table;
}();

var _default = Table;
exports["default"] = _default;