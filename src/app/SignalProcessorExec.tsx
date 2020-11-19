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
import TbeInput, { TbeInputModel } from './argsEditor/TbeInput';
import TbeList from './argsEditor/TbeList';

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    operationArguments: OperationArgument[];
    operationArrayArguments: OperationArrayArgument[];
    fieldsWithErrors: string[];
    fieldsModels?: TbeInputModel[];
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

class SignalProcessorExec extends React.Component<SignalProcessorExecProps, SignalProcessorExecState> {
    constructor(props: SignalProcessorExecProps) {
        super(props);
        this.state = {
            operationArguments: [],
            operationArrayArguments: [],
            fieldsWithErrors: [],
            fieldsModels: props.operation.arguments?.map(elem => new TbeInputModel(elem, { name: elem.name }))
        };
    }

    componentDidMount() {
        let newOperationArguments: OperationArgument[] = [];
        let newOperationArrayArguments: OperationArrayArgument[] = [];

        this.props.operation.arguments?.map((arg) => {
            if (arg.type?.includes("LIST")) {
                newOperationArrayArguments.push({ id: uuidv4(), name: arg.name as string, value: "" });
            }
            else {
                newOperationArguments.push({ name: arg.name as string, value: "" });
            }
        });

        this.setState({ operationArguments: newOperationArguments, operationArrayArguments: newOperationArrayArguments });
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

    handleClick() {
        console.log(this.state.operationArguments);
        console.log(this.state.operationArrayArguments);
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

    handleChange = (argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationArguments;

        const arrArgIndex = this.state.operationArguments.findIndex(arg => arg.name === argumentName);

        arrCopy[arrArgIndex] = { name: argumentName, value: event.target.value };

        this.setState({ operationArguments: arrCopy });
    };

    textFieldList(optional: boolean, argName: string, argType: string): JSX.Element {
        let arrayElementsType = argType.replace("LIST", "");

        if (this.state.fieldsWithErrors.includes(argName)) {
            return (
                <>
                    {
                        this.state.operationArrayArguments.map(arg => {
                            if (arg.name === argName) {
                                const index = this.state.operationArrayArguments.findIndex(i => i.id === arg.id);
                                return (
                                    <>
                                        <TextField
                                            required
                                            error
                                            autoFocus
                                            helperText="This field cannot be empty"
                                            margin="dense"
                                            key={arg.id}
                                            id={arg.id}
                                            label={argName}
                                            onChange={this.handleChangeList(arg.id, argName)}
                                            value={this.state.operationArrayArguments[index].value}
                                            type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                            fullWidth
                                        />
                                        <IconButton onClick={() => this.handleAddTextField(arg.name)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton disabled={this.state.operationArrayArguments.length === 1} onClick={() => this.handleRemoveTextField(arg.id)}>
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
                        this.state.operationArrayArguments.map(arg => {
                            if (arg.name === argName) {
                                const index = this.state.operationArrayArguments.findIndex(i => i.id === arg.id);
                                return (
                                    <>
                                        <TextField
                                            required={!optional}
                                            autoFocus
                                            margin="dense"
                                            key={arg.id}
                                            id={arg.id}
                                            label={argName}
                                            onChange={this.handleChangeList(arg.id, argName)}
                                            value={this.state.operationArrayArguments[index].value}
                                            type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                            fullWidth
                                        />
                                        <IconButton onClick={() => this.handleAddTextField(arg.name)}>
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton disabled={this.state.operationArrayArguments.length === 1} onClick={() => this.handleRemoveTextField(arg.id)}>
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

    handleChangeList = (argumentId: string, argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        let arrCopy = this.state.operationArrayArguments;

        const arrArgIndex = this.state.operationArrayArguments.findIndex(arg => arg.id === argumentId);

        arrCopy[arrArgIndex] = { id: argumentId, name: argumentName, value: event.target.value };

        this.setState({ operationArrayArguments: arrCopy });
    }

    handleAddTextField = (argName: string): void => {
        this.setState((prevState, props) => ({
            operationArrayArguments: prevState.operationArrayArguments.concat({
                id: uuidv4(),
                name: argName,
                value: ""
            })
        })
        )
    }

    handleRemoveTextField = (id: string) => {
        let values = [...this.state.operationArrayArguments];

        const fieldIndex = this.state.operationArrayArguments.findIndex(arg => arg.id === id);

        values.splice(fieldIndex, 1);

        this.setState({ operationArrayArguments: values });
    }

    render() {
        return (
            <div>
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

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                >
                    {
                        this.state.fieldsModels?.map(arg => (
                            arg.operationDesc.type?.includes("LIST") ?
                                <TbeList model={arg}></TbeList>
                                :
                                <TbeInput model={arg}></TbeInput>
                        ))
                    }
                    <Button onClick={() => this.handleClick()}>Change TBE</Button>
                </Grid>

            </div >
        )
    }
}

export default SignalProcessorExec;
