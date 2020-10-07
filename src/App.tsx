import React from 'react';
import { Grommet, Card, CardHeader, CardBody } from 'grommet';
import getSpaces from './app/ListSpaces';

function App() {
  getSpaces();
  
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
