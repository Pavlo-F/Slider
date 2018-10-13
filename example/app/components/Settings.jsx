class Settings {
    setMaxSize(elem) {
        this.funcName = 'setMaxSize';

        elem.style.width = '100%';
        elem.style.height = '100%';
    }

    checkConfig(conf) {
        this.funcName = 'checkConfig';

        const result = {};
        let tmp = [...conf];

        if (!conf) {
            tmp = {};
        }

        result.interval = tmp.interval || 2000;
        result.stylePath = tmp.stylePath || 'style.css';
        result.width = tmp.width || '400px';
        result.height = tmp.height || '300px';
        result.animateTime = tmp.animateTime || 1000;
        result.autoPlay = tmp.autoPlay || false;
        result.showButtons = tmp.showButtons || true;

        return result;
    }
}

module.exports = Settings;
