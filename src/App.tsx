import React from 'react';
import AppContent from './app/AppContent';
import Box from '@material-ui/core/Box';

function App() {
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Box>
				<AppContent parentSpaceId={-1}></AppContent>
			</Box>
		</Box>
	);
}

export default App;
