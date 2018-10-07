# Slider
Cyclic display of elements

## How to use
1. Сonnect library
```javascript
    <script src="../src/slider.js"></script>
```

2. Call the slider method to initialize   
```javascript
    <script>
        var config = {
            "interval": 2000,
            "stylePath": "../src/style.css",
            "width": "400px",
            "height": "300px",
            "animateTime": 1000,
            "autoPlay" : true,
            "showButtons": true
        };
        slider("slider", config);
    </script>
```

## Configuration

**interval** : slideshow interval (milliseconds);

**stylePath** : path to CSS style;

**width** : slider width (CSS size);

**height** : slider height (CSS size);

**animateTime** : single slide animation time (milliseconds);

**autoPlay** : start slideshow on create (true/false);

**showButtons** : show navigation buttons (true/false).

## License
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
