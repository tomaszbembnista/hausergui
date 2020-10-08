import React from 'react';
import { Grommet, Card, CardHeader, CardBody } from 'grommet';
import { SpaceResourceApi } from "./app/srvapi";
import { SpaceDTO } from "./app/srvapi/models";

function App() {
  let spacesResource: SpaceResourceApi = new SpaceResourceApi();

  var spaces: SpaceDTO[] = [];

  spacesResource.getSpacesUsingGET().then(spacesResult => {
    spaces = spacesResult.data;
    console.log("Spaces got! Count: " + spaces.length);
  })

  return (
    <Grommet>
      <Card width="small" background="light-1">
        <CardHeader pad="medium">Spaces</CardHeader>
        <CardBody>
          {spaces.map(space => (
            <div key={space.id}>id: {space.id}, name: {space.name}</div>
          ))}
        </CardBody>
      </Card>
    </Grommet>
  );
}

export default App;
