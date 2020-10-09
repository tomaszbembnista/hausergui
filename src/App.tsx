import React from 'react';
import ListSpaces from './app/ListSpaces';
import Box from '@material-ui/core/Box';

function App() {
  return (
      <div>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <Box display="flex" justifyContent="center">
            <Box alignSelf="center">
              <ListSpaces parentSpaceId={-1}></ListSpaces>
            </Box>
          </Box>
      </div>
  );
}

export default App;
