import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {spaceId: this.props.parentSpaceId, 
            ancestorsPath: [],
            spaces: []};
    }
    
    componentDidMount() {
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
                {this.state.spaceId > -1 && <ArrowBackIosOutlinedIcon onClick={() => this.buttonOnClickHandler()}>BACK</ArrowBackIosOutlinedIcon>}
                <List>
                    {this.state.spaces.map(space => (
                        <ListItem button key={space.id} onClick={() => this.getNextSpaces(space.id)}>
                            <ListItemText primary={space.name}></ListItemText>
                        </ListItem>
                    ))}
                </List>
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