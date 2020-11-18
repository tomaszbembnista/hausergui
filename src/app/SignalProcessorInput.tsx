import React from 'react';
import { TextField } from '@material-ui/core';

interface InputProps {
    optional: boolean;
    error?: boolean;
    operationArgument: OperationArgument;
    argName: string;
    argType: string;
    onChangeFunc: myOnChangeType;
}

type myOnChangeType = (argName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;

interface OperationArgument {
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

const SignalProcessorInput = (props: InputProps): JSX.Element => {

    if (props.error) {
        return (
            <TextField
                required
                error
                autoFocus
                helperText="This field cannot be empty"
                margin="dense"
                key={props.argName}
                id={props.argName}
                label={props.argName}
                value={props.operationArgument.value}
                onChange={props.onChangeFunc(props.argName)}
                type={FieldType[props.argType as keyof typeof FieldType]}
                fullWidth
                className="value"
            />
        )
    }
    else {
        return (
            <TextField
                required={!props.optional}
                autoFocus
                margin="dense"
                key={props.argName}
                id={props.argName}
                label={props.argName}
                value={props.operationArgument.value}
                onChange={props.onChangeFunc(props.argName)}
                type={FieldType[props.argType as keyof typeof FieldType]}
                fullWidth
                className="value"
            />
        )
    }
}

export default SignalProcessorInput;