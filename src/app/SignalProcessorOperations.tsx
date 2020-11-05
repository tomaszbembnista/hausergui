import React from "react";
import {
    ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationDesc,
    SignalProcessorResourceApi, ProcessorOperationArgument, ProcessorOperationArgumentDesc
} from "./srvapi";
import {
    Accordion, Grid, AccordionSummary, AccordionDetails, Typography,
    WithStyles, withStyles, TextField, Button,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface SignalProcessorOperationsProps extends WithStyles<typeof styles> {
    signalProcessorId: number;
}

interface SignalProcessorOperationsState {
    operations: ProcessorOperationDesc[];
    operationsWithArguments: OperationWithArgument[];
}

interface OperationWithArgument {
    operation: ProcessorOperationDesc;
    arguments: ProcessorOperationArgument[];
}

class SignalProcessorOperations extends React.Component<SignalProcessorOperationsProps, SignalProcessorOperationsState> {
    constructor(props: SignalProcessorOperationsProps) {
        super(props);
        this.state = {
            operations: [],
            operationsWithArguments: []
        };
    }

    componentDidMount() {
        let signalProcessorApi = new SignalProcessorResourceApi();
        signalProcessorApi.getSignalProcessorOperationsUsingGET({ id: this.props.signalProcessorId }).then((values) => {
            this.setState({ operations: values });
        }).then(() => {
            this.state.operations.map((operation) => {
                let args: ProcessorOperationArgument[] = [];

                operation.arguments?.map((arg) => {
                    args.push({ name: arg.name, value: "" });
                });

                this.setState({
                    operationsWithArguments: this.state.operationsWithArguments.concat({
                        operation: operation, arguments: args
                    })
                })
            })
        })
    }

    handleClick(operation: ProcessorOperationDesc) {
        console.log(operation);
        console.log(this.state.operationsWithArguments);

        /*
        let operationArgs: ProcessorOperationArgument = {

        }
        */
        /*let requestParameters: ExecuteSignalProcessorOperationsUsingPUTRequest = {
            id: this.props.signalProcessorId,
            name: operation.name as string,
            operationArguments: []
        };*/
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
                                    {
                                        operation.arguments?.map(arg => (
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                key={arg.name}
                                                id={arg.name}
                                                label={arg.name}
                                                type="text"
                                                fullWidth
                                            />
                                        ))
                                    }
                                    <Button onClick={() => this.handleClick(operation)}>Change</Button>
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