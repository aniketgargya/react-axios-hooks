import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import useDeepCompareEffect from "use-deep-compare-effect";

interface IState {
    loading: boolean;
    response: AxiosResponse<any> | null;
    error: null | any;
};

export const useAxios = (config: AxiosRequestConfig): IState => {
    const [state, setState] = useState<IState>({
        loading: false,
        response: null,
        error: null
    });

    useDeepCompareEffect(() => {
        setState({
            loading: true,
            response: null,
            error: null
        });

        axios(config)
            .then(data => {
                setState({
                    loading: false,
                    response: data,
                    error: null
                });
            })
            .catch(err => {
                setState({
                    loading: false,
                    response: null,
                    error: err
                })
            });
    }, [config]);

    return state;
};

export const useLazyAxios = (): [(config: AxiosRequestConfig) => void, IState] => {
    const [state, setState] = useState<IState>({
        loading: false,
        response: null,
        error: null
    });

    const sendRequest = (config: AxiosRequestConfig): void => {
        setState({
            loading: true,
            response: null,
            error: null
        });

        axios(config)
            .then(data => {
                setState({
                    loading: false,
                    response: data,
                    error: null
                })
            })
            .catch(err => {
                setState({
                    loading: false,
                    response: null,
                    error: err
                })
            });
    };

    return [sendRequest, state];
};

export type { AxiosRequestConfig, AxiosResponse };