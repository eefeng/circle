class Circle {

    constructor($ele, options) {

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



        this.init();
    }

    clearInner() {
        this.$ele.find("ul li a").each(function(index,element){
            $(element).css("background", "radial-gradient(transparent " + this.inner / Math.sqrt(2) + "%," + $(element).css("background-color") + " " + this.inner / Math.sqrt(2) + "%)");
        });
    }


    initPiesInfo() {
        this.piesInfo = this.opts.pies;
    }

    updatePercentage(index, percentage) {

    }

    init() {

        this.initPiesInfo()


        this.inner = this.opts.inner;

        this.opts.pies.map((pie, i) => {
            this.degs.push(pie.percentage * 360 / 100);
            this.skews.push(90 - this.degs[i]);
            this.rotate1.push(90 - this.degs[i] / 2);

            let ds = 0;
            for(let j = 0; j < i; j++) {
                ds += this.degs[i];
            }

            this.rotate2.push(this.startDeg + ds);

           let $a = $('<a></a>').css({
               "transform": "skew(-" + this.skews[i] + "deg) rotate(-" + this.rotate1[i] + "deg) scale(1)",
               "background": pie.color
           });
           let $li = $('<li></li>').css("transform", "rotate(" + this.rotate2[i] + "deg) skew(" + this.skews[i] + "deg)").append($a);
           this.$ele.find('ul').append($li);
        });
        this.clearInner()

    }

    addPie() {

    }

    delPie() {

    }


    bindEvents() {

    }

   saveInfo() {
        console.log(this.piesInfo)
   }


}
