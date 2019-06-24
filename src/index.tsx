import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

type AbstractCounterChildrenProps = {
  currentTime: number;
  isRunning: boolean;
  toggleRunning(): void;
  stop(): void;
  secondsRemaining: number;
};

type AbstractCounterProps = {
  duration: number;
  initialTime: number;
  onFinish(): void;
  children(props: AbstractCounterChildrenProps): ReactNode;
};

type AbstractCounterState = {
  isRunning: boolean;
  lastTick?: number;
  currentTime: number;
};

class AbstractCounter extends React.Component<
  AbstractCounterProps,
  AbstractCounterState
> {
  state = {
    currentTime: this.props.initialTime,
    isRunning: false,
    lastTick: null,
  };

  stop = () => {
    this.setState({
      isRunning: false,
      currentTime: this.props.initialTime,
      lastTick: null,
    });
  };

  toggleRunning = () => {
    this.setState(
      prev => ({
        isRunning: !prev.isRunning,
        lastTick: null,
      }),
      this.tick,
    );
  };

  tick = () => {
    const { lastTick, isRunning, currentTime } = this.state;
    const { duration } = this.props;
    const tick = performance.now();

    if (isRunning) {
      const delta = lastTick ? tick - lastTick : 0;
      const newTime = Math.min(currentTime + delta, duration);
      const isFinished = newTime === duration;

      this.setState({
        currentTime: newTime,
        isRunning: !isFinished,
        lastTick: tick,
      });

      if (isFinished) {
        this.props.onFinish();
      }

      setTimeout(this.tick, 50);
    }
  };

  render() {
    const { currentTime, isRunning } = this.state;
    const { duration } = this.props;

    return this.props.children({
      currentTime,
      isRunning,
      toggleRunning: this.toggleRunning,
      stop: this.stop,
      secondsRemaining: (duration - currentTime) / 1000,
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
  };
}

function App() {
  const duration = 5 * 1000;

  return (
    <>
      <AbstractCounter duration={duration}>
        {({
          currentTime,
          isRunning,
          toggleRunning,
          stop,
          secondsRemaining,
        }) => {
          return (
            <div>
              <p>current time: {currentTime.toFixed(2)}</p>
              <p>
                <progress max={duration} value={currentTime} />
              </p>
              <p>
                <button onClick={toggleRunning}>
                  {isRunning ? "pause" : "start"}
                </button>
                <button onClick={stop}>stop</button>
              </p>
              <p>Segundos restantes: {secondsRemaining.toFixed(1)}</p>
            </div>
          );
        }}
      </AbstractCounter>

      <AbstractCounter
        duration={2000}
        children={({ currentTime, toggleRunning }) => (
          <div>
            <h1 onClick={toggleRunning}>{currentTime.toFixed(1)}</h1>
          </div>
        )}
      />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
