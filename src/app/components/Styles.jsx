class Styles {
    addCSS(stylePath) {
        this.funcName = 'addCSS';

        const cssId = 'SliderStyle';

        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylePath;
            document.head.appendChild(link);
        }
    }

    setSliderClass(elem) {
        this.funcName = 'setSliderClass';

        elem.setAttribute('class', 'sliderContainer');
    }

    addItemAnimationNext(item, order) {
        this.funcName = 'addItemAnimationNext';

        if (order === 1) {
            item.setAttribute('class', 'sliderCurrentForward');
        } else {
            item.setAttribute('class', 'sliderCurrentToOut');
        }
    }

    addItemAnimationBack(item, order) {
        this.funcName = 'addItemAnimationBack';

        if (order === 1) {
            item.setAttribute('class', 'sliderCurrentBackward');
        } else {
            item.setAttribute('class', 'sliderCurrentToOutBack');
        }
    }
}

module.exports = Styles;
