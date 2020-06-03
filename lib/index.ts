import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
    const [error, setError] = useState<null | any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios(config)
            .then(data => {
                setLoading(false);
                setResponse(data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
    }, []);

    return {
        loading: response ? true : false,
        response,
        error
    };
};

export const useLazyAxios = (): [(config: AxiosRequestConfig) => void, { loading: boolean; response: AxiosResponse<any> | null; error: any; }] => {
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
    const [error, setError] = useState<null | any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sendRequest = (config: AxiosRequestConfig): void => {
        setLoading(true);
        axios(config)
            .then(data => {
                setLoading(false);
                setResponse(data);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
    };

    return [
        sendRequest,
        {
            loading,
            response,
            error
        }
    ];
};