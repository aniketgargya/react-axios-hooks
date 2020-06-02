# Axios Hooks for React

[![npm version](http://img.shields.io/npm/v/@aniketgargya/axios-hooks.svg?style=flat)](https://npmjs.org/package/@aniketgargya/axios-hooks "View this project on npm")

This npm package includes a hook for fetching data with ```axios```. You can use it with the exact same configurations as ```axios```.

To import:
```
import { useAxios } from "@aniketgargya/axios-hooks";
```

```
const { response, loading, error } = useAxios({
    url: "https://yourapi.com/path/data.json",
    method: "GET"
});
```

To install:
```
npm install axios @aniketgargya/axios-hooks
```

Type definitions are provided!