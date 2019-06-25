import React, { ReactNode } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import classnames from "classnames"
import "./demo.css"

type StopWatchChildrenProps = {
  timeElapsed: number
  isRunning: boolean
  isFinished: boolean
  toggleRunning(): void
  stop(): void
}

type StopWatchProps = {
  duration: number
  initialTime: number
  onFinish(): void
  children(props: StopWatchChildrenProps): ReactNode
}

type StopWatchState = {
  isRunning: boolean
  lastTick?: number
  timeElapsed: number
}

class StopWatch extends React.Component<StopWatchProps, StopWatchState> {
  state = {
    timeElapsed: 0,
    isRunning: false,
  }

  timeout = null

  lastTick = null

  stop = () => {
    this.setState({
      isRunning: false,
      timeElapsed: 0,
    })
  }

  toggleRunning = () =>
    this.setState(prev => ({
      isRunning: !prev.isRunning,
    }))

  tick = () => {
    const { isRunning, timeElapsed } = this.state
    const { duration, onFinish } = this.props
    const tick = performance.now()

    if (isRunning) {
      const delta = this.lastTick ? tick - this.lastTick : 0
      const newTime = Math.min(timeElapsed + delta, duration)
      const isFinished = isRunning && timeElapsed === duration

      this.setState(
        {
          timeElapsed: newTime,
          isRunning: isRunning && !isFinished,
        },
        () => isRunning && isFinished && onFinish(),
      )
    }

    this.lastTick = tick
    this.timeout = setTimeout(this.tick, 50)
  }

  componentWillMount() {
    this.tick()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { timeElapsed, isRunning } = this.state
    const { duration } = this.props

    return this.props.children({
      timeElapsed,
      isRunning,
      toggleRunning: this.toggleRunning,
      stop: this.stop,
      isFinished: duration === timeElapsed,
    })
  }

  static propTypes = {
    onFinish: PropTypes.func,
    initialTime: PropTypes.number,
    duration: PropTypes.number.isRequired,
  }

  static defaultProps = {
    initialTime: 0,
    duration: +Infinity,
    onFinish: () => {},
  }
}

function App() {
  const duration = 1 * 1000

  return (
    <StopWatch
      duration={duration}
      onFinish={() => alert("It's done")}
      children={({ isRunning, toggleRunning, timeElapsed, stop, isFinished }) => (
        <div
          className={classnames(
            "stopwatch",
            isFinished && "stopwatch--is-finished",
            isRunning && "stopwatch--is-running",
          )}
        >
          <div className="stopwatch__display">{(timeElapsed / 1000).toFixed(5)}s</div>

          <div className="stopwatch__actions">
            <button className="stopwatch__action stopwatch__action--toggle" onClick={toggleRunning}>
              {isRunning ? "Pause" : "Play"}
            </button>

            <button className="stopwatch__action stopwatch__action--stop" onClick={stop}>
              Stop/Reset
            </button>
          </div>
        </div>
      )}
    />
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)

export default StopWatch
