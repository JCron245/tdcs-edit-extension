import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Button, createTheme, CssBaseline, ThemeProvider, Typography } from '@material-ui/core';
import { Popup } from './Popup';
import './index.scss';

const App = () => {
	const [resetFlag, setResetFlag] = useState(false);
	const [injectedFlag, setInjectedFlag] = useState(false);
	const [isSpectrumWebsite, setIsSpectrumWebsite] = useState(false);
	const [theme, setTheme] = useState<any>();

	useEffect(() => {
		setTheme(() =>
			createTheme({
				palette: {
					type: 'dark',
				},
			})
		);

		chrome.runtime.onMessage.addListener((message) => {
			if (message === 'reset') {
				setResetFlag(true);
			}
			if (message === 'injected') {
				setInjectedFlag(true);
			}
		});
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab.id) {
				chrome.tabs.sendMessage(activeTab.id, 'isSpectrum', (response: any) => {
					setIsSpectrumWebsite(response.isSpectrum);
				});
			}
		});
	}, []);

	useEffect(() => {
		if (resetFlag && injectedFlag) {
			setTimeout(() => {
				window.location.reload();
			});
		}
	}, [resetFlag, injectedFlag]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{!isSpectrumWebsite && (
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
					<Typography>It doesn't appear this is a spectrum website!</Typography>
					<Typography className="sub-text">
						If your sure it is, try
						<Button variant="text" onClick={() => window.location.reload()} style={{ textDecoration: 'underline' }}>
							reloading
						</Button>
					</Typography>
				</div>
			)}

			{isSpectrumWebsite && <Popup />}
		</ThemeProvider>
	);
};

render(<App />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
