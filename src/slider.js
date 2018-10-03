;
var slider = (function()
{
    var _elements = [];
    var _config = {};
    var _currentElem = {};

    function show() {
        _currentElem.element.style.display = "block";
    }

    function hide() {
        _currentElem.element.style.display = "none";
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
                show();
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
            hide();
            var nextIndex = _currentElem.nextIndex;
            _currentElem = _elements[nextIndex];
            show();
        },

        prev: function () {
            hide();
            var prevIndex = _currentElem.prevIndex;
            _currentElem = _elements[prevIndex];
            show();
        }
    };
})();
