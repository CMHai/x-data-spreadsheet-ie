"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// src: include chars: [0-9], +, -, *, /
// // 9+(3-1)*3+10/2 => 9 3 1-3*+ 10 2/+
var infix2suffix = function infix2suffix(src) {
  var operatorStack = [];
  var stack = [];

  for (var i = 0; i < src.length; i += 1) {
    var c = src.charAt(i);

    if (c !== ' ') {
      if (c >= '0' && c <= '9') {
        stack.push(c);
      } else if (c === ')') {
        var c1 = operatorStack.pop();

        while (c1 !== '(') {
          stack.push(c1);
          c1 = operatorStack.pop();
        }
      } else {
        // priority: */ > +-
        if (operatorStack.length > 0 && (c === '+' || c === '-')) {
          var last = operatorStack[operatorStack.length - 1];

          if (last === '*' || last === '/') {
            while (operatorStack.length > 0) {
              stack.push(operatorStack.pop());
            }
          }
        }

        operatorStack.push(c);
      }
    }
  }

  while (operatorStack.length > 0) {
    stack.push(operatorStack.pop());
  }

  return stack;
};

var _default = {
  infix2suffix: infix2suffix
};
exports["default"] = _default;