import React, { ReactElement, useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Toggle from 'react-toggle';
import { ExtensionToolbar } from './toolbar/Toolbar';
import { Header } from './header/Header';
import { TDCS } from './interfaces/tdcs.model';
import { TDCSconfig } from './interfaces/tdcsConfig.model';
import { copyValue, findAndUpdateKey } from './utils/utils';
import './popup.scss';
import 'react-toggle/style.css';

export const Popup = () => {
	const [isSpectrumWebsite, setIsSpectrumWebsite] = useState<boolean>(false);
	const [tdcs, setTdcs] = useState<TDCS>();
	const [tdcsConfig, setTdcsConfig] = useState<TDCSconfig>();
	const [tdcsFormElements, setTdcsFormElements] = useState<ReactElement>();

	useEffect(() => {
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			var activeTab = tabs[0];
			if (activeTab.id) {
				chrome.tabs.sendMessage(activeTab.id, { message: 'opened' }, (response: any) => {
					setIsSpectrumWebsite(!!response);
					if (!tdcs || !tdcsConfig || tdcsConfig.clientType !== response.tdcsConfig.clientType) {
						setTdcs(response.tdcs);
						setTdcsConfig(response.tdcsConfig);
					}
				});
			}
		});
	}, []);

	useEffect(() => {
		if (tdcs) {
			setTdcsFormElements(buildTdcsObject(tdcs, 'tdcs', 0));
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
		setTdcs(JSON.parse(JSON.stringify(tdcsCopy)));
	};

	const parseType = (item: any, name: string, parentName: string, depth: number): ReactElement => {
		const itemType = typeof item;
		const type = itemType === 'string' ? 'text' : 'number';

		if (itemType === 'object') {
			// If it's an object lets build another accordion
			return buildTdcsObject(item, name, depth + 1);
		}

		if (itemType === 'string' || itemType === 'number' || itemType === 'boolean') {
			// If it's a string or a number we can just use an input with the appropriate type
			return (
				<div className="toggle-wrap" key={`${parentName}-${name}-${depth}`}>
					<label className="toggle-wrap-label" htmlFor={`${parentName}-${name}-${depth}`}>
						{name}
						<FileCopyIcon
							titleAccess={`Click to copy '${name}'`}
							style={{ cursor: 'pointer', fontSize: '.95rem', margin: '0 1rem' }}
							onClick={(event) => copyValue(event, name)}
						/>
						<span className="type-hint">{itemType}</span>
					</label>
					{itemType !== 'boolean' && (
						<>
							<input type={type} className="num-string-input" value={item} onChange={(event) => toggleUpdate(event, name, parentName)} />
							<FileCopyIcon
								titleAccess={`Click to copy '${item}'`}
								style={{ cursor: 'pointer', fontSize: '.95rem', margin: '0 1rem' }}
								onClick={(event) => copyValue(event, name)}
							/>
						</>
					)}
					{itemType === 'boolean' && (
						<Toggle
							id={`${parentName}-${name}-${depth}`}
							defaultChecked={item}
							onChange={(event) => toggleUpdate(event, name, parentName)}
						/>
					)}
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
				<Accordion elevation={7} style={{ marginTop: '.25rem', marginBottom: '.25rem' }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-content-${name}`} id={`panel-header-${name}`}>
						<Typography>
							{name}
							<span className="type-hint" style={{ marginLeft: '1rem' }}>
								{Array.isArray(obj) ? 'array' : 'object'}
							</span>
						</Typography>
					</AccordionSummary>
					<AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>{toggles}</AccordionDetails>
				</Accordion>
			);
		}
	};

	return (
		<div className="app">
			{isSpectrumWebsite && (
				<>
					<Header tdcsConfig={tdcsConfig} />
					<ExtensionToolbar tdcs={tdcs} />
					<div className="toggle-box">{tdcsFormElements}</div>
				</>
			)}
			{!isSpectrumWebsite && (
				<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography>It doesn't appear this is a spectrum website!</Typography>
				</div>
			)}
		</div>
	);
};
