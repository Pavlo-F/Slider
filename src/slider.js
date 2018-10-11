;
(function()
{
    return slider = function(id, conf)
    {
        var _elements = [];
        var _config = {};
        var _playTimer = {};
        var _sliderElem = {};
        var _currentIndex = 0;
        var _playBtn = {};
        var _isPlay = false;
        var _nextHideTimeOut = {};
        var _prevHideTimeOut = {};
        var _prevClickTime = new Date();
        var _slideOrder = 1;
        var _clientX;
        var _mouseIsDown = false;

        _config = checkConfig(conf);

        addCSS(_config.stylePath);

        _sliderElem = document.getElementById(id);
        _sliderElem.style.width = conf.width;
        _sliderElem.style.height = conf.height;

        var allElem = _sliderElem.getElementsByTagName('*');

        var _elements = [...allElem];
        for(var i = 0; i < _elements.length; i++)
        {
            var elem = _elements[i];
            elem.style.animationDuration = _config.animateTime + "ms";
            setMaxSize(elem);
            hide(elem);
        }

        setSliderClass(_sliderElem);
        show(_elements[0]);

        
        if(_config.showButtons === true) {
            createButtons();
        }

        if(_config.autoPlay === true) {
            startSlideShow();
        }

        function show(elem) {
            elem.style.display = "block";
        }

        function hide(elem) {
            elem.style.display = "none";
        }

        function blockClick(blockTime, prevClickTime) {
            var diff = new Date().getTime() - prevClickTime;

            return diff < blockTime;
        }

        function nextElement() {

            _slideOrder = 1;

            if (blockClick(_config.animateTime, _prevClickTime)) {
                return;
            }

            _prevClickTime = new Date();
            
            var current = _elements[_currentIndex];
            addItemAnimationNext(current, 1);

            clearTimeout(_prevHideTimeOut);

            _nextHideTimeOut = setTimeout(function run() {
                hide(current);
            }, _config.animateTime - 100);

            _currentIndex++;

            if(_currentIndex === _elements.length) {
                _currentIndex = 0;
            }

            var next = _elements[_currentIndex];
            addItemAnimationNext(next, -1);
            show(next);
        }

        function prevElement() {

            _slideOrder = -1;

            if (blockClick(_config.animateTime, _prevClickTime)) {
                return;
            }

            _prevClickTime = new Date();

            var current = _elements[_currentIndex];
            addItemAnimationBack(current, 1);

            clearTimeout(_nextHideTimeOut);

            _prevHideTimeOut = setTimeout(function run() {
                hide(current);
            }, _config.animateTime - 100);

            _currentIndex--;

            if(_currentIndex < 0) {
                _currentIndex = _elements.length - 1;
            }

            var next = _elements[_currentIndex];
            addItemAnimationBack(next, -1);
            show(next);
        }



        function startSlideShow()
        {
            _isPlay = !_isPlay;

            if(_isPlay)
            {
                stopSlideShow();

                _playTimer = setInterval(function run() {
                    if (_slideOrder === 1) {
                        nextElement();
                    }
                    else {
                        prevElement();
                    }
                }, _config.interval);

                stopBtn(_playBtn);
            }
            else {
                playBtn(_playBtn);
                stopSlideShow();
            }
            
        }

        function stopSlideShow() {
            clearTimeout(_playTimer);
        }

        function addCSS(stylePath) {
            var cssId = 'SliderStyle';
            if (!document.getElementById(cssId)) {
                var link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = stylePath;
                document.head.appendChild(link);
            }
        }

        function setSliderClass(elem) {
            elem.setAttribute("class", "sliderContainer");
        }

        function addItemAnimationNext(item, order) {
            if(order === 1) {
                item.setAttribute("class", "sliderCurrentForward");
            }
            else {
                item.setAttribute("class", "sliderCurrentToOut");
            }
        }

        function addItemAnimationBack(item, order) {
            if(order === 1) {
                item.setAttribute("class", "sliderCurrentBackward");
            }
            else {
                item.setAttribute("class", "sliderCurrentToOutBack");
            }
        }

        function setMaxSize(elem) {
            elem.style.width = "100%";
            elem.style.height = "100%";
        }


        function createButtons()
        {
            var prevBtnCtn = document.createElement('div');
            prevBtnCtn.style.display = "flex";
            var prevBtn = document.createElement('div');
            prevBtn.addEventListener("click", prevElement, false);
            prevBtn.style.top = "50%";
            prevBtn.setAttribute("class", "btnLeft");
            prevBtnCtn.appendChild(prevBtn);
            _sliderElem.appendChild(prevBtnCtn);


            var nextBtnCtn = document.createElement('div');
            nextBtnCtn.style.display = "flex";
            nextBtnCtn.style.justifyContent = "flex-end";
            var nextBtn = document.createElement('div');
            nextBtn.addEventListener("click", nextElement, false);
            nextBtn.style.position = "absolute";
            nextBtn.style.top = "50%";
            nextBtn.setAttribute("class", "btnRight");
            nextBtnCtn.appendChild(nextBtn);
            _sliderElem.appendChild(nextBtnCtn);


            var playBtnCtn = document.createElement('div');
            playBtnCtn.style.display = "flex";
            playBtnCtn.style.justifyContent = "center";
            _playBtn = document.createElement('div');
            _playBtn.addEventListener("click", startSlideShow, false);
            _playBtn.style.position = "absolute";
            _playBtn.style.top = "50%";
            _playBtn.setAttribute("class", "btnPlay");
            playBtnCtn.appendChild(_playBtn);
            _sliderElem.appendChild(playBtnCtn);
        }

        function playBtn(btn)
        {
            if(_config.showButtons === true){
                btn.style.borderTop = "15px solid transparent";
                btn.style.borderBottom = "15px solid transparent";
                btn.style.borderLeft = "15px solid white";
                btn.style.borderRight = "0";
            }
        }

        function stopBtn(btn)
        {
            if(_config.showButtons === true){
                btn.style.borderTop = "15px solid white";
                btn.style.borderBottom = "15px solid white";
                btn.style.borderLeft = "25px solid white";
                btn.style.borderRight = "5px solid white";
            }
        }

        

        _sliderElem.addEventListener("mousedown", function (e) {
            _clientX = e.pageX;
            _mouseIsDown = true;
        }, false);

        _sliderElem.addEventListener("mouseup", function (e) {
            mouseSlide(e);
            _mouseIsDown = false;
        }, false);


        _sliderElem.addEventListener("mouseout", function (e) {
            if (_mouseIsDown) {
                mouseSlide(e);
            }

            _mouseIsDown = false;
        }, false);


        _sliderElem.addEventListener("dragstart", function (event) {
            event.preventDefault();
        });


        function mouseSlide(e) {
            var eps = e.pageX - _clientX;
            var isForward = eps < 0;

            if (Math.abs(eps) > 30) {
                if (isForward) {
                    nextElement();
                }
                else {
                    prevElement();
                }
            }
        }


        function checkConfig(conf)
        {
            if(!conf) {
                conf = {};
            }

            var result = { ...conf };

            result.interval = conf.interval || 2000;
            result.stylePath = conf.stylePath || "../src/style.css";
            result.width = conf.width || "400px";
            result.height = conf.height || "300px";
            result.animateTime = conf.animateTime || 1000;
            result.autoPlay = conf.autoPlay || false;
            result.showButtons = conf.showButtons || true;

            return result;
        }


        _sliderElem.addEventListener("touchstart", handleStart, false);
        _sliderElem.addEventListener("touchend", handleEnd, false);
  

        function handleStart(e) {
            _clientX = e.touches[0].clientX;
            _mouseIsDown = true;
        }

        function handleEnd(e) {
            _mouseIsDown = false;

            var eps = e.changedTouches[0].clientX - _clientX;
            var isForward = eps < 0;

            if (Math.abs(eps) > 30) {
                if (isForward) {
                    nextElement();
                }
                else {
                    prevElement();
                }
            }
        }


        return {
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
    };
})();