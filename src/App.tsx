import React from 'react';
import Spaces from './app/Spaces';
import { Box, Card } from '@material-ui/core/';

function App() {
	return (
		<Box display="flex" justifyContent="center" alignItems="center">
			<Box>
				<Card>
					<Spaces parentSpaceId={-1} />
				</Card>
			</Box>
		</Box>
	);
}

export default App;
