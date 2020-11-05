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
                });
            });
        });
    }

    handleChange = (operation: ProcessorOperationDesc, argumentString: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationsWithArguments;

        let arrOpIndex = this.state.operationsWithArguments.findIndex(op => op.operation === operation);

        let arrArgIndex = this.state.operationsWithArguments[arrOpIndex].arguments.findIndex(arg => arg.name === argumentString);

        arrCopy[arrOpIndex].arguments[arrArgIndex] = { name: argumentString, value: event.target.value };

        this.setState({ operationsWithArguments: arrCopy });
    };

    handleClick(operation: ProcessorOperationDesc) {
        let opIndex = this.state.operationsWithArguments.findIndex(op => op.operation === operation);

        let opArgs = this.state.operationsWithArguments[opIndex].arguments;

        let requestParameters: ExecuteSignalProcessorOperationsUsingPUTRequest = {
            id: this.props.signalProcessorId,
            name: operation.name as string,
            operationArguments: opArgs
        };

        let callSignalProcessorApi = new SignalProcessorResourceApi();
        callSignalProcessorApi.executeSignalProcessorOperationsUsingPUT(requestParameters).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        })
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
                                                onChange={this.handleChange(operation, arg.name as string)}
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