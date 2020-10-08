import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {spaceId: this.props.prop, spaces: []};
    }

    componentDidMount() {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi(); 
        spacesResource.getSpacesBelongingToSpaceUsingGET(this.state.spaceId).then(spacesResult => {
            var state: ListSpacesState = {spaceId: this.state.spaceId, spaces: spacesResult.data};
            this.setState(state);
        })
    }

    onClickHandler(newSpaceId: any) {
        this.state = {spaceId: newSpaceId, spaces: []};
        this.componentDidMount();
    }

    render() {
        return (
            <div>
                {this.state.spaces.map(space => (
                    <div key={space.id} onClick={() => this.onClickHandler(space.id)}>id: {space.id}, name: {space.name}</div>
                ))}
            </div>
        );
    }
}

interface ListSpacesProps {
    prop: number;
}

interface ListSpacesState {
    spaceId: number;
    spaces: SpaceDTO[];
}