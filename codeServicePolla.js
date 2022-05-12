(function () {
    const CodiService = function (_containerId, _initParams) {
        _initParams = _initParams || {}
        _initParams.instance = window.codiOrigin || '/';
        _initParams.skinid =  _initParams.skinid || window.codiSkin || 'default';
        _initParams.configid = _initParams.configid || '';
        _initParams.token =  _initParams.token || 'none';
        _initParams.currency =  _initParams.currency || 'COP';
        _initParams.locales =  _initParams.locales || 'es-CO';
        _initParams.lang =  window.codiLang.includes(_initParams.lang) ? _initParams.lang : 'es';
        _initParams.width =  _initParams.width || window.codiwidth;
        _initParams.height =  _initParams.height || window.codiHeight;
        _initParams.name =  _initParams.name || window.name;
        _initParams.platform =  _initParams.platform || window.platform;

        var base = '/polla';
        var convertInitParamsToLowercase = function () {
            var newParams = {}
            var keyLowerCase
            for (var key of Object.keys(_initParams)) {
                keyLowerCase = key.toLowerCase()
                newParams[keyLowerCase] = _initParams[key]
            }
            _initParams = newParams
        };
        var convertInitParamsToStrings = function () {
            for (var key of Object.keys(_initParams)) {
                if (_initParams[key] && typeof _initParams[key] === 'object') {
                    if (Array.isArray(_initParams[key])) {
                        _initParams[key] = _initParams[key].join(',')
                    } else {
                        _initParams[key] = JSON.stringify(_initParams[key])
                    }
                }
            }
        }
        var prepareInitParams = function () {
            convertInitParamsToLowercase()
            convertInitParamsToStrings()
        };

        var loadIframe = function () {
             //  configid=qwertyuioas2345120&currency=cop&lang=es&skinid=primeracuot&token=794181941910940
            var link = _initParams.instance + base;
            link = link + '?';
            var queryParams = iframe.createUrl();
            return link + queryParams;
        };

        iframe = {
            configid: _initParams.configid,
            currency: _initParams.currency,
            lang: _initParams.lang,
            skinid: _initParams.skinid,
            token: _initParams.token,
            name: _initParams.name,
            locales: _initParams.locales,
            platform: _initParams.platform,
            createUrl : function () {
                 var base = `configid=${this.configid}&currency=${this.currency}&lang=${this.lang}&skinid=${this.skinid}&token=${this.token}&name=${this.name}&locales=${this.locales}&platform=${this.platform}`;
                return base;
            }
        };

        function loadServiceInner () {
            function receiver(event) {
                if (event.origin === _initParams.instance) {
                    if (event.data === "reload") {
                        location.reload();
                    }
                }
            }
            window.addEventListener('message', receiver, false);
            var link = loadIframe();
           var width = _initParams.width;
           var height = _initParams.height;
            var iframe = document.createElement('iframe');
            iframe.frameBorder= 0;
            iframe.ref= "iframe";
            iframe.scrolling ="si";
            iframe.style = "padding-bottom: 220px";
            iframe.width= width;
            iframe.height=height;
            iframe.id="randomid";
            iframe.setAttribute("src", link);
            var screen = document.getElementById(_containerId);
            screen.appendChild(iframe);
        }

        // Get url of host from script was loaded
        prepareInitParams();

        // carga de informacion
        loadServiceInner()
    }

    if (!window.CodiService) {
        window.CodiService = CodiService
    }
}());

var codiSkin= "default";
// este debe estar descomentado al pasar a prd
//var codiOrigin = "https://devpolla.codibpo.site";
var codiOrigin = "http://localhost:4200";
var codiLang = ['es', 'en'];
var codiwidth = '100%';
var codiHeight = '600px';
var name = '';
var platform = "Polla";

