import React, { useMemo } from 'react';
import { render } from 'react-dom';

import { Popup } from './Popup';
import './index.css';
import { createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';

// const theme = createMuiTheme({
// 	palette: {
// 		type: 'dark',
// 	},
// });

// render(
// 	<ThemeProvider theme={theme}>
// 		<CssBaseline />
// 		<Popup />
// 	</ThemeProvider>,
// 	window.document.querySelector('#app-container')
// );

const App = () => {
	const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersLightMode ? 'light' : 'dark',
				},
			}),
		[prefersLightMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Popup />
		</ThemeProvider>
	);
};

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
