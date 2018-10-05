;
var slider = (function()
{
    var _elements = [];
    var _config = {};
    var _currentElem = {};
    var _playTimer = {};
    var _sliderElem = {};


    function show(obj) {
        obj.element.style.display = "block";
    }

    function hide(obj) {
        obj.element.style.display = "none";
    }

    function nextElement() {
        hide(_currentElem);
        var nextIndex = _currentElem.nextIndex;
        _currentElem = _elements[nextIndex];
        show(_currentElem);
    }

    function prevElement() {
        hide(_currentElem);
        var prevIndex = _currentElem.prevIndex;
        _currentElem = _elements[prevIndex];
        show(_currentElem);
    }

    function startSlideShow()
    {
        clearTimeout(_playTimer);

        _playTimer = setInterval(function run() {
            nextElement();
        }, _config.interval);
    }

    function stopSlideShow() {
        clearTimeout(_playTimer);
    }

    function addCSS(stylePath) {
        var cssId = 'SliderStyle';
        if (!document.getElementById(cssId)) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylePath;
            head.appendChild(link);
        }
    }

    function setSliderClass(elem) {
        elem.setAttribute("class", "sliderContainer");
    }

    function addItemAnimation(item) {
        item.element.setAttribute("class", "sliderItem");
    }


    function createButtons()
    {
        var div = document.createElement('div');

        var prevBtn = document.createElement('button');
        prevBtn.onclick = prevElement;
        prevBtn.textContent = "<";
        div.appendChild(prevBtn);

        var nextBtn = document.createElement('button');
        nextBtn.onclick = nextElement;
        nextBtn.textContent = ">";
        div.appendChild(nextBtn);

        var playBtn = document.createElement('button');
        playBtn.onclick = startSlideShow;
        playBtn.textContent = "play";
        div.appendChild(playBtn);

        var stopBtn = document.createElement('button');
        stopBtn.onclick = stopSlideShow;
        stopBtn.textContent = "stop";
        div.appendChild(stopBtn);

        _sliderElem.parentNode.insertBefore(div, div.nextSibling);
    }

    return {
        create: function (id, conf) {

            addCSS(conf.stylePath);

            _elements = []; // будет ли утечка после повторного создания?
            _config = conf;
            _sliderElem = document.getElementById(id);
            
            setSliderClass(_sliderElem);

            var items = _sliderElem.getElementsByTagName('*');

            createButtons();

            var item = {
                element: "",
                nextIndex: 0,
                prevIndex: 0
            };


            // first
            if (items.length > 1) {

                var last = items.length - 1;

                item = {
                    element: items[0],
                    nextIndex: 1,
                    prevIndex: last
                };

                addItemAnimation(item);
                _elements.push(item);
                _currentElem = item;
                show(_currentElem);
            }


            for (var i = 1; i < items.length - 1; i++) {

                var tmpItem = {
                    element: items[i],
                    nextIndex: i + 1,
                    prevIndex: i - 1
                };

                addItemAnimation(tmpItem);
                hide(tmpItem);
                _elements.push(tmpItem);
            }

            // last
            if (items.length > 1) {

                last = items.length - 1;

                item = {
                    element: items[last],
                    nextIndex: 0,
                    prevIndex: last - 1
                };

                addItemAnimation(item);
                hide(item);
                _elements.push(item);
            }
        },


        next: function () {
            nextElement();
        },

        prev: function () {
            prevElement();
        },

        play: function () {
            startSlideShow();
        },

        stop: function () {
            stopSlideShow();
        }

    };
})();
