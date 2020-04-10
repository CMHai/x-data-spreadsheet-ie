"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import helper from '../helper';
var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this.undoItems = [];
    this.redoItems = [];
  }

  _createClass(History, [{
    key: "add",
    value: function add(data) {
      this.undoItems.push(JSON.stringify(data));
      this.redoItems = [];
    }
  }, {
    key: "canUndo",
    value: function canUndo() {
      return this.undoItems.length > 0;
    }
  }, {
    key: "canRedo",
    value: function canRedo() {
      return this.redoItems.length > 0;
    }
  }, {
    key: "undo",
    value: function undo(currentd, cb) {
      var undoItems = this.undoItems,
          redoItems = this.redoItems;

      if (this.canUndo()) {
        redoItems.push(JSON.stringify(currentd));
        cb(JSON.parse(undoItems.pop()));
      }
    }
  }, {
    key: "redo",
    value: function redo(currentd, cb) {
      var undoItems = this.undoItems,
          redoItems = this.redoItems;

      if (this.canRedo()) {
        undoItems.push(JSON.stringify(currentd));
        cb(JSON.parse(redoItems.pop()));
      }
    }
  }]);

  return History;
}();

exports["default"] = History;