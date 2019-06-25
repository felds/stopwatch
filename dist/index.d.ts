import React, { ReactNode } from "react";
import PropTypes from "prop-types";
export declare type StopWatchChildrenProps = {
    timeElapsed: number;
    isRunning: boolean;
    isFinished: boolean;
    toggle(): void;
    stop(): void;
    pause(): void;
    play(): void;
};
export declare type StopWatchChildren = (props: StopWatchChildrenProps) => ReactNode;
export declare type StopWatchProps = {
    duration: number;
    initialTime: number;
    onFinish(): void;
    onChange(timeElapsed: number): void;
    children: StopWatchChildren;
    updateInterval: number;
};
export declare type StopWatchState = {
    isRunning: boolean;
    lastTick?: number;
    timeElapsed: number;
};
export default class StopWatch extends React.Component<StopWatchProps, StopWatchState> {
    state: {
        timeElapsed: number;
        isRunning: boolean;
    };
    timeout: any;
    lastTick: any;
    stop: () => void;
    toggle: () => void;
    pause: () => void;
    play: () => void;
    tick: () => void;
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
    static propTypes: {
        onFinish: PropTypes.Requireable<(...args: any[]) => any>;
        initialTime: PropTypes.Requireable<number>;
        duration: PropTypes.Validator<number>;
    };
    static defaultProps: {
        initialTime: number;
        duration: number;
        onFinish: () => void;
        onChange: () => void;
        updateInterval: number;
    };
}
