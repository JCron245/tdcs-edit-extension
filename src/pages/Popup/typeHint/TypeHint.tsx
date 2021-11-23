import React, { ReactElement } from 'react';
import { ToggleTypes } from '../objectAccordion/ObjectAccordion';
import './TypeHint.scss';

export type TypeHintProps = {
	type: ToggleTypes;
};

export const TypeHint = ({ type }: TypeHintProps): ReactElement => {
	return <span className={`type-hint ${type}`}>{type}</span>;
};
