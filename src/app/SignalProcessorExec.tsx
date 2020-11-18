import React from 'react';
import {
    ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument,
    ProcessorOperationArgumentDescFromJSON, ProcessorOperationDesc, SignalProcessorResourceApi
} from './srvapi';
import { Button, Grid } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';
import SignalProcessorInput from './SignalProcessorInput';
import SignalProcessorListInput from './SignalProcessorListInput';

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

class SignalProcessorExec extends React.Component<SignalProcessorExecProps, SignalProcessorExecState> {
    constructor(props: SignalProcessorExecProps) {
        super(props);
        this.state = {
            operationArguments: [],
            operationArrayArguments: [],
            fieldsWithErrors: []
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


    validateFields(): { toSend: boolean, errors: string[] } {
        let validation: { toSend: boolean, errors: string[] } = { toSend: true, errors: [] }

        this.state.operationArguments.map((opArgs) => {
            this.props.operation.arguments?.map((args) => {
                if (opArgs.name === args.name && !args.optional && opArgs.value?.length === 0) {
                    validation.toSend = false;
                    validation.errors.push(opArgs.name as string);
                }
            })
        })
        return validation;
    }

    handleClick() {
        let fieldsValidation = this.validateFields();

        if (fieldsValidation.toSend) {
            let requestParameters: ExecuteSignalProcessorOperationsUsingPUTRequest = {
                id: this.props.signalProcessorId,
                name: this.props.operation.name as string,
                operationArguments: this.state.operationArguments
            };

            let callSignalProcessorApi = new SignalProcessorResourceApi();
            callSignalProcessorApi.executeSignalProcessorOperationsUsingPUT(requestParameters).then((response) => {
                this.setState({ fieldsWithErrors: [] })
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            this.setState({ fieldsWithErrors: fieldsValidation.errors })
        }
    }

    handleChange = (argumentName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let arrCopy = this.state.operationArguments;

        const arrArgIndex = this.state.operationArguments.findIndex(arg => arg.name === argumentName);

        arrCopy[arrArgIndex] = { name: argumentName, value: event.target.value };

        this.setState({ operationArguments: arrCopy });
    };

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

    listFields(): JSX.Element {
        return (
            <>
                {
                    this.props.operation.arguments?.map(arg => {
                        const fieldError: boolean = this.state.fieldsWithErrors.includes(arg.name as string);
                        if (arg.type?.includes("LIST")) {
                            return (
                                <Grid item key={arg.name}>
                                    <SignalProcessorListInput
                                        error={fieldError}
                                        optional={arg.optional as boolean}
                                        argName={arg.name as string}
                                        argType={arg.type as string}
                                        operationArrayArguments={this.state.operationArrayArguments}
                                        onChangeFunc={this.handleChangeList}
                                        addFieldFunc={this.handleAddTextField}
                                        removeFieldFunc={this.handleRemoveTextField}
                                    />
                                </Grid>
                            )
                        }
                        else {
                            const opIdx: number = this.state.operationArguments.findIndex(i => i.name === arg.name);
                            if (opIdx > -1) {
                                return (
                                    <Grid item key={arg.name}>
                                        <SignalProcessorInput
                                            error={fieldError}
                                            optional={arg.optional as boolean}
                                            operationArgument={this.state.operationArguments[opIdx]}
                                            argName={arg.name as string}
                                            argType={arg.type as string}
                                            onChangeFunc={this.handleChange}
                                        />
                                    </Grid>
                                )
                            }
                            else {
                                return (<div key={"empty"}></div>)
                            }

                        }
                    })
                }
            </>
        )
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                {this.listFields()}
                <Button onClick={() => this.handleClick()}>Change</Button>
            </Grid>
        )
    }
}

export default SignalProcessorExec;
