import React from 'react';
import { ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument, ProcessorOperationDesc, SignalProcessorResourceApi } from './srvapi';
import { TextField, Button } from "@material-ui/core";

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationArguments: ProcessorOperationArgument[];
}

enum FieldType {
    FLOAT = 'number',
    INT = 'number',
    STRING = 'string',
    DATE = 'date',
    FLOATLIST = 'number[]',
    INTLIST = 'number[]',
    STRINGLIST = 'string[]',
    DATELIST = 'date[]',
    VOID = 'void'
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

    validateFields(): boolean {
        let validated: boolean = true;

        this.state.operationArguments.map((opArgs) => {
            this.props.operation.arguments?.map((args) => {
                if (opArgs.name === args.name) {
                    if (!args.optional && opArgs.value?.length === 0) {
                        validated = false;
                    }
                }
            })
        })

        return validated;
    }

    handleChange = (argumentString: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationArguments;

        let arrArgIndex = this.state.operationArguments.findIndex(arg => arg.name === argumentString);

        arrCopy[arrArgIndex] = { name: argumentString, value: event.target.value };

        this.setState({ operationArguments: arrCopy });
    };


    handleClick() {
        if (this.validateFields()) {
            let requestParameters: ExecuteSignalProcessorOperationsUsingPUTRequest = {
                id: this.props.signalProcessorId,
                name: this.props.operation.name as string,
                operationArguments: this.state.operationArguments
            };

            let callSignalProcessorApi = new SignalProcessorResourceApi();
            callSignalProcessorApi.executeSignalProcessorOperationsUsingPUT(requestParameters).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            // handle errors
        }
    }

    textFieldRequired(optional: boolean, argName: string, argType: string): JSX.Element {
        if (optional) {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    key={argName}
                    id={argName}
                    label={argName}
                    onChange={this.handleChange(argName)}
                    type={FieldType[argType as keyof typeof FieldType]}
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
                onChange={this.handleChange(argName)}
                type={FieldType[argType as keyof typeof FieldType]}
                fullWidth
            />
        )
    }

    render() {
        return (
            <>
                {
                    this.props.operation.arguments?.map(arg => (
                        this.textFieldRequired(arg.optional as boolean, arg.name as string, arg.type as string)
                    ))
                }
                <Button onClick={() => this.handleClick()}>Change</Button>
            </>
        )
    }
}

export default SignalProcessorExec;