import React from "react";
import { ProcessorOperationDesc, SignalProcessorResourceApi } from "./srvapi";

interface SignalProcessorOperationsProps {
    signalProcessorId: number;
}

interface SignalProcessorOperationsState {
    operations: ProcessorOperationDesc[];
}

class SignalProcessorOperations extends React.Component<SignalProcessorOperationsProps, SignalProcessorOperationsState> {
    constructor(props: SignalProcessorOperationsProps) {
        super(props);
        this.state = {
            operations: []
        };
    }

    componentDidMount() {
        let signalProcessorApi = new SignalProcessorResourceApi();
        signalProcessorApi.getSignalProcessorOperationsUsingGET({ id: this.props.signalProcessorId }).then((values) => {
            this.setState({ operations: values });
        })
    }

    render() {
        return (
            <>
                {
                    this.state.operations.map(operation => (
                        <li key={operation.name}>{operation.name}</li>
                    ))
                }
            </>
        )
    }
}

export default SignalProcessorOperations;