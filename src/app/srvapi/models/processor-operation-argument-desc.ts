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
/**
 * 
 * @export
 * @interface ProcessorOperationArgumentDesc
 */
export interface ProcessorOperationArgumentDesc {
    /**
     * 
     * @type {string}
     * @memberof ProcessorOperationArgumentDesc
     */
    name?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ProcessorOperationArgumentDesc
     */
    optional?: any;
    /**
     * 
     * @type {string}
     * @memberof ProcessorOperationArgumentDesc
     */
    type?: ProcessorOperationArgumentDescTypeEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum ProcessorOperationArgumentDescTypeEnum {
    FLOAT = 'FLOAT',
    INT = 'INT',
    STRING = 'STRING',
    DATE = 'DATE',
    FLOATLIST = 'FLOAT_LIST',
    INTLIST = 'INT_LIST',
    STRINGLIST = 'STRING_LIST',
    DATELIST = 'DATE_LIST',
    VOID = 'VOID'
}
