import React from 'react';
import { ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument, ProcessorOperationDesc, SignalProcessorResourceApi } from './srvapi';
import { TextField, Button } from "@material-ui/core";
import { OperationCanceledException } from 'typescript';

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationArguments: ProcessorOperationArgument[];
}

class SignalProcessorExec extends React.Component<SignalProcessorExecProps, SignalProcessorExecState> {
    constructor(props: SignalProcessorExecProps) {
        super(props);
        this.state = {
            operationArguments: []
        };
    }

    componentDidMount() {
        let args: ProcessorOperationArgument[] = [];

        this.props.operation.arguments?.map((arg) => {
            args.push({ name: arg.name, value: "" });
        });

        this.setState({ operationArguments: args });
    }

    validateFields() {

    }

    handleChange = (operation: ProcessorOperationDesc, argumentString: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationArguments;

        let arrArgIndex = this.state.operationArguments.findIndex(arg => arg.name === argumentString);

        arrCopy[arrArgIndex] = { name: argumentString, value: event.target.value };

        this.setState({ operationArguments: arrCopy });
    };


    handleClick(operation: ProcessorOperationDesc) {
        this.validateFields();
        /*
        let requestParameters: ExecuteSignalProcessorOperationsUsingPUTRequest = {
            id: this.props.signalProcessorId,
            name: operation.name as string,
            operationArguments: this.state.operationWithArguments.arguments
        };

        let callSignalProcessorApi = new SignalProcessorResourceApi();
        callSignalProcessorApi.executeSignalProcessorOperationsUsingPUT(requestParameters).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error)
        })
        */
    }

    textFieldRequired(optional: boolean, argName: string): JSX.Element {
        if (optional) {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    key={argName}
                    id={argName}
                    label={argName}
                    onChange={this.handleChange(this.props.operation, argName)}
                    type="text"
                    fullWidth
                />
            )
        }
        return (
            <TextField
                required
                autoFocus
                margin="dense"
                key={argName}
                id={argName}
                label={argName}
                onChange={this.handleChange(this.props.operation, argName)}
                type="text"
                fullWidth
            />
        )
    }

    render() {
        return (
            <>
                {
                    this.props.operation.arguments?.map(arg => (
                        this.textFieldRequired(arg.optional as boolean, arg.name as string)
                    ))
                }
                <Button onClick={() => this.handleClick(this.props.operation)}>Change</Button>
            </>
        )
    }
}

export default SignalProcessorExec;