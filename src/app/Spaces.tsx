import React from "react";
import { SpaceResourceApi, SpaceDTO } from "./srvapi/index";
import { forkJoin, of } from 'rxjs';
import Devices from "./Devices";
import {
    Card, Typography, CardActions, Button, CardContent,
    Accordion, AccordionSummary, AccordionDetails,
    WithStyles, withStyles, AppBar, Toolbar
} from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface SpacesProps extends WithStyles<typeof styles> {
    parentSpaceId: number;
}

interface SpacesState {
    spaceData: SpaceDTO;
    ancestorsPath: number[];
    spaces: SpaceDTO[];
}

class Spaces extends React.Component<SpacesProps, SpacesState> {
    constructor(props: SpacesProps) {
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
            let state: SpacesState = {
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
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={this.props.classes.toolbarTitle}>
                            {this.state.spaceData.name}
                        </Typography>
                        {
                            this.state.spaceData.id as number > -1 &&
                            <ArrowBackIosOutlinedIcon className={this.props.classes.toolbarButton} onClick={() => this.backButtonOnClickHandler()} />
                        }
                    </Toolbar>
                </AppBar>
                <CardContent className={this.props.classes.cardRoot}>
                    {
                        this.state.spaces.length > 0 ?
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={this.props.classes.accordionHeading}>Subspaces </Typography>
                                    <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.spaces.length}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        this.state.spaces.map(space => (
                                            <Card variant="outlined" key={space.id} className={this.props.classes.spaceCard}>
                                                <Typography variant="h5" component="h2">
                                                    {space.name}
                                                </Typography>
                                                <CardActions>
                                                    <Button size="small" onClick={() => this.getSpaceDetails(space.id as number)}>Enter</Button>
                                                </CardActions>
                                            </Card>
                                        ))
                                    }
                                </AccordionDetails>
                            </Accordion>
                            :
                            <Accordion disabled>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={this.props.classes.accordionHeading}>Subspaces </Typography>
                                    <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.spaces.length}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                </AccordionDetails>
                            </Accordion>
                    }

                    <Devices spaceId={this.state.spaceData.id as number}></Devices>
                </CardContent>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Spaces);