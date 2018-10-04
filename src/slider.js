;
var slider = (function()
{
    var _elements = [];
    var _config = {};
    var _currentElem = {};
    var _playTimer = {};

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

    return {
        create: function (id, conf) {

            _elements = []; // будет ли утечка после повторного создания?
            _config = conf;
            var elem = document.getElementById(id);
            var items = elem.getElementsByTagName('*');

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
            clearTimeout(_playTimer);

            _playTimer = setTimeout(function run() {
                nextElement();
                _playTimer = setTimeout(run, _config.interval);
            }, _config.interval);
        },

        stop: function () {
            clearTimeout(_playTimer);
        }

    };
})();
