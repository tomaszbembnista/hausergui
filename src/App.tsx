import React from 'react';
import { Grommet, Card, CardHeader, CardBody } from 'grommet';
import { SpaceResourceApi } from "./app/srvapi";
import { SpaceDTO } from "./app/srvapi/models";
import { AxiosResponse } from "axios";

function App() {
  let spa : SpaceResourceApi = new SpaceResourceApi();

  spa.getSpacesUsingGET().then(spaces => {
    
  })
  
  return (
    <Grommet>
      <Card width="small" background="light-1">
        <CardHeader pad="medium">Spaces</CardHeader>
        <CardBody>

        </CardBody>
      </Card>
    </Grommet>
  );
}

export default App;
