import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { TDCSconfig } from '../interfaces/tdcsConfig.model';
import './header.scss';

interface HeaderProps {
	tdcsConfig?: TDCSconfig;
}

export const Header = (props: HeaderProps) => {
	const { tdcsConfig } = props;

	return (
		<AppBar position="static">
			<Toolbar>
				<div className="header">Rock-Enroll TDCS Toggle Machine</div>
				<div className="config-info">
					<div className="config-item">
						<span>Client:</span>
						<span>{tdcsConfig?.clientType}</span>
					</div>
					<div className="config-item">
						<span>App Version:</span>
						<span>{tdcsConfig?.appVersion}</span>
					</div>
					<div className="config-item">
						<span>Device ID:</span>
						<span>{tdcsConfig?.deviceId}</span>
					</div>
				</div>
			</Toolbar>
		</AppBar>
	);
};
