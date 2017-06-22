define([], function () {
    var _moveSpeed = 10;
    var _camera = null;
    var _cursors = null;

    var _moveLeft = function () {
        _camera.x -= _moveSpeed;
    };

    var _moveRight = function () {
        _camera.x += _moveSpeed;
    };

    var _moveUp = function () {
        _camera.y -= _moveSpeed;
    };

    var _moveDown = function () {
        _camera.y += _moveSpeed;
    };

    return {
        init: function (camera, keyboard) {
            _camera = camera;
            _cursors = {
                up: keyboard.addKey(Phaser.Keyboard.W),
                down: keyboard.addKey(Phaser.Keyboard.S),
                left: keyboard.addKey(Phaser.Keyboard.A),
                right: keyboard.addKey(Phaser.Keyboard.D)
            };
        },
        update: function () {
            if (_cursors.left.isDown) {
                _moveLeft();
            } else if (_cursors.right.isDown) {
                _moveRight();
            }

            if (_cursors.up.isDown) {
                _moveUp();
            } else if (_cursors.down.isDown) {
                _moveDown();
            }
        }
    };
});
