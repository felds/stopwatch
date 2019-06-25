import React, { ReactNode } from "react";
import PropTypes from "prop-types";

export type StopWatchChildrenProps = {
  timeElapsed: number;
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
  initialTime: number;
  onFinish(): void;
  onChange(timeElapsed: number): void;
  children: StopWatchChildren;
  updateInterval: number;
};

export type StopWatchState = {
  isRunning: boolean;
  lastTick?: number;
  timeElapsed: number;
};

export default class StopWatch extends React.Component<
  StopWatchProps,
  StopWatchState
> {
  state = {
    timeElapsed: 0,
    isRunning: false,
  };

  timeout = null;

  lastTick = null;

  stop = () => {
    this.setState({
      isRunning: false,
      timeElapsed: 0,
    });
  };

  toggle = () => (this.state.isRunning ? this.pause() : this.play());

  pause = () => this.setState({ isRunning: false });

  play = () => this.setState({ isRunning: true });

  tick = () => {
    const { isRunning, timeElapsed } = this.state;
    const { duration, updateInterval, onFinish, onChange } = this.props;
    const tick = performance.now();

    if (isRunning) {
      const delta = this.lastTick ? tick - this.lastTick : 0;
      const newTime = Math.min(timeElapsed + delta, duration);
      const isFinished = isRunning && timeElapsed === duration;

      this.setState(
        {
          timeElapsed: newTime,
          isRunning: isRunning && !isFinished,
        },
        () => {
          if (isRunning && isFinished) onFinish();
          if (newTime !== timeElapsed) onChange(newTime);
        },
      );
    }

    this.lastTick = tick;
    this.timeout = setTimeout(this.tick, updateInterval);
  };

  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { timeElapsed, isRunning } = this.state;
    const { duration } = this.props;

    return this.props.children({
      timeElapsed,
      isRunning,
      toggle: this.toggle,
      stop: this.stop,
      play: this.play,
      pause: this.pause,
      isFinished: duration === timeElapsed,
    });
  }

  static propTypes = {
    onFinish: PropTypes.func,
    initialTime: PropTypes.number,
    duration: PropTypes.number.isRequired,
  };

  static defaultProps = {
    initialTime: 0,
    duration: +Infinity,
    onFinish: () => {},
    onChange: () => {},
    updateInterval: 50,
  };
}
