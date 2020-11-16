import React from 'react';
import { TextField } from '@material-ui/core';

interface InputProps {
    optional: boolean;
    //error: boolean;
    operationArguments: OperationArgument[];
    argumentType: string;
}

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

const SignalProcessorOperationInput = (props: InputProps) => {
    const generateTextField = (values: OperationArgument, id: number) => {
        let opId = `op-${id}`;

        /* 
        if (props.error) {
            return (
                <TextField
                    autoFocus
                    required={!props.optional}
                    helperText="This field cannot be empty"
                    error={props.error}
                    margin="dense"
                    key={opId}
                    id={opId}
                    label={values.name}
                    value={props.operationArguments[id].value}
                    type={FieldType[props.argumentType as keyof typeof FieldType]}
                    fullWidth
                />
            )
        }
        */
        return (
            <TextField
                autoFocus
                required={!props.optional}
                margin="dense"
                key={opId}
                id={opId}
                label={values.name}
                value={props.operationArguments[id].value}
                type={FieldType[props.argumentType as keyof typeof FieldType]}
                fullWidth
            />
        )
    }

    return (
        <>
            {
                props.operationArguments.map((val, id) => {
                    return (
                        generateTextField(val, id)
                    )
                })
            }
        </>
    )
}

export default SignalProcessorOperationInput;