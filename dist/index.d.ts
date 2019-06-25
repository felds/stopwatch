import React, { ReactNode } from "react";
import PropTypes from "prop-types";
export declare type AbstractCounterChildrenProps = {
    currentTime: number;
    isRunning: boolean;
    toggleRunning(): void;
    stop(): void;
    secondsRemaining: number;
};
export declare type AbstractCounterProps = {
    duration: number;
    initialTime: number;
    onFinish(): void;
    children(props: AbstractCounterChildrenProps): ReactNode;
};
export declare type AbstractCounterState = {
    isRunning: boolean;
    lastTick?: number;
    currentTime: number;
};
export default class AbstractCounter extends React.Component<AbstractCounterProps, AbstractCounterState> {
    state: {
        currentTime: number;
        isRunning: boolean;
        lastTick: any;
    };
    stop: () => void;
    toggleRunning: () => void;
    tick: () => void;
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
