import React, { ReactNode } from "react";
import PropTypes from "prop-types";

export type StopWatchChildrenProps = {
  value: number;
  isRunning: boolean;
  isFinished: boolean;
  toggle(): void;
  stop(): void;
  pause(): void;
  play(): void;
};

export type StopWatchChildren = (props: StopWatchChildrenProps) => ReactNode;

export type StopWatchProps = {
  duration: number;
  initialValue: number;
  children: StopWatchChildren;
  updateInterval: number;
  onFinish(): void;
  onChange(value: number): void;
};

export type StopWatchState = {
  isRunning: boolean;
  lastTick?: number;
  value: number;
};

export default class StopWatch extends React.Component<
  StopWatchProps,
  StopWatchState
> {
  state = {
    value: this.props.initialValue,
    isRunning: false
  };

  timeout = null;

  lastUpdate = null;

  stop = () => {
    this.setState({
      value: this.props.initialValue,
      isRunning: false
    });
  };

  toggle = () => (this.state.isRunning ? this.pause() : this.play());

  pause = () => this.setState({ isRunning: false });

  play = () => {
    if (!this.isFinished) this.setState({ isRunning: true });
  };

  tick = () => {
    const { isRunning } = this.state;
    const updateInterval = Math.max(this.props.updateInterval, 0);
    const timestamp = performance.now();

    if (isRunning) {
      const { value } = this.state;
      const { duration } = this.props;

      // time delta from the last update (0 if first update)
      const delta = this.lastUpdate ? timestamp - this.lastUpdate : 0;

      // force the new value to be at most the duration
      const newValue = Math.min(value + delta, duration);
      const hasFinished = newValue === duration;
      const hasChanged = newValue !== value;

      this.setState({
        value: newValue,
        isRunning: isRunning && !hasFinished
      });

      if (hasChanged) this.props.onChange(this.state.value);
      if (hasFinished) this.props.onFinish();
    }

    this.lastUpdate = timestamp;
    this.timeout = setTimeout(this.tick, updateInterval);
  };

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { isRunning, value } = this.state;

    return this.props.children({
      value,
      isRunning,
      toggle: this.toggle,
      stop: this.stop,
      play: this.play,
      pause: this.pause,
      isFinished: this.isFinished
    });
  }

  static propTypes = {
    onFinish: PropTypes.func,
    initialValue: PropTypes.number,
    duration: PropTypes.number.isRequired
  };

  static defaultProps = {
    initialValue: 0,
    duration: +Infinity,
    onFinish: () => {},
    onChange: () => {},
    updateInterval: 50
  };

  get isFinished() {
    return this.props.duration === this.state.value;
  }
}
