import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
    const [data, setData] = useState<AxiosResponse<any> | null>(null);
    const [error, setError] = useState<null | any>(null);
    useEffect(() => {
        axios(config)
            .then(response => {
                setData(response);
            })
            .catch(err => {
                setError(err);
            });
    }, []);

    return {
        loading: data ? true : false,
        data,
        error
    };
};