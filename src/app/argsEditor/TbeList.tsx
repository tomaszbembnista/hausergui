import React from "react";
import {
    withStyles, TextField, IconButton, Typography
} from "@material-ui/core";
import styles from "../Styles";
import TbeInput, { TbeInputProps, TbeInputState, TbeInputModel } from "./TbeInput"
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ProcessorOperationArgumentDesc, ProcessorOperationArgumentDescTypeEnum } from "../srvapi";
import { v4 as uuidv4 } from 'uuid';

interface TbeListState {
    elements: TbeInputModel[]
}

class TbeList extends React.Component<TbeInputProps, TbeListState> {
    constructor(props: TbeInputProps) {
        super(props);
        this.state = {
            elements: []
        };
    }

    private addNewElement(): void {
        var elementToAdd: TbeInputModel = this.createSimpleModelFromListModel(this.props.model);
        this.setState((prevState, props) => ({
            elements: prevState.elements.concat(elementToAdd)
        }))
    }

    private removeElement(element: TbeInputModel): void {
        var index = this.state.elements.indexOf(element);
        var elementsCopy = [...this.state.elements];
        var index = elementsCopy.indexOf(element);
        console.log("Index of element to remove: " + index);
        console.log("Element to remove value: " + element.modelValue);
        elementsCopy.splice(index, 1);
        this.setState({ elements: elementsCopy });
    }


    private createSimpleModelFromListModel(listModel: TbeInputModel): TbeInputModel {
        var operationArgDesc: ProcessorOperationArgumentDesc = { ...listModel.operationDesc };
        operationArgDesc.type = ProcessorOperationArgumentDescTypeEnum.INT; // to change
        var operationArg: { name: string, value: string } = { name: operationArgDesc.name as string, value: "" };
        var result = new TbeInputModel(operationArgDesc, operationArg, this.props.model.onChangeFunction);
        return result;
    }

    render() {
        return (
            <div>
                <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
                    <Typography>List of {this.props.model.operationDesc.name}</Typography>
                    <IconButton onClick={() => this.addNewElement()}>
                        <AddIcon />
                    </IconButton>
                </div>
                {
                    this.state.elements.map(elem => (
                        <div style={{ flexDirection: "row", display: "flex", alignItems: "flex-end" }} key={`div${uuidv4()}`}>
                            <TbeInput model={elem}> </TbeInput>
                            <IconButton onClick={() => this.removeElement(elem)}>
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    ))
                }

            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(TbeList);