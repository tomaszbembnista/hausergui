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
};

class Devices extends React.Component<DevicesProps, DevicesState> {
    constructor(props: DevicesProps) {
        super(props);
        this.state = { devices: [] };
    }

    componentDidMount() {
        this.getDevices(this.props.spaceId);
    }

    componentDidUpdate(prevProps: DevicesProps) {
        if (prevProps.spaceId !== this.props.spaceId) {
            this.getDevices(this.props.spaceId);
        }
    }

    getDevices(spaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();
        spacesResource.getDevicesBelongingToSpaceUsingGET({ id: spaceId }).then(values => {
            this.setState({ devices: values });
        })
    }

    render() {
        return (
            <>
                {
                    this.state.devices.length > 0 ?
                        <Accordion>
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
                        :
                        <Accordion disabled>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography className={this.props.classes.accordionHeading}>Devices</Typography>
                                <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.devices.length}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                }
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Devices);