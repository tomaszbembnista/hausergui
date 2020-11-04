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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SpaceDTO
 */
export interface SpaceDTO {
    /**
     * 
     * @type {number}
     * @memberof SpaceDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof SpaceDTO
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof SpaceDTO
     */
    parentId?: number;
    /**
     * 
     * @type {string}
     * @memberof SpaceDTO
     */
    slug?: string;
}

export function SpaceDTOFromJSON(json: any): SpaceDTO {
    return SpaceDTOFromJSONTyped(json, false);
}

export function SpaceDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SpaceDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'parentId': !exists(json, 'parentId') ? undefined : json['parentId'],
        'slug': !exists(json, 'slug') ? undefined : json['slug'],
    };
}

export function SpaceDTOToJSON(value?: SpaceDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'parentId': value.parentId,
        'slug': value.slug,
    };
}


