import React from "react";
import { SpaceResourceApi, DeviceDTO } from "./srvapi";

interface DevicesProps {
    spaceId: number;
};

interface DevicesState {
    devices: DeviceDTO[];
};

class Devices extends React.Component<DevicesProps, DevicesState> {
    constructor(props: DevicesProps) {
        super(props);
        this.state = {
            devices: []
        };
    }

    componentDidMount() {
        this.getDevices(this.props.spaceId);
    }

    getDevices(spaceId: number) {
        console.log("getDevices");
        let spacesResource: SpaceResourceApi = new SpaceResourceApi();
        spacesResource.getDevicesBelongingToSpaceUsingGET({ id: spaceId }).then(values => {
            this.setState({ devices: values });
        })
    }

    render() {
        return (
            <>
                <ul>
                    {
                        this.state.devices.map(device => (
                            <li>
                                {device.name}
                            </li>
                        ))
                    }
                </ul>
            </>
        )
    }
}

export default Devices;