import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";

export default class ListSpaces extends React.Component<any, ListSpacesState> {
    constructor(props: any) {
        super(props);
        this.state = {spaces: []};
    }

    componentDidMount() {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi(); 
        spacesResource.getSpacesBelongingToSpaceUsingGET(-1).then(spacesResult => {
            var state: ListSpacesState = {spaces: spacesResult.data};
            this.setState(state);
        })
    }

    render() {
        return (
            <div>
                {this.state.spaces.map(space => (
                    <div key={space.id}>id: {space.id}, name: {space.name}</div>
                ))}
            </div>
        );
    }
}

interface ListSpacesState {
    spaces: SpaceDTO[];
}