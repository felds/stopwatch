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
            timeElapsed: 0,
            isRunning: false,
        };
        _this.timeout = null;
        _this.lastTick = null;
        _this.stop = function () {
            _this.setState({
                isRunning: false,
                timeElapsed: 0,
            });
        };
        _this.toggleRunning = function () {
            return _this.setState(function (prev) { return ({
                isRunning: !prev.isRunning,
            }); });
        };
        _this.tick = function () {
            var _a = _this.state, isRunning = _a.isRunning, timeElapsed = _a.timeElapsed;
            var _b = _this.props, duration = _b.duration, onFinish = _b.onFinish;
            var tick = performance.now();
            if (isRunning) {
                var delta = _this.lastTick ? tick - _this.lastTick : 0;
                var newTime = Math.min(timeElapsed + delta, duration);
                var isFinished_1 = isRunning && timeElapsed === duration;
                _this.setState({
                    timeElapsed: newTime,
                    isRunning: isRunning && !isFinished_1,
                }, function () { return isRunning && isFinished_1 && onFinish(); });
            }
            _this.lastTick = tick;
            _this.timeout = setTimeout(_this.tick, 50);
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
        var _a = this.state, timeElapsed = _a.timeElapsed, isRunning = _a.isRunning;
        var duration = this.props.duration;
        return this.props.children({
            timeElapsed: timeElapsed,
            isRunning: isRunning,
            toggleRunning: this.toggleRunning,
            stop: this.stop,
            isFinished: duration === timeElapsed,
        });
    };
    StopWatch.propTypes = {
        onFinish: prop_types_1.default.func,
        initialTime: prop_types_1.default.number,
        duration: prop_types_1.default.number.isRequired,
    };
    StopWatch.defaultProps = {
        initialTime: 0,
        duration: +Infinity,
        onFinish: function () { },
    };
    return StopWatch;
}(react_1.default.Component));
exports.default = StopWatch;
