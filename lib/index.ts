import { useState, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = (config: AxiosRequestConfig) => {
    const initialRequestSent = useRef<boolean>(false);
    const [data, setData] = useState<AxiosResponse<any> | null>(null);
    const [error, setError] = useState<null | any>(null);

    if (!initialRequestSent.current) {
        initialRequestSent.current = true;
        axios(config)
            .then(response => {
                setData(response);
            })
            .catch(err => {
                setError(err);
            });
    }

    return {
        loading: data ? true : false,
        data,
        error
    };
};