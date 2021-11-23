import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { copyValue } from '../utils/utils';
import { TypeHint } from '../typeHint/TypeHint';
import { ToggleTypes } from '../objectAccordion/ObjectAccordion';
import './TitleElements.scss';

export type ToggleTitleProps = {
	name: string;
	type: ToggleTypes;
};

export interface LabelTitleProps extends ToggleTitleProps {
	htmlFor: string;
}

export const ToggleTitle = ({ name, type }: ToggleTitleProps): ReactElement => {
	return (
		<Typography className="toggle-title">
			{name}
			<FileCopyIcon className="copy-icon" titleAccess={`Click to copy: '${name}'`} onClick={(event) => copyValue(event, name)} />
			<span className="type-hint" style={{ margin: '0' }}>
				<TypeHint type={type} />
			</span>
		</Typography>
	);
};

export const LabelTitle = ({ name, type, htmlFor }: LabelTitleProps): ReactElement => {
	return (
		<label className="toggle-title toggle-wrap-label" htmlFor={htmlFor}>
			{name}
			<FileCopyIcon className="copy-icon" titleAccess={`Click to copy: '${name}'`} onClick={(event) => copyValue(event, name)} />
			<span className="type-hint" style={{ margin: '0' }}>
				<TypeHint type={type} />
			</span>
		</label>
	);
};
