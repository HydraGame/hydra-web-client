define(function () {
    var _socket = null;
    var _getSocket = function () {
        /**
         * Cache the socket connection
         */
        if (!_socket) {
            _socket = new WebSocket('ws://192.168.1.72:8088');
        }

        return _socket;
    };

    var _addMessageCallback = function(callback) {
        _getSocket().onmessage = callback
    };

    return {
        init: function () {
            _getSocket().onopen = function (e) {
                console.log("Websocket Connection established!");
            };
        },

        addMessageCallback: function(callback) {
            _addMessageCallback(callback);
        },

        getConnection: function () {
            return _getSocket();
        }
    };
});
