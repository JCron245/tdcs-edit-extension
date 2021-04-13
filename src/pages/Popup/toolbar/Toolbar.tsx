import React from 'react';
import { Button, Paper } from '@material-ui/core';
import { TDCS } from '../interfaces/tdcs.model';
import './toolbar.scss';

const sendUpdate = (tdcs: any) => {
	chrome.storage.local.set({ tdcs });
	sendMsg('update');
};

const sendMsg = (message: string) => {
	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		const activeTab = tabs[0];
		if (activeTab?.id) {
			chrome.tabs.sendMessage(activeTab.id, { message });
		}
	});
};

interface ExtensionToolbarProps {
	tdcs?: TDCS;
}

export const ExtensionToolbar = (props: ExtensionToolbarProps) => {
	const { tdcs } = props;

	return (
		<Paper className="btn-wrap">
			<Button variant="contained" color="primary" onClick={() => sendUpdate(tdcs)}>
				Save Changes To LocalStorage
			</Button>
			<Button variant="contained" color="primary" onClick={() => sendMsg('refresh')}>
				Refresh Page
			</Button>
			<Button variant="contained" color="primary" onClick={() => sendMsg('reset')}>
				Reset TDCS
			</Button>
		</Paper>
	);
};
