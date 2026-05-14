const SUCCESS_STATUS_CODES = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];
const CLIENT_ERROR_STATUS_CODES = [
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424,
    425, 426, 428, 429, 431, 451
];
const SERVER_ERROR_STATUS_CODES = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

export type ApiSuccessResponse<T = any> = { status: number; response: T | null };
export type ApiErrorResponse = { status: number; response: null };

type SuccessHandler<T> = (result: ApiSuccessResponse<T>) => void;
type ErrorHandler = (result: ApiErrorResponse) => void;

const _setXHR = <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): XMLHttpRequest => {
    const XHR = new XMLHttpRequest();

    XHR.onerror = () => {
        errorHandler({ status: 0, response: null });
    };
    XHR.ontimeout = () => {
        errorHandler({ status: 0, response: null });
    };
    XHR.onload = () => {
        const { status, response } = XHR;

        if (SUCCESS_STATUS_CODES.indexOf(status) > -1) {
            successHandler({
                status,
                response: response
                    ? (() => {
                          try {
                              return JSON.parse(response) as T;
                          } catch (e) {
                              console.error('Invalid JSON response:', (e as Error).message);

                              return null;
                          }
                      })()
                    : null
            });
        } else if (CLIENT_ERROR_STATUS_CODES.indexOf(status) > -1 || SERVER_ERROR_STATUS_CODES.indexOf(status) > -1) {
            errorHandler({ status, response: null });
        }
    };

    return XHR;
};

const _trimUrlFromSpaces = (url: string): string => `${url.replace(/\s/g, '_')}`;

const _serverGetAPI =
    (url: string, params: Record<string, any> = {}) =>
    <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): void => {
        const XHR = _setXHR<T>(successHandler, errorHandler);

        let urlWithParams = _trimUrlFromSpaces(url);
        const urlParamKeys = Object.keys(params);

        if (urlParamKeys.length > 0) {
            urlParamKeys.forEach((key, index) => {
                urlWithParams += index === 0 ? `?${encodeURIComponent(key)}=${encodeURIComponent(params[key])}` : `&${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            });
        }

        XHR.open('GET', urlWithParams, true);
        XHR.send();
    };

const _serverPostAPI =
    (url: string, data: unknown) =>
    <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): void => {
        if (!data) {
            return;
        }

        const XHR = _setXHR<T>(successHandler, errorHandler);
        XHR.open('POST', url, true);
        XHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        XHR.send(JSON.stringify(data));
    };

const _serverPutAPI =
    (url: string, data: unknown) =>
    <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): void => {
        if (!data) {
            return;
        }

        const XHR = _setXHR<T>(successHandler, errorHandler);
        XHR.open('PUT', url, true);
        XHR.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        XHR.send(JSON.stringify(data));
    };

const _serverDeleteAPI =
    (url: string, params: Record<string, any> = {}) =>
    <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): void => {
        const XHR = _setXHR<T>(successHandler, errorHandler);

        let urlWithParams = _trimUrlFromSpaces(url);
        const urlParamKeys = Object.keys(params);

        if (urlParamKeys.length > 0) {
            urlParamKeys.forEach((key, index) => {
                urlWithParams += index === 0 ? `?${encodeURIComponent(key)}=${encodeURIComponent(params[key])}` : `&${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
            });
        }

        XHR.open('DELETE', urlWithParams, true);
        XHR.send();
    };

const _serverFileAPI =
    (url: string, files: File | File[], data: Record<string, any> = {}) =>
    <T>(successHandler: SuccessHandler<T>, errorHandler: ErrorHandler): void => {
        if (!files) {
            return;
        }

        const XHR = _setXHR<T>(successHandler, errorHandler);
        XHR.open('POST', url, true);

        const formData = new FormData();
        const formDataFiles = Array.isArray(files) ? files : [files];

        formDataFiles.forEach((file, index) => {
            formData.append(String(index), file);
        });

        formData.append('data', JSON.stringify(data));

        XHR.send(formData);
    };

const ServerAPI = {
    get: <T = any>(url: string, params?: Record<string, any>): Promise<ApiSuccessResponse<T>> =>
        new Promise(_serverGetAPI(url, params)),
    post: <T = any>(url: string, data: unknown): Promise<ApiSuccessResponse<T>> =>
        new Promise(_serverPostAPI(url, data)),
    put: <T = any>(url: string, data: unknown): Promise<ApiSuccessResponse<T>> => new Promise(_serverPutAPI(url, data)),
    delete: <T = any>(url: string, params?: Record<string, any>): Promise<ApiSuccessResponse<T>> =>
        new Promise(_serverDeleteAPI(url, params)),
    file: <T = any>(url: string, files: File | File[], data?: Record<string, any>): Promise<ApiSuccessResponse<T>> =>
        new Promise(_serverFileAPI(url, files, data))
};

export default ServerAPI;
