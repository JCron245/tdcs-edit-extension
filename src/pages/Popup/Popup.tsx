/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toggle/style.css';
import { ExtensionToolbar } from './toolbar/Toolbar';
import { Header } from './header/Header';
import { TDCS } from './interfaces/tdcs.model';
import { TDCSconfig } from './interfaces/tdcsConfig.model';
import { findAndUpdateKey } from './utils/utils';
import './popup.scss';
import { buildTdcsObject } from './buildTdcsView/BuildTdcsView';

export const Popup = () => {
	const [tdcsFormElements, setTdcsFormElements] = useState<ReactElement>();
	const [tdcs, setTdcs] = useState<TDCS>();
	const [tdcsConfig, setTdcsConfig] = useState<TDCSconfig>();
	const [timestamp, setTimestamp] = useState<string>();

	useEffect(() => {
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			const activeTab = tabs[0];
			if (activeTab.id) {
				chrome.tabs.sendMessage(activeTab.id, 'ready', (response: any) => {
					setTdcs(response.tdcs);
					setTdcsConfig(response.tdcsConfig);
					setTimestamp(response.timestamp);
				});
			}
		});
	}, []);

	useEffect(() => {
		if (tdcs) {
			setTdcsFormElements(buildTdcsObject(tdcs, 'tdcs', 0, toggleUpdate));
		}
	}, [tdcs]);

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
	};

	return (
		<div className="app">
			<Header tdcsConfig={tdcsConfig} localStorageTS={timestamp} configTS={tdcsConfig?.timestamp} />
			<ExtensionToolbar tdcs={tdcs} />
			<div className="toggle-box">{tdcsFormElements}</div>
		</div>
	);
};
