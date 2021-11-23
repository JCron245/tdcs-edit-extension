const TDCS_KEY = 'tdcs.data';
const TDCS_CONFIG_KEY = 'tdcs.config';

const init = () => {
	const isSpectrum = window.location.href.includes('spectrum.net');
	console.info('[INFO] TDCS Toggle Machine Content Script Injected');
	chrome.runtime.sendMessage('injected');
	readAndStoreTDCS();

	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		switch (message) {
			case 'ready':
				if (window.location.href.includes('spectrum')) {
					chrome.storage.local.get(['tdcsConfig', 'tdcs', 'timestamp'], (data) => {
						const { tdcs, tdcsConfig, timestamp } = data;
						sendResponse({ tdcsConfig, tdcs, timestamp });
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
