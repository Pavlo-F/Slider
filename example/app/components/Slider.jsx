
const Settigns = require('./Settings.jsx');
const Styles = require('./Styles.jsx');

class Slider {
    constructor(id, conf) {
        this.settings = new Settigns();
        this.styles = new Styles();

        this.elements = [];
        this.playTimer = {};
        this.sliderElem = {};
        this.currentIndex = 0;
        this.playBtn = {};
        this.isPlay = false;
        this.nextHideTimeOut = {};
        this.prevHideTimeOut = {};
        this.prevClickTime = new Date();
        this.slideOrder = 1;
        this.clientX = 0;
        this.mouseIsDown = false;

        this.config = this.settings.checkConfig(conf);

        this.styles.addCSS(this.config.stylePath);
        this.sliderElem = document.querySelector(`#${id}`);

        this.sliderElem.style.width = this.config.width;
        this.sliderElem.style.height = this.config.height;

        const allElem = this.sliderElem.getElementsByTagName('*');

        this.elements = [...allElem];

        for (let i = 0; i < this.elements.length; i += 1) {
            const elem = this.elements[i];
            elem.style.animationDuration = `${this.config.animateTime} ms`;
            this.settings.setMaxSize(elem);
            this.hide(elem);
        }

        this.styles.setSliderClass(this.sliderElem);
        this.show(this.elements[0]);

        
        if (this.config.showButtons === true) {
            this.createButtons();
        }

        if (this.config.autoPlay === true) {
            this.startSlideShow();
        }

        this.addMouseEvents();


    }

    show(elem) {
        this.funcName = 'show';
        elem.style.display = 'block';
    }

    hide(elem) {
        this.funcName = 'hide';
        elem.style.display = 'none';
    }

    blockClick(blockTime, prevClickTime) {
        this.funcName = 'blockClick';

        const diff = new Date().getTime() - prevClickTime;

        return diff < blockTime;
    }

    nextElement() {
        this.funcName = 'nextElement';
        this.slideOrder = 1;

        if (this.blockClick(this.config.animateTime, this.prevClickTime)) {
            return;
        }

        this.prevClickTime = new Date();

        var current = this.elements[this.currentIndex];
        this.styles.addItemAnimationNext(current, 1);
        clearTimeout(this.prevHideTimeOut);

        var that = this;

        this.nextHideTimeOut = setTimeout(function run() {
            that.hide(current);
        }, this.config.animateTime - 100);

        this.currentIndex += 1;

        if (this.currentIndex === this.elements.length) {
            this.currentIndex = 0;
        }

        const next = this.elements[this.currentIndex];
        this.styles.addItemAnimationNext(next, -1);
        this.show(next);
    }

    prevElement() {
        this.slideOrder = -1;

        if (this.blockClick(this.config.animateTime, this.prevClickTime)) {
            return;
        }

        this.prevClickTime = new Date();

        var current = this.elements[this.currentIndex];
        this.styles.addItemAnimationBack(current, 1);

        clearTimeout(this.nextHideTimeOut);

        var that = this;
        this.prevHideTimeOut = setTimeout(function run() {
            that.hide(current);
        }, this.config.animateTime - 100);

        this.currentIndex -= 1;

        if (this.currentIndex < 0) {
            this.currentIndex = this.elements.length - 1;
        }

        const next = this.elements[this.currentIndex];
        this.styles.addItemAnimationBack(next, -1);
        this.show(next);
    }

    startSlideShow() {
        this.isPlay = !this.isPlay;

        if (this.isPlay) {
            this.stopSlideShow();

            var that = this;
            this.playTimer = setInterval(function run() {
                if (that.slideOrder === 1) {
                    that.nextElement();
                } else {
                    that.prevElement();
                }
            }, this.config.interval);

            this.stopBtnIcon(this.playBtn);
        } else {
            this.playBtnIcon(this.playBtn);
            this.stopSlideShow();
        }
    }

    stopSlideShow() {
        clearTimeout(this.playTimer);
    }

    createButtons() {
        const prevBtnCtn = document.createElement('div');
        prevBtnCtn.style.display = 'flex';
        const prevBtn = document.createElement('div');
        prevBtn.addEventListener('click', this.prevElement.bind(this), false);
        prevBtn.style.top = '50%';
        prevBtn.setAttribute('class', 'btnLeft');
        prevBtnCtn.appendChild(prevBtn);
        this.sliderElem.appendChild(prevBtnCtn);


        const nextBtnCtn = document.createElement('div');
        nextBtnCtn.style.display = 'flex';
        nextBtnCtn.style.justifyContent = 'flex-end';
        const nextBtn = document.createElement('div');
        nextBtn.addEventListener('click', this.nextElement.bind(this), false);
        nextBtn.style.position = 'absolute';
        nextBtn.style.top = '50%';
        nextBtn.setAttribute('class', 'btnRight');
        nextBtnCtn.appendChild(nextBtn);
        this.sliderElem.appendChild(nextBtnCtn);


        const playBtnCtn = document.createElement('div');
        playBtnCtn.style.display = 'flex';
        playBtnCtn.style.justifyContent = 'center';
        this.playBtn = document.createElement('div');
        this.playBtn.addEventListener('click', this.startSlideShow.bind(this), false);
        this.playBtn.style.position = 'absolute';
        this.playBtn.style.top = '50%';
        this.playBtn.setAttribute('class', 'btnPlay');
        playBtnCtn.appendChild(this.playBtn);
        this.sliderElem.appendChild(playBtnCtn);
    }

    playBtnIcon(btn) {
        if (this.config.showButtons === true) {
            btn.style.borderTop = '15px solid transparent';
            btn.style.borderBottom = '15px solid transparent';
            btn.style.borderLeft = '15px solid white';
            btn.style.borderRight = '0';
        }
    }

    stopBtnIcon(btn) {
        if (this.config.showButtons === true) {
            btn.style.borderTop = '15px solid white';
            btn.style.borderBottom = '15px solid white';
            btn.style.borderLeft = '25px solid white';
            btn.style.borderRight = '5px solid white';
        }
    }

    
    addMouseEvents() {
        var that = this;

        this.sliderElem.addEventListener('mousedown', function run(e) {
            that.clientX = e.pageX;
            that.mouseIsDown = true;
        }, false);

        this.sliderElem.addEventListener('mouseup', function run(e) {
            that.mouseSlide(e);
            that.mouseIsDown = false;
        }, false);


        this.sliderElem.addEventListener('mouseout', function run(e) {
            if (that.mouseIsDown) {
                that.mouseSlide(e);
            }

            that.mouseIsDown = false;
        }, false);

        this.sliderElem.addEventListener('dragstart', function run(e) {
            e.preventDefault();
        }, false);
    }

    mouseSlide(e) {
        const eps = e.pageX - this.clientX;
        const isForward = eps < 0;

        if (Math.abs(eps) > 30) {
            if (isForward) {
                this.nextElement();
            } else {
                this.prevElement();
            }
        }
    }
}

module.exports = Slider;
