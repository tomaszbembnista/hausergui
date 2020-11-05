import React from 'react';
import { ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument, ProcessorOperationDesc, SignalProcessorResourceApi } from './srvapi';
import { TextField, Button } from "@material-ui/core";

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationWithArguments: OperationWithArguments[];
}

interface OperationWithArguments {
    operation: ProcessorOperationDesc;
    arguments: ProcessorOperationArgument[];
}

class SignalProcessorExec extends React.Component<SignalProcessorExecProps, SignalProcessorExecState> {
    constructor(props: SignalProcessorExecProps) {
        super(props);
        this.state = {
            operationWithArguments: []
        };
    }

    componentDidMount() {
        let args: ProcessorOperationArgument[] = [];

        this.props.operation.arguments?.map((arg) => {
            args.push({ name: arg.name, value: "" });
        });

        this.setState({
            operationWithArguments: this.state.operationWithArguments.concat({
                operation: this.props.operation, arguments: args
            })
        });
    }

    handleChange = (operation: ProcessorOperationDesc, argumentString: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationWithArguments;

        let arrOpIndex = this.state.operationWithArguments.findIndex(op => op.operation === operation);

        let arrArgIndex = this.state.operationWithArguments[arrOpIndex].arguments.findIndex(arg => arg.name === argumentString);

        arrCopy[arrOpIndex].arguments[arrArgIndex] = { name: argumentString, value: event.target.value };

        this.setState({ operationWithArguments: arrCopy });
    };


    handleClick(operation: ProcessorOperationDesc) {
        let opIndex = this.state.operationWithArguments.findIndex(op => op.operation === operation);

        let opArgs = this.state.operationWithArguments[opIndex].arguments;

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
                    this.props.operation.arguments?.map(arg => (
                        <TextField
                            autoFocus
                            margin="dense"
                            key={arg.name}
                            id={arg.name}
                            label={arg.name}
                            onChange={this.handleChange(this.props.operation, arg.name as string)}
                            type="text"
                            fullWidth
                        />
                    ))
                }
                <Button onClick={() => this.handleClick(this.props.operation)}>Change</Button>
            </>
        )
    }
}

export default SignalProcessorExec;