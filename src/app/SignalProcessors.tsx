import React from "react";
import { ProcessorOperationDesc, SignalProcessorDTO, SpaceResourceApi, SignalProcessorResourceApi } from "./srvapi";
import { Accordion, AccordionDetails, AccordionSummary, Typography, WithStyles, withStyles } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "./Styles";

interface SignalProcessorsProps extends WithStyles<typeof styles> {
    spaceId: number;
}

interface SignalProcessorsState {
    signalProcessors: SignalProcessorDTO[];
    availableOperationsByClassname: Map<String, ProcessorOperationDesc[]>;
    accordionExpanded: boolean;
}

class SignalProcessors extends React.Component<SignalProcessorsProps, SignalProcessorsState> {
    constructor(props: SignalProcessorsProps) {
        super(props);
        this.state = {
            signalProcessors: [],
            availableOperationsByClassname: new Map(),
            accordionExpanded: false
        };
    }

    componentDidMount() {
        this.getSignalProcessorsWithOperations(this.props.spaceId);
    }

    getSignalProcessorsWithOperations(spaceId: number) {
        let spaceResource = new SpaceResourceApi();
        let signalProcessorsData: Map<String, number> = new Map();
        let signalProcessorsOperations: Map<String, ProcessorOperationDesc[]> = new Map();

        spaceResource.getSignalProcessorsBelongingToSpaceUsingGET({ id: spaceId }).then((values) => {
            this.setState({ signalProcessors: values });
        }).then(() => {
            for (let signalProcessor of this.state.signalProcessors) {
                if (!signalProcessorsData.has(signalProcessor.className as String)) {
                    signalProcessorsData.set(signalProcessor.className as String, signalProcessor.id as number);
                }
            }

            let signalProcessorResource = new SignalProcessorResourceApi();
            for (let mapKey of Array.from(signalProcessorsData.keys())) {
                let key: number = signalProcessorsData.get(mapKey) as number;
                signalProcessorResource.getSignalProcessorOperationsUsingGET({ id: key }).then((values) => {
                    signalProcessorsOperations.set(mapKey, values);
                }).then(() => {
                    this.setState({ availableOperationsByClassname: signalProcessorsOperations })
                })
            }
        });
    }

    expandAccordion = () => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        if (this.state.signalProcessors.length > 0) {
            if (isExpanded) {
                this.setState({ accordionExpanded: true })
            }
            else {
                this.setState({ accordionExpanded: false })
            }
        }
    }

    render() {
        return (
            <>
                <Accordion expanded={this.state.accordionExpanded} onChange={this.expandAccordion()}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={this.props.classes.accordionHeading}>Processors</Typography>
                        <Typography className={this.props.classes.accordionSecondaryHeading}>{this.state.signalProcessors.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {
                                this.state.signalProcessors.map(signalProcessor => (
                                    <li key={signalProcessor.id}>
                                        {signalProcessor.name}
                                        <ul>
                                            {
                                                typeof this.state.availableOperationsByClassname.get(signalProcessor.className as string) != "undefined" &&
                                                this.state.availableOperationsByClassname.get(signalProcessor.className as string)!.map(option => (
                                                    <li key={option.name}>{option.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(SignalProcessors);