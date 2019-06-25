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
var react_dom_1 = __importDefault(require("react-dom"));
var prop_types_1 = __importDefault(require("prop-types"));
var AbstractCounter = /** @class */ (function (_super) {
    __extends(AbstractCounter, _super);
    function AbstractCounter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            currentTime: _this.props.initialTime,
            isRunning: false,
            lastTick: null,
        };
        _this.stop = function () {
            _this.setState({
                isRunning: false,
                currentTime: _this.props.initialTime,
                lastTick: null,
            });
        };
        _this.toggleRunning = function () {
            _this.setState(function (prev) { return ({
                isRunning: !prev.isRunning,
                lastTick: null,
            }); }, _this.tick);
        };
        _this.tick = function () {
            var _a = _this.state, lastTick = _a.lastTick, isRunning = _a.isRunning, currentTime = _a.currentTime;
            var duration = _this.props.duration;
            var tick = performance.now();
            if (isRunning) {
                var delta = lastTick ? tick - lastTick : 0;
                var newTime = Math.min(currentTime + delta, duration);
                var isFinished = newTime === duration;
                _this.setState({
                    currentTime: newTime,
                    isRunning: !isFinished,
                    lastTick: tick,
                });
                if (isFinished) {
                    _this.props.onFinish();
                }
                setTimeout(_this.tick, 50);
            }
        };
        return _this;
    }
    AbstractCounter.prototype.render = function () {
        var _a = this.state, currentTime = _a.currentTime, isRunning = _a.isRunning;
        var duration = this.props.duration;
        return this.props.children({
            currentTime: currentTime,
            isRunning: isRunning,
            toggleRunning: this.toggleRunning,
            stop: this.stop,
            secondsRemaining: (duration - currentTime) / 1000,
        });
    };
    AbstractCounter.propTypes = {
        onFinish: prop_types_1.default.func,
        initialTime: prop_types_1.default.number,
        duration: prop_types_1.default.number.isRequired,
    };
    AbstractCounter.defaultProps = {
        initialTime: 0,
        duration: +Infinity,
        onFinish: function () { },
    };
    return AbstractCounter;
}(react_1.default.Component));
function App() {
    var duration = 5 * 1000;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AbstractCounter, { duration: duration }, function (_a) {
            var currentTime = _a.currentTime, isRunning = _a.isRunning, toggleRunning = _a.toggleRunning, stop = _a.stop, secondsRemaining = _a.secondsRemaining;
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("p", null,
                    "current time: ",
                    currentTime.toFixed(2)),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("progress", { max: duration, value: currentTime })),
                react_1.default.createElement("p", null,
                    react_1.default.createElement("button", { onClick: toggleRunning }, isRunning ? "pause" : "start"),
                    react_1.default.createElement("button", { onClick: stop }, "stop")),
                react_1.default.createElement("p", null,
                    "Segundos restantes: ",
                    secondsRemaining.toFixed(1))));
        }),
        react_1.default.createElement(AbstractCounter, { duration: 2000, children: function (_a) {
                var currentTime = _a.currentTime, toggleRunning = _a.toggleRunning;
                return (react_1.default.createElement("div", null,
                    react_1.default.createElement("h1", { onClick: toggleRunning }, currentTime.toFixed(1))));
            } })));
}
var rootElement = document.getElementById("root");
react_dom_1.default.render(react_1.default.createElement(App, null), rootElement);
