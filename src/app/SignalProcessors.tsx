import React from "react";
import { SignalProcessorDTO, SpaceResourceApi } from "./srvapi";
import SignalProcessorOperations from "./SignalProcessorOperations";
import { Accordion, AccordionDetails, AccordionSummary, Typography, WithStyles, withStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface SignalProcessorsProps extends WithStyles<typeof styles> {
    spaceId: number;
}

interface SignalProcessorsState {
    signalProcessors: SignalProcessorDTO[];
    accordionExpanded: boolean;
}

class SignalProcessors extends React.Component<SignalProcessorsProps, SignalProcessorsState> {
    constructor(props: SignalProcessorsProps) {
        super(props);
        this.state = {
            signalProcessors: [],
            accordionExpanded: false
        };
    }

    componentDidMount() {
        this.getSignalProcessorsWithOperations(this.props.spaceId);
    }

    getSignalProcessorsWithOperations(spaceId: number) {
        let spaceResource = new SpaceResourceApi();

        spaceResource.getSignalProcessorsBelongingToSpaceUsingGET({ id: spaceId }).then((values) => {
            this.setState({ signalProcessors: values });
        });
    }

    expandAccordion = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (this.state.signalProcessors.length > 0) {
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
                        <Typography className={this.props.classes.accordionHeading}>Processors</Typography>
                        <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.signalProcessors.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {
                                this.state.signalProcessors.map(signalProcessor => (
                                    <li key={signalProcessor.id}>
                                        {signalProcessor.name}
                                        <ul>
                                            <SignalProcessorOperations signalProcessorId={signalProcessor.id as number} />
                                        </ul>
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