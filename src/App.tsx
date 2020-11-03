import React from 'react';
import Spaces from './app/Spaces';
import { Box, Card } from '@material-ui/core/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={(props) => <Spaces spaceId={-1} {...props} />} />
				<Route path="/space/:id" render={(props) => <Spaces key={Date.now()} spaceId={undefined} {...props} />} />
			</Switch>
		</Router>
	);
}

export default App;
