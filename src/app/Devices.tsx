import React from "react";
import { SpaceResourceApi, DeviceDTO } from "./srvapi";
import {
    withStyles, WithStyles, Accordion,
    AccordionSummary, AccordionDetails, Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface DevicesProps extends WithStyles<typeof styles> {
    spaceId: number;
};

interface DevicesState {
    devices: DeviceDTO[];
    accordion: string;
    accordionExpanded: boolean;
};

class Devices extends React.Component<DevicesProps, DevicesState> {
    constructor(props: DevicesProps) {
        super(props);
        this.state = {
            devices: [],
            accordion: "",
            accordionExpanded: false
        };
    }

    componentDidMount() {
        this.getDevices(this.props.spaceId);
    }

    componentDidUpdate(prevProps: DevicesProps) {
        if (prevProps.spaceId !== this.props.spaceId) {
            this.getDevices(this.props.spaceId);
            this.setState({ accordionExpanded: false });
        }
    }

    getDevices(spaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();
        spacesResource.getDevicesBelongingToSpaceUsingGET({ id: spaceId }).then(values => {
            this.setState({ devices: values });
        })
    }

    expandAccordion = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (this.state.devices.length > 0) {
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
                <Accordion expanded={this.state.accordionExpanded} onChange={this.expandAccordion()}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={this.props.classes.accordionHeading}>Devices</Typography>
                        <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.devices.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            this.state.devices.map(device => (
                                <p key={device.id}>
                                    {device.slug}
                                </p>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Devices);