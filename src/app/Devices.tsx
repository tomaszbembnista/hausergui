import React from "react";
import { SpaceResourceApi, DeviceDTO } from "./srvapi";
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
});

interface DevicesProps extends WithStyles<typeof styles> {
    spaceId: number;
};

interface DevicesState {
    devices: DeviceDTO[];
};

class Devices extends React.Component<DevicesProps, DevicesState> {
    constructor(props: DevicesProps) {
        super(props);
        this.state = { devices: [] };
    }

    componentDidMount() {
        this.getDevices(this.props.spaceId);
    }

    componentDidUpdate(prevProps: DevicesProps) {
        if (prevProps.spaceId !== this.props.spaceId) {
            this.getDevices(this.props.spaceId);
        }
    }

    getDevices(spaceId: number) {
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();
        spacesResource.getDevicesBelongingToSpaceUsingGET({ id: spaceId }).then(values => {
            this.setState({ devices: values });
        })
    }

    render() {
        return (
            <>
                {
                    this.state.devices.map(device => (
                        <p key={device.id}>
                            {device.slug}
                        </p>
                    ))
                }
            </>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Devices);