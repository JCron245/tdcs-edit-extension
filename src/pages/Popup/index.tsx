import React, { useMemo } from 'react';
import { render } from 'react-dom';
import { createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { Popup } from './Popup';
import './index.scss';

const App = () => {
	/**
	 * Give the people the theme they desire!
	 */
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
