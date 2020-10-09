import React from 'react';
import ListSpaces from './app/ListSpaces';
import Box from '@material-ui/core/Box';

function App() {
  return (
	<Box display="flex" justifyContent="center" alignItems="center">
		<Box>
			<ListSpaces parentSpaceId={-1}></ListSpaces>
		</Box>
	</Box>
  );
}

export default App;
