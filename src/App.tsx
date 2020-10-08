import React from 'react';
import { Grommet, Card, CardHeader, CardBody } from 'grommet';
import ListSpaces from './app/ListSpaces';

function App() {
  return (
    <Grommet>
      <Card width="small" background="light-1">
        <CardHeader pad="medium">Spaces</CardHeader>
        <CardBody>
          <ListSpaces prop={-1}></ListSpaces>
        </CardBody>
      </Card>
    </Grommet>
  );
}

export default App;
