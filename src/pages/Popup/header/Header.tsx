import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { TDCSconfig } from '../interfaces/tdcsConfig.model';
import packageJson from '../../../../package.json';
import './header.scss';

interface HeaderProps {
	tdcsConfig: TDCSconfig;
	localStorageTS?: string;
	cookies?: { _mockuser: string; _portal: string };
}

export const Header = (props: HeaderProps) => {
	const { tdcsConfig, localStorageTS, cookies } = props;

	return (
		<AppBar position="static">
			<Toolbar>
				<div className="header">
					<Typography component="h1" variant="h5">
						Rock-Enroll TDCS Toggle Machine
					</Typography>
					<Typography variant="caption" display="block" gutterBottom>
						Version: {packageJson.version}
					</Typography>
					<Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }} gutterBottom>
						<span>{localStorageTS && new Date(localStorageTS).toLocaleString()}</span>
						<HelpOutline
							titleAccess="Timestamp from when this extension last received TDCS data from local storage."
							style={{ marginLeft: '.25rem', marginBottom: '.15rem', fontSize: '1rem' }}
						/>
					</Typography>
					<Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }} gutterBottom>
						<span>{new Date(tdcsConfig.timestamp).toLocaleString()}</span>
						<HelpOutline
							titleAccess="Timestamp from TDCS Config Object"
							style={{ marginLeft: '.25rem', marginBottom: '.15rem', fontSize: '1rem' }}
						/>
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
					{cookies?._portal && (
						<div className="config-item">
							<Typography variant="caption">_portal:</Typography>
							<Typography variant="caption">{cookies?._portal}</Typography>
						</div>
					)}
					{cookies?._mockuser && (
						<div className="config-item">
							<Typography variant="caption">_mockuser:</Typography>
							<Typography variant="caption">{cookies?._mockuser}</Typography>
						</div>
					)}
				</div>
			</Toolbar>
		</AppBar>
	);
};
