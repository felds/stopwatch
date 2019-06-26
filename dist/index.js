"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var StopWatch = /** @class */ (function (_super) {
    __extends(StopWatch, _super);
    function StopWatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: 0,
            isRunning: false
        };
        _this.timeout = null;
        _this.lastUpdate = null;
        _this.stop = function () {
            _this.setState({
                isRunning: false,
                value: 0
            });
        };
        _this.toggle = function () { return (_this.state.isRunning ? _this.pause() : _this.play()); };
        _this.pause = function () { return _this.setState({ isRunning: false }); };
        _this.play = function () {
            if (!_this.isFinished)
                _this.setState({ isRunning: true });
        };
        _this.tick = function () {
            var isRunning = _this.state.isRunning;
            var updateInterval = Math.max(_this.props.updateInterval, 0);
            var timestamp = performance.now();
            if (isRunning) {
                var value_1 = _this.state.value;
                var duration = _this.props.duration;
                // time delta from the last update (0 if first update)
                var delta = _this.lastUpdate ? timestamp - _this.lastUpdate : 0;
                // force the new value to be at most the duration
                var newValue_1 = Math.min(value_1 + delta, duration);
                var isFinished_1 = value_1 === duration;
                _this.setState({
                    value: newValue_1,
                    isRunning: isRunning && !isFinished_1
                }, function () {
                    if (newValue_1 !== value_1)
                        _this.props.onChange(newValue_1);
                    if (isRunning && isFinished_1)
                        _this.props.onFinish();
                });
            }
            _this.lastUpdate = timestamp;
            _this.timeout = setTimeout(_this.tick, updateInterval);
        };
        return _this;
    }
    StopWatch.prototype.componentWillMount = function () {
        this.tick();
    };
    StopWatch.prototype.componentWillUnmount = function () {
        clearTimeout(this.timeout);
    };
    StopWatch.prototype.render = function () {
        var _a = this.state, isRunning = _a.isRunning, value = _a.value;
        return this.props.children({
            value: value,
            isRunning: isRunning,
            toggle: this.toggle,
            stop: this.stop,
            play: this.play,
            pause: this.pause,
            isFinished: this.isFinished
        });
    };
    Object.defineProperty(StopWatch.prototype, "isFinished", {
        get: function () {
            return this.props.duration === this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    StopWatch.propTypes = {
        onFinish: prop_types_1.default.func,
        initialTime: prop_types_1.default.number,
        duration: prop_types_1.default.number.isRequired
    };
    StopWatch.defaultProps = {
        initialTime: 0,
        duration: +Infinity,
        onFinish: function () { },
        onChange: function () { },
        updateInterval: 50
    };
    return StopWatch;
}(react_1.default.Component));
exports.default = StopWatch;
