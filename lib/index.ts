import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useDeepCompareEffect from 'use-deep-compare-effect';

interface IState {
    loading: boolean;
    response: AxiosResponse<any> | null;
    error: null | any;
};

export const useAxios = (config: AxiosRequestConfig) => {
    const [state, setState] = useState<IState>({
        loading: false,
        response: null,
        error: null
    });

    useDeepCompareEffect(() => {
        setState({
            ...state,
            loading: true
        });

        axios(config)
            .then(data => {
                setState({
                    ...state,
                    loading: false,
                    response: data
                });
            })
            .catch(err => {
                setState({
                    ...state,
                    loading: false,
                    error: err
                })
            });
    }, [config]);

    return state;
};

export const useLazyAxios = (): [(config: AxiosRequestConfig) => void, { loading: boolean; response: AxiosResponse<any> | null; error: any; }] => {
    const [state, setState] = useState<IState>({
        loading: false,
        response: null,
        error: null
    });

    const sendRequest = (config: AxiosRequestConfig): void => {
        setState({
            ...state,
            loading: true
        });

        axios(config)
            .then(data => {
                setState({
                    ...state,
                    loading: false,
                    response: data
                })
            })
            .catch(err => {
                setState({
                    ...state,
                    loading: false,
                    error: err
                })
            });
    };

    return [sendRequest, state];
};

export type { AxiosRequestConfig, AxiosResponse };