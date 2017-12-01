class Circle {

    constructor($ele, options) {

        this.$ele = $ele;


        this.DEFAULTS = {
            inner: 90
        };

        this.opts = $.extend({}, this.DEFAULTS, options);

        this.degs = [];
        this.skews = [];
        this.rotate1 = [];
        this.rotate2 = [];
        this.inner = this.opts.inner;

        this.colors = ['#f36f6f', '#20d2af', '#a2c449', '#75a6d1','#036f6f', '#80d2af', '#92c449', '#15a6d1', '#03654f', '#08d2af', '#92c449', '#19a8d1'];


        this.init();
    }

    init() {


        // TODO sim

        this.initPiesInfo(this.opts.pies);
        this.initPiesInfo(this.opts.pies);
        this.initPiesInfo(this.opts.pies);

        this.drawPies(this.piesInfo);

    }

    clearInner() {

        let inner = this.inner;

        this.$ele.find("ul li a").each(function(index,element){
            $(element).css("background", "radial-gradient(transparent " + inner / Math.sqrt(2) + "%," + $(element).css("background-color") + " " + inner / Math.sqrt(2) + "%)");
        });

    }


    initPiesInfo(piesInfo) {

        piesInfo.map((pie, i) => {
            if(pie.percentage > 25) {
                piesInfo.splice(i, 0, {
                    percentage: pie.percentage - 25,
                    color: pie.color
                });
                pie.percentage = 25;
            }
        });

        this.piesInfo = this.opts.pies;
    }


    updatePercentage(index, percentage) {
        let difference = (percentage - this.piesInfo[index].percentage);
        this.piesInfo[index].percentage = percentage;
        this.piesInfo[index+1].percentage = this.piesInfo[index+1].percentage - difference;

        // TODO：when index + 1 percentage < 0 || index + num > pies Count || percentage > 25

        // or:    1. collect   2. update


        this.clearPies();

        this.drawPies(this.piesInfo);
    }

    clearPies() {
        this.$ele.find('ul').empty();
        this.degs = [];
        this.skews = [];
        this.rotate1 = [];
        this.rotate2 = [];
    }

    drawPies(pies) {

        this.inner = this.opts.inner;

        pies.map((pie, i) => {
            this.degs.push(pie.percentage * 360 / 100);

            this.skews.push(90 - this.degs[i]);

            this.rotate1.push(90 - this.degs[i] / 2);

            let ds = 0;

            for(let j = 0; j < i; j++) {
                ds += this.degs[j];
            }

            this.rotate2.push(ds);


            let $a = $('<a></a>').css({
                "transform": `skew(-${this.skews[i]}deg) rotate(-${this.rotate1[i]}deg) scale(1)`,
                "background": pie.color
            });
            let $li = $('<li></li>').css("transform", `rotate(${this.rotate2[i]}deg) skew(${this.skews[i]}deg)`).append($a);

            this.$ele.find('ul').append($li);

            // $('<i>123</i>').css({
            //     top: $li.height() + 'px',
            //     left: $li.width() + 'px',
            //     "z-index": 9999999,
            //     background: '#000'
            // }).appendTo($li);
        });

        // this.clearInner()
    }


    addArrows() {

    }

    divideInto(num) {

        this.clearPies();

        let piesInfo = [];

        console.log(100 / num);


        for(let i = 0; i < num; i++) {
            piesInfo.push({color: this.colors[i], percentage: 100 / num});
        }

        // TODO sim

        this.initPiesInfo(piesInfo);
        this.initPiesInfo(piesInfo);
        this.initPiesInfo(piesInfo);

        this.drawPies(piesInfo);


        this.piesInfo = piesInfo;
    }

    collectPies() {
        let pies = Object.assign({}, this.piesInfo);
        for(let i = 0; i < pies.length - 1; i++) {
            if(pies[i].color === pies[i+1].color) {
                pies[i+1].percentage += pies[i].percentage;
                pies.splice(i, 1);
            }
        }
    }

   saveInfo() {
        this.collectPies();
        console.log(this.piesInfo);

   }
}
