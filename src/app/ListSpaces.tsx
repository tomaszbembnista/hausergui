import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";
import { Button } from "grommet/components/Button";

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {spaceId: this.props.parentSpaceId, 
            ancestorsPath: [],
            spaces: []};
    }
    
    public test: SpaceDTO = { };

    componentDidMount() {
        this.test.id = "asd";
        this.getNextSpaces(this.props.parentSpaceId);
    }

    getNextSpaces(parentSpaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi(); 
        spacesResource.getSpacesBelongingToSpaceUsingGET(parentSpaceId).then(spacesResult => {
            var state: ListSpacesState = {spaceId: parentSpaceId, 
                ancestorsPath: this.state.ancestorsPath.concat(parentSpaceId),
                spaces: spacesResult.data
            };
            this.setState(state);
        })
    }

    buttonOnClickHandler() {
        if (this.state.ancestorsPath.length > 0) {
            let parentSpaceId: number = this.state.ancestorsPath.pop() as number;
            parentSpaceId = this.state.ancestorsPath.pop() as number;
            this.getNextSpaces(parentSpaceId);
        }
    }

    render() {
        return (
            <div>
                {this.state.spaceId > -1 && <Button onClick={() => this.buttonOnClickHandler()} label="back"></Button>}
                {this.state.spaces.map(space => (
                    <div key={space.id} onClick={() => this.getNextSpaces(space.id)}>id: {space.id}, name: {space.name}</div>
                ))}
            </div>
        );
    }
}

interface ListSpacesProps {
    parentSpaceId: number;
}

interface ListSpacesState {
    spaceId: number;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}