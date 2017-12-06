'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function () {
    function Circle($ele, options) {
        _classCallCheck(this, Circle);

        this.$ele = $ele;

        this.DEFAULTS = {};

        this.opts = $.extend({}, this.DEFAULTS, options);

        this.degs = [];
        this.skews = [];
        this.rotate1 = [];
        this.rotate2 = [];

        this.colors = ['#f36f6f', '#20d2af', '#a2c449', '#75a6d1', '#036f6f', '#80d2af', '#92c449', '#15a6d1', '#03654f', '#08d2af', '#92c449', '#19a8d1', '#f36f6f', '#20d2af', '#a2c449', '#75a6d1', '#036f6f', '#80d2af', '#92c449', '#15a6d1', '#03654f', '#08d2af', '#92c449', '#19a8d1'];

        this.collectedPies = [];

        if (this.checkPercentage()) {
            this.init();
        }
    }

    _createClass(Circle, [{
        key: 'checkPercentage',
        value: function checkPercentage() {
            var total = 0;
            this.opts.pies.map(function (pie, i) {
                total += pie.percentage;
            });
            if (total <= 100.1 && total >= 99.9) {
                return true;
            } else {
                console.error('total percentage exceed, please check \'pies\'');
                return false;
            }
        }
    }, {
        key: 'init',
        value: function init() {

            // TODO sim  重要的事说三遍

            this.initPiesInfo(this.opts.pies);
            this.initPiesInfo(this.opts.pies);
            this.initPiesInfo(this.opts.pies);

            this.drawPies(this.piesInfo);

            this.drawArrows();
        }
    }, {
        key: 'initPiesInfo',
        value: function initPiesInfo(piesInfo) {

            for (var i = 0; i < piesInfo.length; i++) {
                if (piesInfo[i].percentage > 25) {
                    piesInfo.splice(i + 1, 0, {
                        percentage: piesInfo[i].percentage - 25,
                        color: piesInfo[i].color
                    });
                    piesInfo[i].percentage = 25;
                    break;
                }
            }

            this.piesInfo = piesInfo;
        }
    }, {
        key: 'updatePercentage',
        value: function updatePercentage(index, percentage) {
            var difference = percentage - this.piesInfo[index].percentage;
            this.piesInfo[index].percentage = percentage;
            this.piesInfo[index + 1].percentage = this.piesInfo[index + 1].percentage - difference;

            // TODO：when index + 1 percentage < 0 || index + num > pies Count || percentage > 25

            // or:    1. collect   2. update


            this.clearPies();

            this.drawPies(this.piesInfo);
        }
    }, {
        key: 'clearPies',
        value: function clearPies() {
            this.$ele.find('ul').empty();
            this.degs = [];
            this.skews = [];
            this.rotate1 = [];
            this.rotate2 = [];
            this.collectedPies = [];
        }
    }, {
        key: 'clearArrows',
        value: function clearArrows() {
            this.$ele.find('.arrows').empty();
        }
    }, {
        key: 'drawPies',
        value: function drawPies(pies) {
            var _this = this;

            pies.map(function (pie, i) {
                _this.degs.push(pie.percentage * 360 / 100);

                _this.skews.push(90 - _this.degs[i]);

                _this.rotate1.push(90 - _this.degs[i] / 2);

                var ds = 0;

                for (var j = 0; j < i; j++) {
                    ds += _this.degs[j];
                }

                _this.rotate2.push(ds);

                var $a = $('<a></a>').css({
                    "transform": 'skew(-' + _this.skews[i] + 'deg) rotate(-' + _this.rotate1[i] + 'deg) scale(1)',
                    "background": pie.color
                });
                var $li = $('<li></li>').css("transform", 'rotate(' + _this.rotate2[i] + 'deg) skew(' + _this.skews[i] + 'deg)').append($a);

                _this.$ele.find('ul').append($li);
            });
        }
    }, {
        key: 'drawArrows',
        value: function drawArrows() {
            var _this2 = this;

            console.log(this.opts);
            this.collectPies();

            var ds = 0;

            this.collectedPies.map(function (pie, i) {

                pie.degs = ds;
                ds = ds + pie.percentage * 360 / 100;

                $('<img src=' + _this2.opts.arrowUrl + ' alt="" class="arrow" width="16" style="transform: rotate(' + (ds - 90) + 'deg)">').appendTo(_this2.$ele.find('.arrows'));
            });
        }
    }, {
        key: 'divideInto',
        value: function divideInto(num) {

            this.clearPies();
            this.clearArrows();

            var piesInfo = [];

            for (var i = 0; i < num; i++) {
                piesInfo.push({ color: this.colors[i], percentage: 100 / num });
            }

            // TODO sim

            this.initPiesInfo(piesInfo);
            this.initPiesInfo(piesInfo);
            this.initPiesInfo(piesInfo);

            this.drawPies(piesInfo);
            this.drawArrows();

            this.piesInfo = piesInfo;

            console.log('divided');
        }
    }, {
        key: 'collectPies',
        value: function collectPies() {
            var _this3 = this;

            this.collectedPies = [];

            var pies = Object.assign({}, this.piesInfo);

            Object.keys(pies).map(function (key, i) {
                _this3.collectedPies.push(pies[key]);
            });

            for (var i = 0; i < this.collectedPies.length - 1; i++) {

                if (this.collectedPies[i].color === this.collectedPies[i + 1].color) {

                    this.collectedPies[i].percentage += this.collectedPies[i + 1].percentage;
                    this.collectedPies.splice(i + 1, 1);
                }
            }
        }
    }, {
        key: 'saveInfo',
        value: function saveInfo() {
            this.collectPies();
            console.log(this.collectedPies, this.piesInfo);
        }
    }]);

    return Circle;
}();
