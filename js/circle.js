class Circle {

    constructor($ele, options) {

        this.$ele = $ele;

        this.DEFAULTS = {

        };

        this.opts = $.extend({}, this.DEFAULTS, options);

        this.degs = [];
        this.skews = [];
        this.rotate1 = [];
        this.rotate2 = [];


        this.colors = [
            '#f36f6f', '#20d2af', '#a2c449', '#75a6d1','#036f6f', '#80d2af',
            '#92c449', '#15a6d1', '#03654f', '#08d2af', '#92c449', '#19a8d1',
            '#f36f6f', '#20d2af', '#a2c449', '#75a6d1','#036f6f', '#80d2af',
            '#92c449', '#15a6d1', '#03654f', '#08d2af', '#92c449', '#19a8d1'
        ];

        this.collectedPies = [];


        this.init();
    }

    init() {


        // TODO sim  重要的事说三遍

        this.initPiesInfo(this.opts.pies);
        this.initPiesInfo(this.opts.pies);
        this.initPiesInfo(this.opts.pies);

        this.drawPies(this.piesInfo);

        this.drawArrows();

    }




    initPiesInfo(piesInfo) {

        for(let i = 0; i < piesInfo.length; i++) {
            if(piesInfo[i].percentage > 25) {
                piesInfo.splice(i + 1 , 0, {
                    percentage: piesInfo[i].percentage - 25,
                    color: piesInfo[i].color
                });
                piesInfo[i].percentage = 25;
                break;
            }
        }

        this.piesInfo = piesInfo;
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
        this.collectedPies =[];
    }

    clearArrows() {
        this.$ele.find('.arrows').empty();
    }

    drawPies(pies) {


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

        });

    }

    drawArrows() {
       this.collectPies();

        let ds = 0;

        this.collectedPies.map((pie, i) => {

            pie.degs = ds;
            ds = ds + pie.percentage * 360 / 100;

            $(`<img src="./arrow-down.svg" alt="" class="arrow" width="30" style="transform: rotate(${ds-90}deg)">`)
                .appendTo(this.$ele.find('.arrows'));
        });
    }


    divideInto(num) {

        this.clearPies();
        this.clearArrows();

        let piesInfo = [];




        for(let i = 0; i < num; i++) {
            piesInfo.push({color: this.colors[i], percentage: 100 / num});
        }

        // TODO sim

        this.initPiesInfo(piesInfo);
        this.initPiesInfo(piesInfo);
        this.initPiesInfo(piesInfo);

        this.drawPies(piesInfo);
        this.drawArrows();

        this.piesInfo = piesInfo;

        console.log('divided')
    }

    collectPies() {

        this.collectedPies = [];

        let pies = Object.assign({}, this.piesInfo);

        Object.keys(pies).map((key, i) => {
            this.collectedPies.push(pies[key]);
        });

        for(let i = 0; i < this.collectedPies.length - 1; i++) {

            if(this.collectedPies[i].color === this.collectedPies[i+1].color) {

                this.collectedPies[i].percentage += this.collectedPies[i+1].percentage;
                this.collectedPies.splice(i + 1, 1);
            }
        }

    }

   saveInfo() {
       this.collectPies();
       console.log(this.collectedPies)
   }
}
