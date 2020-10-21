import React from "react";
import { SpaceResourceApi, SpaceDTO } from "./srvapi/index";
import { forkJoin, of } from 'rxjs';
import { Card, Typography, CardActions, Button, CardHeader, CardContent } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default class ListSpaces extends React.Component<ListSpacesProps, ListSpacesState> {
    constructor(props: ListSpacesProps) {
        super(props);
        this.state = {
            spaceData: {
                id: this.props.parentSpaceId,
                name: "Spaces",
                parentId: undefined,
                slug: undefined
            },
            ancestorsPath: [],
            spaces: []
        };
    }

    componentDidMount() {
        this.getSpaceDetails(this.props.parentSpaceId);
    }

    getSpaceDetails(spaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();

        let subspaces: number[] = this.state.spaces.map(space => space.id as number);

        if (subspaces.includes(spaceId)) {
            spacesResource.getSpacesBelongingToSpaceUsingGET({ id: spaceId }).then((response) => {
                let state: ListSpacesState = {
                    spaceData: this.state.spaces[subspaces.indexOf(spaceId)],
                    ancestorsPath: this.state.ancestorsPath.concat(spaceId),
                    spaces: response
                }
                this.setState(state);
            });
        }
        else {
            let defaultSpace: SpaceDTO = {
                id: spaceId,
                name: "Spaces",
                parentId: undefined,
                slug: undefined
            }

            let spaceObservable: Promise<SpaceDTO> = of(defaultSpace).toPromise();

            if (spaceId !== -1) {
                spaceObservable = spacesResource.getSpaceUsingGET({ id: spaceId });
            }

            forkJoin([
                spaceObservable,
                spacesResource.getSpacesBelongingToSpaceUsingGET({ id: spaceId })
            ]).subscribe((values) => {
                let state: ListSpacesState = {
                    spaceData: {
                        id: spaceId,
                        name: values[0].name,
                        parentId: values[0].parentId,
                        slug: values[0].slug
                    },
                    ancestorsPath: this.state.ancestorsPath.concat(spaceId),
                    spaces: values[1]
                };
                this.setState(state);
            });
        }
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
                <CardHeader
                    action={
                        this.state.spaceData.id as number > -1 && <ArrowBackIosOutlinedIcon onClick={() => this.backButtonOnClickHandler()} />
                    }
                    title={
                        this.state.spaceData.name
                    }
                />
                <CardContent>
                    {this.state.spaces.map(space => (
                        <Card variant="outlined" key={space.id} className="subcard">
                            <Typography variant="h5" component="h2">
                                {space.name}
                            </Typography>
                            <CardActions>
                                <Button size="small" onClick={() => this.getSpaceDetails(space.id as number)}>Enter</Button>
                            </CardActions>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        );
    }
}

interface ListSpacesProps {
    parentSpaceId: number;
}

interface ListSpacesState {
    spaceData: SpaceDTO;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}