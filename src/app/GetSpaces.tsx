import React from "react";
import { SpaceResourceApi, SpaceDTO } from "./srvapi/index";
import { forkJoin, of } from 'rxjs';
import { Card, Typography, CardActions, Button, CardHeader, CardContent } from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default class GetSpaces extends React.Component<GetSpacesProps, GetSpacesState> {
    constructor(props: GetSpacesProps) {
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

        let defaultSpace: SpaceDTO = {
            id: spaceId,
            name: "Spaces",
            parentId: undefined,
            slug: undefined
        }

        let spaceObservable: Promise<SpaceDTO> = of(defaultSpace).toPromise();

        let subspace: SpaceDTO | undefined = this.state.spaces.find(space => {
            return space.id === spaceId;
        });

        if (subspace) {
            spaceObservable = of(subspace).toPromise();
        }
        else if (spaceId !== -1) {
            spaceObservable = spacesResource.getSpaceUsingGET({ id: spaceId });
        }

        forkJoin([
            spaceObservable,
            spacesResource.getSpacesBelongingToSpaceUsingGET({ id: spaceId })
        ]).subscribe((values) => {
            let state: GetSpacesState = {
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

    backButtonOnClickHandler() {
        if (this.state.ancestorsPath.length > 0) {
            let parentSpaceId: number = this.state.ancestorsPath.pop() as number;
            parentSpaceId = this.state.ancestorsPath.pop() as number;
            this.getSpaceDetails(parentSpaceId);
        }
    }

    render() {
        return (
            <>
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
            </>
        )
    }
}

interface GetSpacesProps {
    parentSpaceId: number;
}

interface GetSpacesState {
    spaceData: SpaceDTO;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}