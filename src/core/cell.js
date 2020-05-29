"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infixExprToSuffixExpr = exports["default"] = void 0;

var _alphabet = require("./alphabet");

var _helper = require("./helper");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Converting infix expression to a suffix expression
// src: AVERAGE(SUM(A1,A2), B1) + 50 + B20
// return: [A1, A2], SUM[, B1],AVERAGE,50,+,B20,+
var infixExprToSuffixExpr = function infixExprToSuffixExpr(src) {
  var operatorStack = [];
  var stack = [];
  var subStrs = []; // SUM, A1, B2, 50 ...

  var fnArgType = 0; // 1 => , 2 => :

  var fnArgOperator = '';
  var fnArgsLen = 1; // A1,A2,A3...

  for (var i = 0; i < src.length; i += 1) {
    var c = src.charAt(i); // console.log('c:', c);

    if (c !== ' ') {
      if (c >= 'a' && c <= 'z') {
        subStrs.push(c.toUpperCase());
      } else if (c >= '0' && c <= '9' || c >= 'A' && c <= 'Z' || c === '.') {
        subStrs.push(c);
      } else if (c === '"') {
        i += 1;

        while (src.charAt(i) !== '"') {
          subStrs.push(src.charAt(i));
          i += 1;
        }

        stack.push("\"".concat(subStrs.join('')));
        subStrs = [];
      } else {
        // console.log('subStrs:', subStrs.join(''), stack);
        if (c !== '(' && subStrs.length > 0) {
          stack.push(subStrs.join(''));
        }

        if (c === ')') {
          var c1 = operatorStack.pop();

          if (fnArgType === 2) {
            // fn argument range => A1:B5
            try {
              var _expr2xy = (0, _alphabet.expr2xy)(stack.pop()),
                  _expr2xy2 = _slicedToArray(_expr2xy, 2),
                  ex = _expr2xy2[0],
                  ey = _expr2xy2[1];

              var _expr2xy3 = (0, _alphabet.expr2xy)(stack.pop()),
                  _expr2xy4 = _slicedToArray(_expr2xy3, 2),
                  sx = _expr2xy4[0],
                  sy = _expr2xy4[1]; // console.log('::', sx, sy, ex, ey);


              var rangelen = 0;

              for (var x = sx; x <= ex; x += 1) {
                for (var y = sy; y <= ey; y += 1) {
                  stack.push((0, _alphabet.xy2expr)(x, y));
                  rangelen += 1;
                }
              }

              stack.push([c1, rangelen]);
            } catch (e) {// console.log(e);
            }
          } else if (fnArgType === 1 || fnArgType === 3) {
            if (fnArgType === 3) stack.push(fnArgOperator); // fn argument => A1,A2,B5

            stack.push([c1, fnArgsLen]);
            fnArgsLen = 1;
          } else {
            // console.log('c1:', c1, fnArgType, stack, operatorStack);
            while (c1 !== '(') {
              stack.push(c1);
              if (operatorStack.length <= 0) break;
              c1 = operatorStack.pop();
            }
          }

          fnArgType = 0;
        } else if (c === '=' || c === '>' || c === '<') {
          var nc = src.charAt(i + 1);
          fnArgOperator = c;

          if (nc === '=' || nc === '-') {
            fnArgOperator += nc;
            i += 1;
          }

          fnArgType = 3;
        } else if (c === ':') {
          fnArgType = 2;
        } else if (c === ',') {
          if (fnArgType === 3) {
            stack.push(fnArgOperator);
          }

          fnArgType = 1;
          fnArgsLen += 1;
        } else if (c === '(' && subStrs.length > 0) {
          // function
          operatorStack.push(subStrs.join(''));
        } else {
          // priority: */ > +-
          // console.log(operatorStack, c, stack);
          if (operatorStack.length > 0 && (c === '+' || c === '-')) {
            var top = operatorStack[operatorStack.length - 1];
            if (top !== '(') stack.push(operatorStack.pop());

            if (top === '*' || top === '/') {
              while (operatorStack.length > 0) {
                top = operatorStack[operatorStack.length - 1];
                if (top !== '(') stack.push(operatorStack.pop());else break;
              }
            }
          }

          operatorStack.push(c);
        }

        subStrs = [];
      }
    }
  }

  if (subStrs.length > 0) {
    stack.push(subStrs.join(''));
  }

  while (operatorStack.length > 0) {
    stack.push(operatorStack.pop());
  }

  return stack;
};

exports.infixExprToSuffixExpr = infixExprToSuffixExpr;

var evalSubExpr = function evalSubExpr(subExpr, cellRender) {
  if (subExpr[0] >= '0' && subExpr[0] <= '9') {
    return Number(subExpr);
  }

  if (subExpr[0] === '"') {
    return subExpr.substring(1);
  }

  var _expr2xy5 = (0, _alphabet.expr2xy)(subExpr),
      _expr2xy6 = _slicedToArray(_expr2xy5, 2),
      x = _expr2xy6[0],
      y = _expr2xy6[1];

  return cellRender(x, y);
}; // evaluate the suffix expression
// srcStack: <= infixExprToSufixExpr
// formulaMap: {'SUM': {}, ...}
// cellRender: (x, y) => {}


var evalSuffixExpr = function evalSuffixExpr(srcStack, formulaMap, cellRender, cellList) {
  var stack = []; // console.log(':::::formulaMap:', formulaMap);

  for (var i = 0; i < srcStack.length; i += 1) {
    // console.log(':::>>>', srcStack[i]);
    var expr = srcStack[i];
    var fc = expr[0];

    if (expr === '+') {
      var top = stack.pop();
      stack.push((0, _helper.numberCalc)('+', stack.pop(), top));
    } else if (expr === '-') {
      if (stack.length === 1) {
        var _top = stack.pop();

        stack.push((0, _helper.numberCalc)('*', _top, -1));
      } else {
        var _top2 = stack.pop();

        stack.push((0, _helper.numberCalc)('-', stack.pop(), _top2));
      }
    } else if (expr === '*') {
      stack.push((0, _helper.numberCalc)('*', stack.pop(), stack.pop()));
    } else if (expr === '/') {
      var _top3 = stack.pop();

      stack.push((0, _helper.numberCalc)('/', stack.pop(), _top3));
    } else if (fc === '=' || fc === '>' || fc === '<') {
      var _top4 = stack.pop();

      if (!Number.isNaN(_top4)) _top4 = Number(_top4);
      var left = stack.pop();
      if (!Number.isNaN(left)) left = Number(left);
      var ret = false;

      if (fc === '=') {
        ret = left === _top4;
      } else if (expr === '>') {
        ret = left > _top4;
      } else if (expr === '>=') {
        ret = left >= _top4;
      } else if (expr === '<') {
        ret = left < _top4;
      } else if (expr === '<=') {
        ret = left <= _top4;
      }

      stack.push(ret);
    } else if (Array.isArray(expr)) {
      var _expr = _slicedToArray(expr, 2),
          formula = _expr[0],
          len = _expr[1];

      var params = [];

      for (var j = 0; j < len; j += 1) {
        params.push(stack.pop());
      } // console.log('::::params:', formulaMap, expr,  formula, params);


      stack.push(formulaMap[formula].render(params.reverse()));
    } else {
      // console.log('cellList:', cellList, expr);
      if (cellList.includes(expr)) {
        return 0;
      }

      if (fc >= 'a' && fc <= 'z' || fc >= 'A' && fc <= 'Z') {
        cellList.push(expr);
      }

      stack.push(evalSubExpr(expr, cellRender));
    } // console.log('stack:', stack);

  }

  return stack[0];
};

var cellRender = function cellRender(src, formulaMap, getCellText) {
  var cellList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (src[0] === '=') {
    var stack = infixExprToSuffixExpr(src.substring(1));
    if (stack.length <= 0) return src;
    return evalSuffixExpr(stack, formulaMap, function (x, y) {
      return cellRender(getCellText(x, y), formulaMap, getCellText, cellList);
    }, cellList);
  }

  return src;
};

var _default = {
  render: cellRender
};
exports["default"] = _default;