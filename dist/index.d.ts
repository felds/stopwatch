import React, { ReactNode } from "react";
import PropTypes from "prop-types";
export declare type StopWatchChildrenProps = {
    value: number;
    isRunning: boolean;
    isFinished: boolean;
    toggle(): void;
    stop(): void;
    pause(): void;
    play(): void;
} & StopWatchProps;
export declare type StopWatchChildren = (props: StopWatchChildrenProps) => ReactNode;
export declare type StopWatchProps = {
    duration: number;
    initialValue: number;
    children: StopWatchChildren;
    updateInterval: number;
    onFinish(): void;
    onChange(value: number): void;
};
export declare type StopWatchState = {
    isRunning: boolean;
    lastTick?: number;
    value: number;
};
export default class StopWatch extends React.Component<StopWatchProps, StopWatchState> {
    state: {
        value: number;
        isRunning: boolean;
    };
    timeout: any;
    lastUpdate: any;
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
        initialValue: PropTypes.Requireable<number>;
        duration: PropTypes.Validator<number>;
    };
    static defaultProps: {
        initialValue: number;
        duration: number;
        onFinish: () => void;
        onChange: () => void;
        updateInterval: number;
    };
    readonly isFinished: boolean;
}
