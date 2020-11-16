import React from 'react';
import { ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument, ProcessorOperationDesc, SignalProcessorResourceApi } from './srvapi';
import { TextField, Button, Grid } from "@material-ui/core";
import SignalProcessorOperationInput from './SignalProcessorOperationInput';

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationArguments: OperationArgument[];
    fieldsWithErrors: string[];
}

interface OperationArgument {
    name: string;
    value?: string;
    arrayValue?: string[];
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
            operationArguments: [],
            fieldsWithErrors: []
        };
    }

    componentDidMount() {
        let args: OperationArgument[] = [];

        this.props.operation.arguments?.map((arg) => {
            if (arg.type?.includes("LIST")) {
                args.push({ name: arg.name as string, arrayValue: [""] });
            }
            else {
                args.push({ name: arg.name as string, value: "" });
            }
        });

        this.setState({ operationArguments: args });
    }

    /*
    validateFields(): { toSend: boolean, errors: string[] } { 
        let validation: { toSend: boolean, errors: string[] } = { toSend: true, errors: [] }

        this.state.operationArguments.map((opArgs) => {
            this.props.operation.arguments?.map((args) => {
                if (opArgs.name === args.name) {
                    if (!args.optional && opArgs.value?.length === 0) {
                        validation.toSend = false;
                        validation.errors.push(opArgs.name as string);
                    }
                }
            })
        })
        return validation; 
    } 
    */

    handleChange = (argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationArguments;

        const arrArgIndex = this.state.operationArguments.findIndex(arg => arg.name === argumentName);

        arrCopy[arrArgIndex] = { name: argumentName, value: event.target.value };

        this.setState({ operationArguments: arrCopy });
    };


    handleClick() {
        console.log(this.state.operationArguments);
        /*
        let fieldsValidation = this.validateFields();
    
        if (fieldsValidation.toSend) {
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
            this.setState({ fieldsWithErrors: fieldsValidation.errors })
        }
        */
    }

    textField(optional: boolean, argName: string, argType: string): JSX.Element {
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
        if (this.state.fieldsWithErrors.includes(argName)) {
            return (
                <TextField
                    required
                    error
                    autoFocus
                    helperText="This field cannot be empty"
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
        else {
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
    }

    textFieldList(optional: boolean, argName: string, argType: string): JSX.Element {
        let arrayElementsType = argType.replace("LIST", "");

        if (optional) {
            return (
                <TextField
                    autoFocus
                    margin="dense"
                    key={argName}
                    id={argName}
                    label={argName}
                    onChange={() => console.log("change")}
                    type={FieldType[arrayElementsType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
        if (this.state.fieldsWithErrors.includes(argName)) {
            return (
                <TextField
                    required
                    error
                    autoFocus
                    helperText="This field cannot be empty"
                    margin="dense"
                    key={argName}
                    id={argName}
                    label={argName}
                    onChange={() => console.log("change")}
                    type={FieldType[arrayElementsType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
        else {
            return (
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    key={argName}
                    id={argName}
                    label={argName}
                    onChange={() => console.log("change")}
                    type={FieldType[arrayElementsType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
    }

    render() {
        let { fieldsWithErrors, operationArguments } = this.state;

        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                {
                    this.props.operation.arguments?.map(arg => (
                        <Grid item key={arg.name}>
                            {
                                arg.type?.includes("LIST") ?
                                    this.textFieldList(arg.optional as boolean, arg.name as string, arg.type as string)
                                    :
                                    this.textField(arg.optional as boolean, arg.name as string, arg.type as string)
                            }
                        </Grid>
                    ))
                }
                <Button onClick={() => this.handleClick()}>Change</Button>
            </Grid>
        )
    }
}

export default SignalProcessorExec;