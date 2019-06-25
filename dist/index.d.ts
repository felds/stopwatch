import React, { ReactNode } from "react";
import PropTypes from "prop-types";
export declare type StopWatchChildrenProps = {
    timeElapsed: number;
    isRunning: boolean;
    isFinished: boolean;
    toggleRunning(): void;
    stop(): void;
};
export declare type StopWatchChildren = (props: StopWatchChildrenProps) => ReactNode;
export declare type StopWatchProps = {
    duration: number;
    initialTime: number;
    onFinish(): void;
    children: StopWatchChildren;
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
    toggleRunning: () => void;
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
    };
}
