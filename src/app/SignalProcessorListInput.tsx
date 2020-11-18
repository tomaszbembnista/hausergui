import React from "react";
import { TextField, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

interface ListInputProps {
    error?: boolean;
    optional: boolean;
    argName: string;
    argType: string;
    operationArrayArguments: OperationArrayArgument[];
    onChangeFunc: myOnChangeType;
    addFieldFunc: addFieldType;
    removeFieldFunc: removeFieldType;
}

type myOnChangeType = (argId: string, argName: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
type addFieldType = (argName: string) => void;
type removeFieldType = (fieldId: string) => void;

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

const SignalProcessorListInput = (props: ListInputProps) => {
    let arrayElementsType = props.argType.replace("LIST", "");

    if (props.error) {
        return (
            <>
                {
                    props.operationArrayArguments.map(arg => {
                        if (arg.name === props.argName) {
                            const index = props.operationArrayArguments.findIndex(i => i.id === arg.id);
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
                                        label={props.argName}
                                        onChange={props.onChangeFunc(arg.id, props.argName)}
                                        value={props.operationArrayArguments[index].value}
                                        type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => props.addFieldFunc(arg.name)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton disabled={props.operationArrayArguments.length === 1} onClick={() => props.removeFieldFunc(arg.id)}>
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
                    props.operationArrayArguments.map(arg => {
                        if (arg.name === props.argName) {
                            const index = props.operationArrayArguments.findIndex(i => i.id === arg.id);
                            return (
                                <>
                                    <TextField
                                        required={!props.optional}
                                        autoFocus
                                        margin="dense"
                                        key={arg.id}
                                        id={arg.id}
                                        label={props.argName}
                                        onChange={props.onChangeFunc(arg.id, props.argName)}
                                        value={props.operationArrayArguments[index].value}
                                        type={FieldType[arrayElementsType as keyof typeof FieldType]}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => props.addFieldFunc(arg.name)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton disabled={props.operationArrayArguments.length === 1} onClick={() => props.removeFieldFunc(arg.id)}>
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

export default SignalProcessorListInput;