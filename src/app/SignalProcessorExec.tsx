import React from 'react';
import {
    ExecuteSignalProcessorOperationsUsingPUTRequest, ProcessorOperationArgument,
    ProcessorOperationArgumentDescFromJSON, ProcessorOperationDesc, SignalProcessorResourceApi
} from './srvapi';
import { Button, Grid } from "@material-ui/core";
import TbeInput, { TbeInputModel } from './argsEditor/TbeInput';
import TbeList from './argsEditor/TbeList';

interface SignalProcessorExecProps {
    operation: ProcessorOperationDesc;
    signalProcessorId: number;
}

interface SignalProcessorExecState {
    fieldsModels?: TbeInputModel[];
}

class SignalProcessorExec extends React.Component<SignalProcessorExecProps, SignalProcessorExecState> {
    constructor(props: SignalProcessorExecProps) {
        super(props);
        this.state = {
            fieldsModels: props.operation.arguments?.map(elem => new TbeInputModel(elem, { name: elem.name as string, value: "" }, this.handleChange.bind(this)))
        };
    }

    validateFields(): { toSend: boolean, errors: string[] } {
        let validation: { toSend: boolean, errors: string[] } = { toSend: true, errors: [] }
        /*
        this.state.operationArguments.map((opArgs) => {
            this.props.operation.arguments?.map((args) => {
                if (opArgs.name === args.name) {
                    if (!args.optional && opArgs.value?.length === 0) {
                        validation.toSend = false;
                        validation.errors.push(opArgs.name as string);
                    }
                }
            })
        }) */
        return validation;
    }

    handleClick() {
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

    handleChange = (fieldModel: TbeInputModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`parent component
        ${fieldModel}
        `);
    };

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
