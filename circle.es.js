"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle($ele, options) {
        _classCallCheck(this, Circle);

        this.$ele = $ele;

        this.bindEvents();

        this.DEFAULTS = {
            inner: 90
        };

        this.opts = $.extend({}, this.DEFAULTS, options);

        // this.count = this.opts.pies.length;

        this.degs = [];
        this.startDeg = 0;
        this.skews = [];
        this.rotate1 = [];
        this.rotate2 = [];
        this.inner = 90;

        this.init();
    }

    _createClass(Circle, [{
        key: "clearInner",
        value: function clearInner() {

            var inner = this.inner;

            this.$ele.find("ul li a").each(function (index, element) {
                $(element).css("background", "radial-gradient(transparent " + inner / Math.sqrt(2) + "%," + $(element).css("background-color") + " " + inner / Math.sqrt(2) + "%)");
            });
        }
    }, {
        key: "initPiesInfo",
        value: function initPiesInfo() {
            this.piesInfo = this.opts.pies;
        }
    }, {
        key: "updatePercentage",
        value: function updatePercentage(index, percentage) {}
    }, {
        key: "init",
        value: function init() {
            var _this = this;

            this.initPiesInfo();

            this.inner = this.opts.inner;

            this.opts.pies.map(function (pie, i) {
                _this.degs.push(pie.percentage * 360 / 100);
                _this.skews.push(90 - _this.degs[i]);
                _this.rotate1.push(90 - _this.degs[i] / 2);

                var ds = 0;
                for (var j = 0; j < i; j++) {
                    ds += _this.degs[i];
                }

                _this.rotate2.push(_this.startDeg + ds);

                var $a = $('<a></a>').css({
                    "transform": "skew(-" + _this.skews[i] + "deg) rotate(-" + _this.rotate1[i] + "deg) scale(1)",
                    "background": pie.color
                });
                var $li = $('<li></li>').css("transform", "rotate(" + _this.rotate2[i] + "deg) skew(" + _this.skews[i] + "deg)").append($a);
                _this.$ele.find('ul').append($li);
            });
            this.clearInner();
        }
    }, {
        key: "addPie",
        value: function addPie() {}
    }, {
        key: "delPie",
        value: function delPie() {}
    }, {
        key: "bindEvents",
        value: function bindEvents() {}
    }, {
        key: "saveInfo",
        value: function saveInfo() {
            console.log(this.piesInfo);
        }
    }]);

    return Circle;
}();
