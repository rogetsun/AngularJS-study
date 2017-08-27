/**
 * Created by uv2sun on 15/11/23.
 */
;(function ($) {
    function WS(url, callbacks) {
        var tmpUrl = "";
        if (url && url.indexOf("ws://") === 0) {
            tmpUrl = url;
        } else {
            var host = window.location.host;
            var path = window.location.pathname;
            var webp = path.substring(0, path.substring(1).indexOf("/") + 1);
            tmpUrl = "ws://" + host + webp + "/ws" + url;
        }
        this.websocket = new WebSocket(tmpUrl);
        var _this = this;
        if (callbacks) {
            if (callbacks.onmessage) {
                this.websocket.onmessage = function (event) {
                    callbacks.onmessage(event, _this.websocket);
                }
            }
            if (callbacks.onopen) {
                this.websocket.onopen = function (event) {
                    callbacks.onopen(event, _this.websocket);
                }
            }
            if (callbacks.onerror) {
                this.websocket.onerror = function (event) {
                    callbacks.onerror(event, _this.websocket);
                }
            }
            if (callbacks.onclose) {
                this.websocket.onclose = function (event) {
                    callbacks.onclose(event, _this.websocket);
                }
            }
        }
    }

    /**
     * 关闭websocket
     * @param code
     * @param reason
     */
    WS.prototype.close = function (code, reason) {
        this.websocket.close(code, reason);
    };

    WS.prototype.send = function (text) {
        this.websocket.send(text);
    };

    WS.prototype.readyState = function () {
        return this.websocket.readyState;
    };

    $.extend({
        websocket: function (url, callbacks) {
            return new WS(url, callbacks);
        }
    });


})(jQuery);