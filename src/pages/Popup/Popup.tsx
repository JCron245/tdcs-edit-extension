import React, { ReactElement, useEffect, useState } from 'react';
import './Popup.css';
import { TDCS } from './tdcs.model';
import { TDCSconfig } from './tdcsConfig.model';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

function popup() {
	chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
		const activeTab = tabs[0];
		if (activeTab?.id) {
			chrome.tabs.sendMessage(activeTab.id, { message: 'start' });
		}
	});
}

const findAndUpdateKey = (obj: any, toggleParentName: string, toggleName: string, newToggleValue: string | number | boolean): any => {
	for (const property in obj) {
		// Because some of our bottom most toggles share names ( "enabled" is a common example),
		// My search is based off of the parent key of the toggle to avoid making a match on the wrong key
		if (property === toggleParentName) {
			if (obj[property][toggleName] !== undefined) {
				obj[property][toggleName] = newToggleValue;
				return true;
			}
		} else if (property === toggleName && toggleParentName === 'tdcs') {
			obj[property] = newToggleValue;
			return true;
		} else if (typeof obj[property] === 'object') {
			const recurse = findAndUpdateKey(obj[property], toggleParentName, toggleName, newToggleValue);
			if (recurse !== undefined) {
				return recurse;
			}
		}
	}
};

export const Popup = () => {
	const [tdcs, setTdcs] = useState<TDCS>();
	const [tdcsConfig, setTdcsConfig] = useState<TDCSconfig>();
	const [tdcsFormElements, setTdcsFormElements] = useState<ReactElement>();

	useEffect(() => {
		// console.log('Sending start message!');
		// popup();
		// setTimeout(() => {
		//   console.log('sending request');
		//   request();
		// });
		chrome.storage.local.get('tdcs', function (data) {
			setTdcs(data.tdcs);
		});
		chrome.storage.local.get('tdcsConfig', function (data) {
			setTdcsConfig(data.tdcsConfig);
		});
		// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		//   console.log('POPUP Data: ', message);
		//   // sendResponse({
		//   //     data: "I am fine, thank you. How is life in the background?"
		//   // });
		// });
	}, []);

	/**
	 * For whatever reason hooks don't seem to be working as reliably in the extension space,
	 * this fires - sometimes - but not always unfortunately.
	 */
	useEffect(() => {
		if (tdcs) {
			setTdcsFormElements(buildTdcsObject(tdcs, 'tdcs', 0));
		}
	}, [tdcs]);

	const sendUpdate = (tdcsObj: any) => {
		console.log('send update!', tdcsObj);
		chrome.storage.local.set({ tdcs: tdcsObj });
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab?.id) {
				chrome.tabs.sendMessage(activeTab.id, { message: 'update' });
			}
		});
	};

	const toggleUpdate = (event: React.ChangeEvent<HTMLInputElement>, toggleName: string, toggleParentName: string) => {
		const tdcsCopy = tdcs;
		const type = event.target.type;
		let newToggleValue;
		switch (type) {
			case 'number':
				newToggleValue = Number(event.target.value);
				break;
			case 'checkbox':
				newToggleValue = event.target.checked;
				break;
			default:
				newToggleValue = event.target.value;
		}
		findAndUpdateKey(tdcsCopy, toggleParentName, toggleName, newToggleValue);
		setTdcs(tdcsCopy);
		setTdcsFormElements(buildTdcsObject(tdcs, 'tdcs', 0));
	};

	const parseType = (item: any, name: string, parentName: string, depth: number): ReactElement => {
		const itemType = typeof item;
		if (itemType === 'boolean') {
			// If we encounter a true/false toggle lets make a switch!
			return (
				<div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }} key={`${parentName}-${name}-${depth}`}>
					<label htmlFor={`${parentName}-${name}-${depth}`}>{name}</label>
					<Toggle id={`${parentName}-${name}-${depth}`} defaultChecked={item} onChange={(event) => toggleUpdate(event, name, parentName)} />
				</div>
			);
		} else if (itemType === 'object') {
			// If it's an object lets build another accordion
			return buildTdcsObject(item, name, depth + 1);
		} else if (itemType === 'string' || itemType === 'number') {
			// If it's a string or a number we can just use an input with the appropriate type
			const type = itemType === 'string' ? 'text' : 'number';
			return (
				<div className="toggle-wrap" key={`${parentName}-${name}-${depth}`}>
					<label className="toggle-wrap-label" htmlFor={`${name}-toggle`}>
						{name}
					</label>
					<input type={type} className="num-string-input" value={item} onChange={(event) => toggleUpdate(event, name, parentName)} />
				</div>
			);
		}
		return <></>;
	};

	const buildTdcsObject = (obj: any, name: string, depth: number): ReactElement => {
		const toggles = [];
		for (const property in obj) {
			if (property && obj[property] !== undefined) {
				toggles.push(parseType(obj[property], property, name, depth));
			}
		}
		if (depth === 0) {
			return <>{toggles}</>;
		} else {
			return (
				<Accordion elevation={6}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-content-${name}`} id={`panel-header-${name}`}>
						<Typography>{name}</Typography>
					</AccordionSummary>
					<AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>{toggles}</AccordionDetails>
				</Accordion>
			);
		}
	};

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<div className="header">Rock-Enroll TDCS Toggle Machine</div>
					<div className="config-info">
						<span>Client: {tdcsConfig?.clientType}</span>
						<span>App Version: {tdcsConfig?.appVersion}</span>
						<span>Device ID: {tdcsConfig?.deviceId}</span>
					</div>
				</Toolbar>
			</AppBar>
			<div className="btn-wrap">
				<Button variant="contained" color="primary" onClick={() => sendUpdate(tdcs)}>
					Save Changes To LocalStorage
				</Button>
				<Button variant="contained" color="primary">
					Refresh Page
				</Button>
			</div>
			<div className="toggle-box">{tdcsFormElements}</div>
		</div>
	);
};
