(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueAnimatedList = factory());
}(this, function () { 'use strict';
  function install (Vue) {
    var _ = Vue.util
    var transitionEndEvent = _.transitionEndEvent
    var addClass = _.addClass
    var removeClass = _.removeClass
    var on = _.on
    var off = _.off
    var transitionProp = _.transitionProp

    // patch v-for
    var vFor = Vue.directive('for')
    var diff = vFor.diff
    vFor.diff = function () {
      var needMoveTransition = prepareMoveTransition(this.frags)
      diff.apply(this, arguments)
      if (needMoveTransition) {
        applyMoveTransition(this.frags)
      }
    }

    /**
     * Check if move transitions are needed, and if so,
     * record the bounding client rects for each item.
     *
     * @param {Array<Fragment>|undefined} frags
     * @return {Boolean|undefined}
     */

    function prepareMoveTransition (frags) {
      var transition =
        transitionEndEvent && // css transition supported?
        frags && frags.length && // has frags to be moved?
        frags[0].node.__v_trans // has transitions?
      if (transition) {
        var node = frags[0].node
        var moveClass = transition.id + '-move'
        var moving = node._pendingMoveCb
        var hasTransition = false
        if (!moving) {
          // sniff whether element has a transition duration for transform
          // with the move class applied
          addClass(node, moveClass)
          var type = transition.getCssTransitionType(moveClass)
          if (type === 'transition') {
            var computedStyles = window.getComputedStyle(node)
            var transitionedProps = computedStyles[transitionProp + 'Property']
            if (/\btransform(,|$)/.test(transitionedProps)) {
              hasTransition = true
            }
          }
          removeClass(node, moveClass)
        }
        if (moving || hasTransition) {
          frags.forEach(function (frag) {
            frag._oldPos = frag.node.getBoundingClientRect()
          })
          return true
        }
      }
    }

    /**
     * Apply move transitions.
     * Calculate new target positions after the move, then apply the
     * FLIP technique to trigger CSS transforms.
     *
     * @param {Array<Fragment>} frags
     */

    function applyMoveTransition (frags) {
      frags.forEach(function (frag) {
        var node = frag.node
        var oldPos = frag._oldPos
        if (!oldPos) return
        if (!frag.moved) {
          // transition busting to ensure correct bounding rect:
          // if an element has an ongoing transition and not "reinserted",
          // the bounding rect will not be calculated at its target position,
          // but rather an in-transition position.
          var p = node.parentNode
          var next = node.nextSibling
          p.removeChild(node)
          p.insertBefore(node, next)
        }
        var newPos = node.getBoundingClientRect()
        var dx = oldPos.left - newPos.left
        var dy = oldPos.top - newPos.top
        if (dx !== 0 || dy !== 0) {
          frag.moved = true
          node.style.transform =
          node.style.WebkitTransform =
            'translate(' + dx + 'px, ' + dy + 'px)'
          node.style.transitionDuration = '0s'
        } else {
          frag.moved = false
        }
      })
      Vue.nextTick(function () {
        var f = document.documentElement.offsetHeight
        frags.forEach(function (frag) {
          var node = frag.node
          var moveClass = node.__v_trans.id + '-move'
          if (frag.moved) {
            addClass(node, moveClass)
            node.style.transform = node.style.WebkitTransform = ''
            node.style.transitionDuration = ''
            if (node._pendingMoveCb) {
              off(node, transitionEndEvent, node._pendingMoveCb)
            }
            node._pendingMoveCb = function cb () {
              off(node, transitionEndEvent, cb)
              node._pendingMoveCb = null
              removeClass(node, moveClass)
            }
            on(node, transitionEndEvent, node._pendingMoveCb)
          }
        })
      })
    }
  }

  if (typeof Vue !== 'undefined') {
    Vue.use(install)
  }
  return install
}));