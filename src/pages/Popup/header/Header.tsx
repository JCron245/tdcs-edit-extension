import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { TDCSconfig } from '../interfaces/tdcsConfig.model';
import packageJson from '../../../../package.json';
import './header.scss';

interface HeaderProps {
	tdcsConfig?: TDCSconfig;
}

export const Header = (props: HeaderProps) => {
	const { tdcsConfig } = props;

	return (
		<AppBar position="static">
			<Toolbar>
				<div className="header">
					<Typography component="h1" variant="h5">
						Rock-Enroll TDCS Toggle Machine
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						{packageJson.version}
					</Typography>
				</div>
				<div className="config-info">
					<div className="config-item">
						<Typography variant="caption">Client:</Typography>
						<Typography variant="caption">{tdcsConfig?.clientType}</Typography>
					</div>
					<div className="config-item">
						<Typography variant="caption">App Version:</Typography>
						<Typography variant="caption">{tdcsConfig?.appVersion}</Typography>
					</div>
					<div className="config-item">
						<Typography variant="caption">Device ID:</Typography>
						<Typography variant="caption">{tdcsConfig?.deviceId}</Typography>
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
};
