/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement } from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Toggle from 'react-toggle';
import { copyValue, isNumeric } from '../utils/utils';
import { LabelTitle } from '../titleElements/TitleElements';
import { ObjectAccordion, ToggleTypes } from '../objectAccordion/ObjectAccordion';

export const buildTdcsObject = (obj: any, name: string, depth: number, toggleFn: Function): ReactElement => {
	const toggles = [];
	const type = Array.isArray(obj) ? 'array' : 'object';
	const parseType = (item: any, name: string, parentName: string, depth: number): ReactElement => {
		const itemType: ToggleTypes = typeof item as ToggleTypes;
		if (itemType === 'object') {
			// If it's an object lets build another accordion
			return buildTdcsObject(item, name, depth + 1, toggleFn);
		} else {
			const isNameNumeric = isNumeric(name);
			const key = `${parentName}-${name}-${depth}`;
			const type = itemType === 'string' ? 'text' : 'number';
			// If it's a string or a number we can just use an input with the appropriate type
			return (
				<div className="toggle-wrap" key={key}>
					{!isNameNumeric && <LabelTitle name={name} type={itemType} htmlFor={key} />}
					{itemType !== 'boolean' && <TextToggle item={item} key={key} name={name} parentName={parentName} toggleFn={toggleFn} />}
					{itemType === 'boolean' && <BooleanToggle item={item} name={name} parentName={parentName} type={type} toggleFn={toggleFn} />}
				</div>
			);
		}
	};

	for (const property in obj) {
		if (property && obj[property] !== undefined) {
			toggles.push(parseType(obj[property], property, name, depth));
		}
	}
	if (depth === 0) {
		return <>{toggles}</>;
	} else {
		return <ObjectAccordion name={name} type={type} toggles={toggles} key={`${name}-${type}-${depth}`} />;
	}
};

const TextToggle = ({ item, name, parentName, type, toggleFn }: any) => {
	return (
		<>
			<input type={type} className="num-string-input" value={item} onChange={(event) => toggleFn(event, name, parentName)} />
			<FileCopyIcon
				titleAccess={`Click to copy '${item}'`}
				style={{ cursor: 'pointer', fontSize: '.95rem', margin: '0 1rem' }}
				onClick={(event) => copyValue(event, name)}
			/>
		</>
	);
};

const BooleanToggle = ({ item, key, name, parentName, toggleFn }: any) => {
	return <Toggle id={key} defaultChecked={item} onChange={(event) => toggleFn(event, name, parentName)} />;
};
