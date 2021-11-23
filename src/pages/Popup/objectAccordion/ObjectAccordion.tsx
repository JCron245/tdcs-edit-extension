import React, { ReactElement } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './ObjectAccordion.scss';
import { ToggleTitle } from '../titleElements/TitleElements';

export type ToggleTypes = 'array' | 'object' | 'string' | 'boolean' | 'number';

export type ObjectAccordionProps = {
	name: string;
	type: ToggleTypes;
	toggles: any[];
};

export const ObjectAccordion = ({ name, toggles, type }: ObjectAccordionProps): ReactElement => {
	return (
		<Accordion elevation={7} className="accordion">
			<AccordionSummary
				classes={{ content: 'content-summary' }}
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel-content-${name}`}
				id={`panel-header-${name}`}>
				<ToggleTitle name={name} type={type} />
			</AccordionSummary>
			<AccordionDetails className="accordion-details">{toggles}</AccordionDetails>
		</Accordion>
	);
};
