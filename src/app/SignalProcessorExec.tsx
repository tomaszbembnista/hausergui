import React from 'react';
import {
    ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument,
    ProcessorOperationArgumentDescFromJSON, ProcessorOperationDesc, SignalProcessorResourceApi
} from './srvapi';
import { TextField, Button, Grid, IconButton } from "@material-ui/core";
import SignalProcessorOperationInput from './SignalProcessorOperationInput';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { v4 as uuidv4 } from 'uuid';

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationArguments: OperationArgument[];
    operationArrayArguments: OperationArrayArgument[];
    fieldsWithErrors: string[];
}

interface OperationArgument {
    name: string;
    value: string;
}

interface OperationArrayArgument {
    id: string;
    name: string;
    value: string;
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

const SPE = (props: SignalProcessorExecProps) => {
    const textField = (optional: boolean, argumentName: string, argumentType: string): JSX.Element => {
        if (state.fieldsWithErrors.includes(argumentName)) {
            return (
                <TextField
                    required
                    error
                    autoFocus
                    helperText="This field cannot be empty"
                    margin="dense"
                    key={argumentName}
                    id={argumentName}
                    label={argumentName}
                    onChange={handleChange(argumentName)}
                    type={FieldType[argumentType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
        else {
            return (
                <TextField
                    required={!optional}
                    autoFocus
                    margin="dense"
                    key={argumentName}
                    id={argumentName}
                    label={argumentName}
                    onChange={handleChange(argumentName)}
                    type={FieldType[argumentType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
    }

    const textFieldList = (optional: boolean, argumentName: string, argumentType: string): JSX.Element => {
        let arrayElementsType = argumentType.replace("LIST", "");

        if (state.fieldsWithErrors.includes(argumentName)) {
            return (
                <>
                    {
                        state.operationArrayArguments.map(arg => {
                            if (arg.name === argumentName) {
                                return (
                                    <>
                                        <TextField
                                            required
                                            error
                                            autoFocus
                                            helperText="This field cannot be empty"
                                            margin="dense"
                                            key={argumentName}
                                            id={argumentName}
                                            label={argumentName}
                                            onChange={handleChangeList(arg.id, argumentName)}
                                            type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                            fullWidth
                                        />
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton>
                                            <RemoveIcon />
                                        </IconButton>
                                    </>
                                )
                            }
                        })
                    }
                </>
            )
        }
        else {
            return (
                <>
                    {
                        state.operationArrayArguments.map(arg => {
                            if (arg.name === argumentName) {
                                return (
                                    <>
                                        <TextField
                                            required={!optional}
                                            autoFocus
                                            margin="dense"
                                            key={argumentName}
                                            id={argumentName}
                                            label={argumentName}
                                            onChange={handleChangeList(arg.id, argumentName)}
                                            type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                            fullWidth
                                        />
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton>
                                            <RemoveIcon />
                                        </IconButton>
                                    </>
                                )
                            }
                        })
                    }
                </>
            )
        }
    }

    const handleChange = (argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        let arrCopy = state.operationArguments;

        const arrArgIndex = state.operationArguments.findIndex(arg => arg.name === argumentName);

        arrCopy[arrArgIndex] = { name: argumentName, value: event.target.value };

        state.operationArguments = arrCopy;
    }

    const handleChangeList = (argumentId: string, argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        let arrCopy = state.operationArrayArguments;

        const arrArgIndex = state.operationArrayArguments.findIndex(arg => arg.id === argumentId);

        arrCopy[arrArgIndex] = { id: argumentId, name: argumentName, value: event.target.value };

        state.operationArrayArguments = arrCopy;
    }

    const handleSubmit = (): void => {
        console.log(state.operationArguments)
        console.log(state.operationArrayArguments)
    }

    let state: SignalProcessorExecState = {
        operationArguments: [],
        operationArrayArguments: [],
        fieldsWithErrors: []
    }

    props.operation.arguments?.map((arg) => {
        if (arg.type?.includes("LIST")) {
            state.operationArrayArguments.push({ id: uuidv4(), name: arg.name as string, value: "" });
        }
        else {
            state.operationArguments.push({ name: arg.name as string, value: "" });
        }
    })

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
        >
            {
                props.operation.arguments?.map(arg => (
                    <Grid item key={arg.name}>
                        {
                            arg.type?.includes("LIST") ?
                                textFieldList(arg.optional as boolean, arg.name as string, arg.type as string)
                                :
                                textField(arg.optional as boolean, arg.name as string, arg.type as string)
                        }
                    </Grid>
                ))
            }
            <Button onClick={() => handleSubmit()}>Change</Button>
        </Grid>
    )
}

export default SPE;

/*
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
     // do dodania koniec

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
         // do dodania koniec
    }

    textField(optional: boolean, argName: string, argType: string): JSX.Element {
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
                    required={!optional}
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
                    required={!optional}
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
*/