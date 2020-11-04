/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    DeviceDTO,
    DeviceDTOFromJSON,
    DeviceDTOToJSON,
    ProcessingChainDTO,
    ProcessingChainDTOFromJSON,
    ProcessingChainDTOToJSON,
} from '../models';

export interface CreateDeviceUsingPOSTRequest {
    device: DeviceDTO;
}

export interface DeleteDeviceUsingDELETERequest {
    id: number;
}

export interface GetDeviceUsingGETRequest {
    id: number;
}

export interface GetOutputProcessingChainsUsingGETRequest {
    id: number;
}

export interface UpdateDeviceUsingPUTRequest {
    device: DeviceDTO;
}

/**
 * 
 */
export class DeviceResourceApi extends runtime.BaseAPI {

    /**
     * createDevice
     */
    async createDeviceUsingPOSTRaw(requestParameters: CreateDeviceUsingPOSTRequest): Promise<runtime.ApiResponse<DeviceDTO>> {
        if (requestParameters.device === null || requestParameters.device === undefined) {
            throw new runtime.RequiredError('device','Required parameter requestParameters.device was null or undefined when calling createDeviceUsingPOST.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/devices`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DeviceDTOToJSON(requestParameters.device),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceDTOFromJSON(jsonValue));
    }

    /**
     * createDevice
     */
    async createDeviceUsingPOST(requestParameters: CreateDeviceUsingPOSTRequest): Promise<DeviceDTO> {
        const response = await this.createDeviceUsingPOSTRaw(requestParameters);
        return await response.value();
    }

    /**
     * deleteDevice
     */
    async deleteDeviceUsingDELETERaw(requestParameters: DeleteDeviceUsingDELETERequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteDeviceUsingDELETE.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/devices/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * deleteDevice
     */
    async deleteDeviceUsingDELETE(requestParameters: DeleteDeviceUsingDELETERequest): Promise<void> {
        await this.deleteDeviceUsingDELETERaw(requestParameters);
    }

    /**
     * getDevice
     */
    async getDeviceUsingGETRaw(requestParameters: GetDeviceUsingGETRequest): Promise<runtime.ApiResponse<DeviceDTO>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getDeviceUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/devices/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceDTOFromJSON(jsonValue));
    }

    /**
     * getDevice
     */
    async getDeviceUsingGET(requestParameters: GetDeviceUsingGETRequest): Promise<DeviceDTO> {
        const response = await this.getDeviceUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * getDevices
     */
    async getDevicesUsingGETRaw(): Promise<runtime.ApiResponse<Array<DeviceDTO>>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/devices`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DeviceDTOFromJSON));
    }

    /**
     * getDevices
     */
    async getDevicesUsingGET(): Promise<Array<DeviceDTO>> {
        const response = await this.getDevicesUsingGETRaw();
        return await response.value();
    }

    /**
     * getOutputProcessingChains
     */
    async getOutputProcessingChainsUsingGETRaw(requestParameters: GetOutputProcessingChainsUsingGETRequest): Promise<runtime.ApiResponse<Array<ProcessingChainDTO>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getOutputProcessingChainsUsingGET.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/devices/{id}/output-processing-chains`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProcessingChainDTOFromJSON));
    }

    /**
     * getOutputProcessingChains
     */
    async getOutputProcessingChainsUsingGET(requestParameters: GetOutputProcessingChainsUsingGETRequest): Promise<Array<ProcessingChainDTO>> {
        const response = await this.getOutputProcessingChainsUsingGETRaw(requestParameters);
        return await response.value();
    }

    /**
     * updateDevice
     */
    async updateDeviceUsingPUTRaw(requestParameters: UpdateDeviceUsingPUTRequest): Promise<runtime.ApiResponse<DeviceDTO>> {
        if (requestParameters.device === null || requestParameters.device === undefined) {
            throw new runtime.RequiredError('device','Required parameter requestParameters.device was null or undefined when calling updateDeviceUsingPUT.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/devices`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: DeviceDTOToJSON(requestParameters.device),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DeviceDTOFromJSON(jsonValue));
    }

    /**
     * updateDevice
     */
    async updateDeviceUsingPUT(requestParameters: UpdateDeviceUsingPUTRequest): Promise<DeviceDTO> {
        const response = await this.updateDeviceUsingPUTRaw(requestParameters);
        return await response.value();
    }

}
