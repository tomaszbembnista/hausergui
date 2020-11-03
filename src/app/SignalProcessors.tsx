import React from "react";
import { SignalProcessorDTO, SpaceResourceApi } from "./srvapi";
import { Accordion, AccordionDetails, AccordionSummary, Typography, WithStyles, withStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface SignalProcessorsProps extends WithStyles<typeof styles> {
    spaceId: number;
}

interface SignalProcessorsState {
    signalprocessors: SignalProcessorDTO[];
    accordionExpanded: boolean;
}

class SignalProcessors extends React.Component<SignalProcessorsProps, SignalProcessorsState> {
    constructor(props: SignalProcessorsProps) {
        super(props);
        this.state = {
            signalprocessors: [],
            accordionExpanded: false
        };
    }

    componentDidMount() {
        this.getSignalProcessors(this.props.spaceId);
    }

    getSignalProcessors(spaceId: number) {
        let signalProcessorsApi = new SpaceResourceApi();
        signalProcessorsApi.getSignalProcessorsBelongingToSpaceUsingGET({ id: spaceId }).then((values) => {
            this.setState({ signalprocessors: values });
        })
    }

    expandAccordion = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (this.state.signalprocessors.length > 0) {
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
                        <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.signalprocessors.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {
                                this.state.signalprocessors.map(signalProcessor => (
                                    <li key={signalProcessor.id}>
                                        {signalProcessor.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SignalProcessors);