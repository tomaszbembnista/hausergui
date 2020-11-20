import React from "react";
import { ProcessorOperationArgumentDesc, ProcessorOperationArgumentDescTypeEnum } from "../srvapi";
import {
    withStyles, TextField
} from "@material-ui/core";
import styles from "../Styles";
import { v4 as uuidv4 } from 'uuid';

export interface TbeInputProps {
    model: TbeInputModel;
}

type onChangeFunctionType = (fieldModel: TbeInputModel) => (event: React.ChangeEvent<HTMLInputElement>) => void;

export class TbeInputModel {
    private id: string = uuidv4();

    constructor(public operationDesc: ProcessorOperationArgumentDesc, public operationArg: { name: string, value: string }, public onChangeFunction: onChangeFunctionType) { };

    public get modelValue(): string | undefined {
        return this.operationArg.value;
    }

    public setModelValue(value: string) {
        this.operationArg.value = value;
    }

    public get uuid(): string {
        return this.id;
    }

    public get type(): string {
        if (this.operationDesc.type == ProcessorOperationArgumentDescTypeEnum.DATE) {
            return "date";
        }
        if (this.operationDesc.type == ProcessorOperationArgumentDescTypeEnum.FLOAT) {
            return "number";
        }
        if (this.operationDesc.type == ProcessorOperationArgumentDescTypeEnum.INT) {
            return "number";
        }
        return "text";
    }

    public get hasError(): boolean {
        if (this.operationArg.value) {
            return false;
        }
        return this.isRequired;
    }

    public get isRequired(): boolean {
        return !(this.operationDesc.optional ?? true);
    }

    public get helperText(): string {
        if (this.hasError) {
            return "This field cannot be empty";
        }
        return "";
    }
}

export interface TbeInputState {
    model: TbeInputModel;
}

class TbeInput extends React.Component<TbeInputProps, TbeInputState> {
    constructor(props: TbeInputProps) {
        super(props);
        this.state = {
            model: props.model,
        };
        console.log("Constructor called");
    }

    componentDidMount() {
        console.log("Component did mount called");
    }

    componentDidUpdate(prevProps: TbeInputProps) {
        console.log("Component did update called");
        if (prevProps.model !== this.props.model) {
            console.log("Rendering new state");
            this.setState({ model: this.props.model });
        }
    }

    public setModelValue(event: React.ChangeEvent<HTMLInputElement>) {
        this.state.model.setModelValue(event.target.value);
        this.setState({ model: this.state.model }); //do this to rerend GUI in order to change error state
        this.state.model.onChangeFunction(this.state.model); // doesn't work
    }

    render() {
        return (
            <TextField
                required={this.state.model.isRequired}
                error={this.state.model.hasError}
                autoFocus
                margin="dense"
                key={this.state.model.uuid}
                label={this.state.model.operationDesc.name}
                onChange={this.setModelValue.bind(this)}
                type={this.state.model.type}
                value={this.state.model.modelValue}
                helperText={this.state.model.helperText}
                fullWidth
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(TbeInput);