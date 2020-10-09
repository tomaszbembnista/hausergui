import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";
import { Card, Typography, CardActions, Button } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    public currentSpaceName: any;

    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {spaceId: this.props.parentSpaceId, 
            ancestorsPath: [],
            spaces: []};
    }
    
    componentDidMount() {
        this.getSubspaces(this.props.parentSpaceId);
    }

    getSubspaces(parentSpaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi(); 
        spacesResource.getSpacesBelongingToSpaceUsingGET(parentSpaceId).then(spacesResult => {
            let state: ListSpacesState = {spaceId: parentSpaceId, 
                ancestorsPath: this.state.ancestorsPath.concat(parentSpaceId),
                spaces: spacesResult.data
            };
            this.setState(state);
        })
    }

    getCurrentSpaceName() : any {
        let spaceName;
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();
        spacesResource.getSpaceUsingGET(this.state.spaceId).then(spaceResult => {
            console.log(spaceResult.data);
            spaceName = spaceResult.data.name;
        })
        return spaceName;
    }

    buttonOnClickHandler() {
        if (this.state.ancestorsPath.length > 0) {
            let parentSpaceId: number = this.state.ancestorsPath.pop() as number;
            parentSpaceId = this.state.ancestorsPath.pop() as number;
            this.getSubspaces(parentSpaceId);
        }
    }

    render() {
        return (
            <Card>
                <Typography variant="h5" component="h2">
                    Spaces
                </Typography>
                
                {this.state.spaces.map(space => (
                    <Card variant="outlined" key={space.id}>
                        <Typography variant="h5" component="h2">
                            {space.name}
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => this.getSubspaces(space.id)}>Learn More</Button>
                        </CardActions>
                    </Card>
                ))}
                <CardActions>
                    {this.state.spaceId > -1 && <ArrowBackIosOutlinedIcon onClick={() => this.buttonOnClickHandler()}>BACK</ArrowBackIosOutlinedIcon>}
                </CardActions>
            </Card>
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