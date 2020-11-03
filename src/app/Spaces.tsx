import React from "react";
import { SpaceResourceApi, SpaceDTO } from "./srvapi/index";
import { forkJoin, of } from 'rxjs';
import Devices from "./Devices";
import SignalProcessors from "./SignalProcessors";
import {
    Card, Typography, CardActions, Button, CardContent,
    Accordion, AccordionSummary, AccordionDetails,
    WithStyles, withStyles, AppBar, Toolbar
} from "@material-ui/core";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";
import { RouteComponentProps } from 'react-router-dom';

interface RouteInfo {
    id: string;
}

interface SpacesProps extends WithStyles<typeof styles>, RouteComponentProps<RouteInfo> {
    spaceId: number | undefined;
}

interface SpacesState {
    spaceData: SpaceDTO;
    spaces: SpaceDTO[];
    accordionExpanded: boolean;
}

class Spaces extends React.Component<SpacesProps, SpacesState> {
    constructor(props: SpacesProps) {
        super(props);

        let stateSpaceData: SpaceDTO;
        if (this.props.match.params.id) {
            stateSpaceData = {
                id: parseInt(this.props.match.params.id, 10),
                name: "Spaces",
                parentId: undefined,
                slug: undefined
            }
        }
        else {
            stateSpaceData = {
                id: this.props.spaceId,
                name: "Spaces",
                parentId: undefined,
                slug: undefined
            }
        }

        this.state = {
            spaceData: stateSpaceData,
            spaces: [],
            accordionExpanded: false
        }
    }

    componentDidMount() {
        this.getSpaceDetails(this.state.spaceData.id as number);
    }

    componentDidUpdate(prevProps: SpacesProps, prevState: SpacesState) {
        if (prevState.spaceData.id !== this.state.spaceData.id) {
            this.setState({ accordionExpanded: false });
        }
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
            let newSpaceData: SpaceDTO = {
                id: spaceId,
                name: values[0].name,
                parentId: values[0].parentId,
                slug: values[0].slug
            }
            this.setState({
                spaceData: newSpaceData,
                spaces: values[1]
            });
        });
    }

    goFurther(spaceId: number) {
        this.props.history.push('/space/' + spaceId);
    }


    goBack() {
        if (typeof this.state.spaceData.parentId == "number") {
            this.props.history.push('/space/' + this.state.spaceData.parentId);
        }
        else {
            this.props.history.push('/space/-1');
        }
    }

    expandAccordion = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (this.state.spaces.length > 0) {
            if (isExpanded) {
                this.setState({ accordionExpanded: true })
            }
            else {
                this.setState({ accordionExpanded: false })
            }
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
                            <ArrowBackIosOutlinedIcon className={this.props.classes.toolbarButton} onClick={() => this.goBack()} />
                        }
                    </Toolbar>
                </AppBar>
                <CardContent className={this.props.classes.cardRoot}>
                    <Accordion expanded={this.state.accordionExpanded} onChange={this.expandAccordion()}>
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
                                            <Button size="small" onClick={() => this.goFurther(space.id as number)}>Enter</Button>
                                        </CardActions>
                                    </Card>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                    <Devices spaceId={this.state.spaceData.id as number}></Devices>
                    <SignalProcessors spaceId={this.state.spaceData.id as number}></SignalProcessors>
                </CardContent>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Spaces);