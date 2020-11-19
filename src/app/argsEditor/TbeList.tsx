import React from "react";
import {
    withStyles, TextField, IconButton, Typography
} from "@material-ui/core";
import styles from "../Styles";
import TbeInput, { TbeInputProps, TbeInputState, TbeInputModel } from "./TbeInput"
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { ProcessorOperationArgument, ProcessorOperationArgumentDesc, ProcessorOperationArgumentDescTypeEnum } from "../srvapi";


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
    //sfsdf

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
        operationArgDesc.type = ProcessorOperationArgumentDescTypeEnum.INT;
        var operationArg: ProcessorOperationArgument = {};
        var result = new TbeInputModel(operationArgDesc, operationArg);
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
                        <div style={{ flexDirection: "row", display: "flex", alignItems: "flex-end" }}>
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