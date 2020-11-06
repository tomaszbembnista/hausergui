import React from 'react';
import { TextField } from '@material-ui/core';

interface InputProps {
    optional: boolean;
    error: boolean;
    operationArguments: OperationArgument[];
    argumentType: string;
}

interface OperationArgument {
    name: string;
    value: string[];
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

const SignalProcessorOperationInput = (props: InputProps) => {
    if (props.optional) {
        return (
            props.operationArguments.map((val, id) => {
                let opId = `op-${id}`;
                return (
                    <TextField
                        autoFocus
                        margin="dense"
                        key={opId}
                        id={opId}
                        label={val.name}
                        value={props.operationArguments[id].value}
                        type={FieldType[props.argumentType as keyof typeof FieldType]}
                        fullWidth
                    />
                )
            })
        )
    }
    else {
        if (props.error) {
            return (
                props.operationArguments.map((val, id) => {
                    let opId = `op-${id}`;
                    return (
                        <TextField
                            autoFocus
                            required
                            helperText="This field cannot be empty"
                            error
                            margin="dense"
                            key={opId}
                            id={opId}
                            label={val.name}
                            value={props.operationArguments[id].value}
                            type={FieldType[props.argumentType as keyof typeof FieldType]}
                            fullWidth
                        />
                    )
                })
            )
        }
        else {
            return (
                props.operationArguments.map((val, id) => {
                    let opId = `op-${id}`;
                    return (
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            key={opId}
                            id={opId}
                            label={val.name}
                            value={props.operationArguments[id].value}
                            type={FieldType[props.argumentType as keyof typeof FieldType]}
                            fullWidth
                        />
                    )
                })
            )
        }

    }
}

export default SignalProcessorOperationInput;