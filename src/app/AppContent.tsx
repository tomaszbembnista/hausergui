import React from "react";
import GetSpaces from "./GetSpaces";
import GetDevices from "./GetDevices";
import { Observable } from "rxjs";
import { SpaceDTO } from "./srvapi";
import { Card, Typography, CardActions, Button, CardHeader, CardContent } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default class AppContent extends React.Component<AppContentProps, AppContentState>{
    constructor(props: AppContentProps) {
        super(props);
        this.state = {
            spaceInfo: {
                spaceData: {
                    id: this.props.parentSpaceId,
                    name: "Spaces",
                    parentId: undefined,
                    slug: undefined
                },
                ancestorsPath: [],
                spaces: []
            }
        };
    }

    componentDidMount() {
        this.getSpaceWithDetails(this.props.parentSpaceId);
    }

    getSpaceWithDetails(spaceId: number) {
        let callGetSpaces: GetSpaces = new GetSpaces();
        let spaceDetails: Observable<[SpaceDTO, SpaceDTO[]]> = callGetSpaces.getSpaceDetails(spaceId, this.state.spaceInfo.spaces);

        spaceDetails.subscribe((values) => {
            let state: AppContentState = {
                spaceInfo: {
                    spaceData: values[0],
                    ancestorsPath: this.state.spaceInfo.ancestorsPath.concat(spaceId),
                    spaces: values[1]
                }
            }
            this.setState(state);
        });
    }

    backButtonOnClickHandler() {
        if (this.state.spaceInfo.ancestorsPath.length > 0) {
            let parentSpaceId: number = this.state.spaceInfo.ancestorsPath.pop() as number;
            parentSpaceId = this.state.spaceInfo.ancestorsPath.pop() as number;
            this.getSpaceWithDetails(parentSpaceId);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader
                    action={
                        this.state.spaceInfo.spaceData.id as number > -1 && <ArrowBackIosOutlinedIcon onClick={() => this.backButtonOnClickHandler()} />
                    }
                    title={
                        this.state.spaceInfo.spaceData.name
                    }
                />
                <CardContent>
                    {this.state.spaceInfo.spaces.map(space => (
                        <Card variant="outlined" key={space.id} className="subcard">
                            <Typography variant="h5" component="h2">
                                {space.name}
                            </Typography>
                            <CardActions>
                                <Button size="small" onClick={() => this.getSpaceWithDetails(space.id as number)}>Enter</Button>
                            </CardActions>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        )
    }
}

interface AppContentProps {
    parentSpaceId: number;
}

interface ListSpacesState {
    spaceData: SpaceDTO;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}

interface AppContentState {
    spaceInfo: ListSpacesState;
}