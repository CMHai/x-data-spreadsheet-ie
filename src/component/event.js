"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bind = bind;
exports.unbind = unbind;
exports.unbindClickoutside = unbindClickoutside;
exports.bindClickoutside = bindClickoutside;
exports.mouseMoveUp = mouseMoveUp;
exports.bindTouch = bindTouch;

/* global window */
function bind(target, name, fn) {
  target.addEventListener(name, fn);
}

function unbind(target, name, fn) {
  target.removeEventListener(name, fn);
}

function unbindClickoutside(el) {
  if (el.xclickoutside) {
    unbind(window.document.body, 'click', el.xclickoutside);
    delete el.xclickoutside;
  }
} // the left mouse button: mousedown → mouseup → click
// the right mouse button: mousedown → contenxtmenu → mouseup
// the right mouse button in firefox(>65.0): mousedown → contenxtmenu → mouseup → click on window


function bindClickoutside(el, cb) {
  el.xclickoutside = function (evt) {
    // ignore double click
    // console.log('evt:', evt);
    if (evt.detail === 2 || el.contains(evt.target)) return;
    if (cb) cb(el);else {
      el.hide();
      unbindClickoutside(el);
    }
  };

  bind(window.document.body, 'click', el.xclickoutside);
}

function mouseMoveUp(target, movefunc, upfunc) {
  bind(target, 'mousemove', movefunc);
  var t = target;

  t.xEvtUp = function (evt) {
    // console.log('mouseup>>>');
    unbind(target, 'mousemove', movefunc);
    unbind(target, 'mouseup', target.xEvtUp);
    upfunc(evt);
  };

  bind(target, 'mouseup', target.xEvtUp);
}

function calTouchDirection(spanx, spany, evt, cb) {
  var direction = ''; // console.log('spanx:', spanx, ', spany:', spany);

  if (Math.abs(spanx) > Math.abs(spany)) {
    // horizontal
    direction = spanx > 0 ? 'right' : 'left';
    cb(direction, spanx, evt);
  } else {
    // vertical
    direction = spany > 0 ? 'down' : 'up';
    cb(direction, spany, evt);
  }
} // cb = (direction, distance) => {}


function bindTouch(target, _ref) {
  var move = _ref.move,
      end = _ref.end;
  var startx = 0;
  var starty = 0;
  bind(target, 'touchstart', function (evt) {
    var _evt$touches$ = evt.touches[0],
        pageX = _evt$touches$.pageX,
        pageY = _evt$touches$.pageY;
    startx = pageX;
    starty = pageY;
  });
  bind(target, 'touchmove', function (evt) {
    if (!move) return;
    var _evt$changedTouches$ = evt.changedTouches[0],
        pageX = _evt$changedTouches$.pageX,
        pageY = _evt$changedTouches$.pageY;
    var spanx = pageX - startx;
    var spany = pageY - starty;

    if (Math.abs(spanx) > 10 || Math.abs(spany) > 10) {
      // console.log('spanx:', spanx, ', spany:', spany);
      calTouchDirection(spanx, spany, evt, move);
      startx = pageX;
      starty = pageY;
    }

    evt.preventDefault();
  });
  bind(target, 'touchend', function (evt) {
    if (!end) return;
    var _evt$changedTouches$2 = evt.changedTouches[0],
        pageX = _evt$changedTouches$2.pageX,
        pageY = _evt$changedTouches$2.pageY;
    var spanx = pageX - startx;
    var spany = pageY - starty;
    calTouchDirection(spanx, spany, evt, end);
  });
}