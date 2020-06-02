import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse<any> | null>(null);
    const [error, setError] = useState<null | any>(null);
    useEffect(() => {
        axios(config)
            .then(data => {
                setResponse(data);
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    return {
        loading: response ? true : false,
        response,
        error
    };
};