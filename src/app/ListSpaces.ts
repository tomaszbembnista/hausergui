import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models";
import { AxiosResponse } from "axios";

function getSpacesUsingAPI() : Promise<AxiosResponse<SpaceDTO[]>> {
    let spa : SpaceResourceApi = new SpaceResourceApi();

    let findSpaces = spa.getSpacesUsingGET();

    return findSpaces;
}

function getSpacesList(promise : Promise<AxiosResponse<SpaceDTO[]>>) {
    let s : Array<Object> = new Array<Object>();
    promise.then( ( value ) => {
        for (let i in value.data) {
            s.push(value.data[i]);
        }
    } ).catch( (error) => {
        console.log(error);
    } );
    return s;
}

export default function getSpaces() {
    console.log(getSpacesList(getSpacesUsingAPI()));
}

