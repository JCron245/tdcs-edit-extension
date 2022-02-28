const TDCS_KEY = 'tdcs.data';
const TDCS_CONFIG_KEY = 'tdcs.config';

let _mockuser = '';
let _portal = '';

const spectrumDomains = [
	'spectrum.com',
	'spectrum.net',
	'spectrumbusiness.net',
	'spectrumcommunitysolutions.com',
	'spectrumcommunitysolutions.net',
	'spectrumflow.net'
];

const checkIfSpectrumDomain = () => {
	let hostName = window.location.hostname;
	for (let i = 0; i < spectrumDomains.length; i++) {
		if (hostName.endsWith(spectrumDomains[i])) return true;
		continue;
	}
	return false;
}

const watchForCookieChange = () => {
	(window as any)['cookieStore'].addEventListener('change', (event: any) => {
		let changed = false;
		event.changed.forEach((cookie: any) => {
			if (cookie.name === '_mockuser' && cookie.value !== _mockuser) {
				_mockuser = cookie.value;
				changed = true;
			}
			if (cookie.name === '_portal' && cookie.value !== _portal) {
				_portal = cookie.value;
				changed = true;
			}
			if (changed) {
				chrome.runtime.sendMessage('cookie update');
			}
		})
	})
}

const getCookie = (name: string) => {
	return document.cookie?.split('; ')?.find(row => row.startsWith(`${name}=`))?.split('=')[1] || ''
}

const init = () => {
	const isSpectrum = checkIfSpectrumDomain();
	_mockuser = getCookie('_mockuser');
	_portal = getCookie('_portal');
	chrome.runtime.sendMessage('injected');
	console.info('[INFO] TDCS Toggle Machine Content Script Injected');
	readAndStoreTDCS();
	watchForCookieChange();

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		switch (message) {
			case 'ready':
				if (isSpectrum) {
					chrome.storage.local.get(['tdcsConfig', 'tdcs', 'timestamp'], (data) => {
						const { tdcs, tdcsConfig, timestamp, } = data;
						sendResponse({ tdcsConfig, tdcs, timestamp, _mockuser, _portal });
					});
				}
				return true;
			case 'update':
				updateTDCS();
				return true;
			case 'refresh':
				refreshPage();
				return true;
			case 'isSpectrum':
				sendResponse({ isSpectrum });
				return true;
			case 'reset':
				resetTdcs();
				chrome.runtime.sendMessage('reset');
				return true;
			case 'cookies':
				sendResponse({ _mockuser, _portal });
				return true;
			default:
				return true;
		}
	});
};

const readAndStoreTDCS = () => {
	const tdcsData = window.localStorage.getItem(TDCS_KEY);
	const tdcsConfigData = window.localStorage.getItem(TDCS_CONFIG_KEY);

	if (!tdcsData || !tdcsConfigData) {
		return;
	}
	/**
	 * Save feature flags to chrome.storage.local
	 */
	const tdcs = JSON.parse(tdcsData)?.config?.featureFlag;
	chrome.storage.local.set({ tdcs });

	/**
	 * Save tdcs config data to chrome.storage.local
	 */
	const tdcsConfig = JSON.parse(tdcsConfigData);
	chrome.storage.local.set({ tdcsConfig });

	/**
	 * Save timestamp to chrome.storage.local
	 */
	const timestamp = new Date().getTime();
	chrome.storage.local.set({ timestamp });
};

const updateTDCS = () => {
	const tdcsData = window.localStorage.getItem(TDCS_KEY);

	if (!tdcsData) {
		return;
	}
	let tdcs = JSON.parse(tdcsData);
	chrome.storage.local.get('tdcs', (data) => {
		tdcs.config.featureFlag = { ...data.tdcs };
		window.localStorage.setItem(TDCS_KEY, JSON.stringify(tdcs));
	});
};

const refreshPage = () => {
	window.location.reload();
};

/**
 * Set the TDCS object to null and refresh the browser,
 * should trigger a new call to tdcs/inform for a new copy
 * of the data
 */
const resetTdcs = () => {
	window.localStorage.setItem(TDCS_CONFIG_KEY, '');
	window.localStorage.setItem(TDCS_KEY, '');
	window.location.reload();
};

init();
