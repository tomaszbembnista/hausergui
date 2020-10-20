import React from "react";
import { SpaceResourceApi } from "./srvapi";
import { SpaceDTO } from "./srvapi/models/space-dto";
import { forkJoin, of } from 'rxjs';
import { Card, Typography, CardActions, Button } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { AxiosResponse } from "axios";

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {
            spaceId: this.props.parentSpaceId,
            spaceName: "Spaces",
            ancestorsPath: [],
            spaces: []
        };
    }

    componentDidMount() {
        this.getSpaceDetails(this.props.parentSpaceId);
    }

    getSpaceDetails(parentSpaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();

        let defaultSpace: SpaceDTO = {
            id: parentSpaceId,
            name: "Spaces",
            parentId: null,
            slug: null
        }

        let defaultSpaceWrapper: AxiosResponse<SpaceDTO> = {
            data: defaultSpace,
            status: 200,
            statusText: "",
            headers: "",
            config: {}
        }

        let spaceObservable: Promise<AxiosResponse<SpaceDTO>> = of(defaultSpaceWrapper).toPromise();

        if (parentSpaceId !== -1) {
            spaceObservable = spacesResource.getSpaceUsingGET(parentSpaceId);
        }

        forkJoin([
            spaceObservable,
            spacesResource.getSpacesBelongingToSpaceUsingGET(parentSpaceId)
        ])
            .subscribe((values) => {
                let state: ListSpacesState = {
                    spaceId: parentSpaceId,
                    spaceName: values[0].data.name,
                    ancestorsPath: this.state.ancestorsPath.concat(parentSpaceId),
                    spaces: values[1].data
                };
                this.setState(state);
            });
    }

    backButtonOnClickHandler() {
        if (this.state.ancestorsPath.length > 0) {
            let parentSpaceId: number = this.state.ancestorsPath.pop() as number;
            parentSpaceId = this.state.ancestorsPath.pop() as number;
            this.getSpaceDetails(parentSpaceId);
        }
    }

    render() {
        return (
            <Card>
                <Typography variant="h5" component="h2">
                    {this.state.spaceName}
                </Typography>

                {this.state.spaces.map(space => (
                    <Card variant="outlined" key={space.id}>
                        <Typography variant="h5" component="h2">
                            {space.name}
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => this.getSpaceDetails(space.id)}>Learn More</Button>
                        </CardActions>
                    </Card>
                ))}
                <CardActions>
                    {this.state.spaceId > -1 && <ArrowBackIosOutlinedIcon onClick={() => this.backButtonOnClickHandler()}>BACK</ArrowBackIosOutlinedIcon>}
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
    spaceName: string;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}