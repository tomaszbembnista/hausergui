import React from "react";
import { ProcessorOperationDesc, SignalProcessorResourceApi } from "./srvapi";
import {
    Accordion, Grid, AccordionSummary, AccordionDetails, Typography,
    WithStyles, withStyles
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";
import SignalProcessorExec from "./SignalProcessorExec";

interface SignalProcessorOperationsProps extends WithStyles<typeof styles> {
    signalProcessorId: number;
}

interface SignalProcessorOperationsState {
    operations: ProcessorOperationDesc[];
}

class SignalProcessorOperations extends React.Component<SignalProcessorOperationsProps, SignalProcessorOperationsState> {
    constructor(props: SignalProcessorOperationsProps) {
        super(props);
        this.state = {
            operations: [],
        };
    }

    componentDidMount() {
        let signalProcessorApi = new SignalProcessorResourceApi();
        signalProcessorApi.getSignalProcessorOperationsUsingGET({ id: this.props.signalProcessorId }).then((values) => {
            this.setState({ operations: values });
        });
    }

    render() {
        return (
            <>
                {
                    this.state.operations.map(operation => (
                        <Grid item key={operation.name + "grid-item"}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                >
                                    <Typography className={this.props.classes.accordionHeading}>{operation.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SignalProcessorExec operation={operation} signalProcessorId={this.props.signalProcessorId} />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))
                }
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SignalProcessorOperations);