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
	const [tdcs, setTdcs] = useState<TDCS>();
	const [tdcsConfig, setTdcsConfig] = useState<TDCSconfig>();
	const [tdcsFormElements, setTdcsFormElements] = useState<ReactElement>();

	useEffect(() => {
		chrome.storage.local.get('tdcs', function (data) {
			setTdcs(data.tdcs);
		});
		chrome.storage.local.get('tdcsConfig', function (data) {
			setTdcsConfig(data.tdcsConfig);
		});
	}, []);

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
		setTdcsFormElements(buildTdcsObject(tdcsCopy, 'tdcs', 0));
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
							titleAccess={`Click me to copy '${name}' to your clipboard!`}
							style={{ cursor: 'pointer', fontSize: '1rem', margin: '0 1rem' }}
							onClick={(event) => copyValue(event, name)}
						/>
					</label>
					{itemType !== 'boolean' && (
						<input type={type} className="num-string-input" value={item} onChange={(event) => toggleUpdate(event, name, parentName)} />
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
				<Accordion elevation={6}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-content-${name}`} id={`panel-header-${name}`}>
						<Typography>{name}</Typography>
					</AccordionSummary>
					<AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>{toggles}</AccordionDetails>
				</Accordion>
			);
		}
	};

	/**
	 * For whatever reason hooks don't seem to be working as reliably in the extension space,
	 * this fires - sometimes - but not always unfortunately.
	 */
	useEffect(() => {
		if (tdcs) {
			setTdcsFormElements(buildTdcsObject(tdcs, 'tdcs', 0));
		}
	}, [tdcs]);

	return (
		<div className="app">
			<Header tdcsConfig={tdcsConfig} />
			<ExtensionToolbar tdcs={tdcs} />
			<div className="toggle-box">{tdcsFormElements}</div>
		</div>
	);
};
