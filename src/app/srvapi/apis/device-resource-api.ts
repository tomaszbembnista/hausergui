/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { DeviceDTO } from '../models';
import { ProcessingChainDTO } from '../models';
/**
 * DeviceResourceApi - axios parameter creator
 * @export
 */
export const DeviceResourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary createDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDeviceUsingPOST: async (body: DeviceDTO, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createDeviceUsingPOST.');
            }
            const localVarPath = `/api/devices`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary deleteDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDeviceUsingDELETE: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteDeviceUsingDELETE.');
            }
            const localVarPath = `/api/devices/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary getDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDeviceUsingGET: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getDeviceUsingGET.');
            }
            const localVarPath = `/api/devices/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary getDevices
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDevicesUsingGET: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/devices`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary getOutputProcessingChains
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOutputProcessingChainsUsingGET: async (id: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getOutputProcessingChainsUsingGET.');
            }
            const localVarPath = `/api/devices/{id}/output-processing-chains`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary updateDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDeviceUsingPUT: async (body: DeviceDTO, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateDeviceUsingPUT.');
            }
            const localVarPath = `/api/devices`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DeviceResourceApi - functional programming interface
 * @export
 */
export const DeviceResourceApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary createDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createDeviceUsingPOST(body: DeviceDTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeviceDTO>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).createDeviceUsingPOST(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary deleteDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteDeviceUsingDELETE(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).deleteDeviceUsingDELETE(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary getDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDeviceUsingGET(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeviceDTO>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).getDeviceUsingGET(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary getDevices
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getDevicesUsingGET(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<DeviceDTO>>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).getDevicesUsingGET(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary getOutputProcessingChains
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getOutputProcessingChainsUsingGET(id: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ProcessingChainDTO>>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).getOutputProcessingChainsUsingGET(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary updateDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateDeviceUsingPUT(body: DeviceDTO, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<DeviceDTO>> {
            const localVarAxiosArgs = await DeviceResourceApiAxiosParamCreator(configuration).updateDeviceUsingPUT(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * DeviceResourceApi - factory interface
 * @export
 */
export const DeviceResourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary createDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createDeviceUsingPOST(body: DeviceDTO, options?: any): AxiosPromise<DeviceDTO> {
            return DeviceResourceApiFp(configuration).createDeviceUsingPOST(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary deleteDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteDeviceUsingDELETE(id: number, options?: any): AxiosPromise<void> {
            return DeviceResourceApiFp(configuration).deleteDeviceUsingDELETE(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary getDevice
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDeviceUsingGET(id: number, options?: any): AxiosPromise<DeviceDTO> {
            return DeviceResourceApiFp(configuration).getDeviceUsingGET(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary getDevices
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDevicesUsingGET(options?: any): AxiosPromise<Array<DeviceDTO>> {
            return DeviceResourceApiFp(configuration).getDevicesUsingGET(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary getOutputProcessingChains
         * @param {number} id id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getOutputProcessingChainsUsingGET(id: number, options?: any): AxiosPromise<Array<ProcessingChainDTO>> {
            return DeviceResourceApiFp(configuration).getOutputProcessingChainsUsingGET(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary updateDevice
         * @param {DeviceDTO} body device
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateDeviceUsingPUT(body: DeviceDTO, options?: any): AxiosPromise<DeviceDTO> {
            return DeviceResourceApiFp(configuration).updateDeviceUsingPUT(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DeviceResourceApi - object-oriented interface
 * @export
 * @class DeviceResourceApi
 * @extends {BaseAPI}
 */
export class DeviceResourceApi extends BaseAPI {
    /**
     * 
     * @summary createDevice
     * @param {DeviceDTO} body device
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public createDeviceUsingPOST(body: DeviceDTO, options?: any) {
        return DeviceResourceApiFp(this.configuration).createDeviceUsingPOST(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary deleteDevice
     * @param {number} id id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public deleteDeviceUsingDELETE(id: number, options?: any) {
        return DeviceResourceApiFp(this.configuration).deleteDeviceUsingDELETE(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary getDevice
     * @param {number} id id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public getDeviceUsingGET(id: number, options?: any) {
        return DeviceResourceApiFp(this.configuration).getDeviceUsingGET(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary getDevices
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public getDevicesUsingGET(options?: any) {
        return DeviceResourceApiFp(this.configuration).getDevicesUsingGET(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary getOutputProcessingChains
     * @param {number} id id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public getOutputProcessingChainsUsingGET(id: number, options?: any) {
        return DeviceResourceApiFp(this.configuration).getOutputProcessingChainsUsingGET(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary updateDevice
     * @param {DeviceDTO} body device
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DeviceResourceApi
     */
    public updateDeviceUsingPUT(body: DeviceDTO, options?: any) {
        return DeviceResourceApiFp(this.configuration).updateDeviceUsingPUT(body, options).then((request) => request(this.axios, this.basePath));
    }
}