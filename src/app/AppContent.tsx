import React from "react";
import GetSpaces from "./GetSpaces";
import GetDevices from "./GetDevices";
import { Card } from "@material-ui/core";


export default class AppContent extends React.Component<AppContentProps, AppContentState>{
    constructor(props: AppContentProps) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <Card>
                <GetSpaces parentSpaceId={this.props.parentSpaceId} />
            </Card>
        )
    }
}

interface AppContentProps {
    parentSpaceId: number;
}

interface AppContentState {
}