const TDCS_KEY = 'tdcs.data';
const TDCS_CONFIG_KEY = 'tdcs.config';

const init = () => {
	console.info('[INFO] TDCS Toggle Machine Content Script Injected');
	readAndStoreTDCS();

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch (request.message) {
			case 'opened':
				/**
				 * Save feature flags to chrome.storage.local
				 */
				const tdcs = JSON.parse(window.localStorage.getItem(TDCS_KEY))?.config?.featureFlag;
				chrome.storage.local.set({ tdcs });

				/**
				 * Save tdcs config data to chrome.storage.local
				 */
				const tdcsConfig = JSON.parse(window.localStorage.getItem(TDCS_CONFIG_KEY));
				chrome.storage.local.set({ tdcsConfig });
				if (window.location.href.includes('spectrum')) {
					sendResponse({ tdcsConfig, tdcs });
				}
				break;
			case 'update':
				updateTDCS();
				break;
			case 'refresh':
				refreshPage();
				break;
			case 'reset':
				resetTdcs();
				break;
			default:
			// nothing yet
		}
	});
};

const readAndStoreTDCS = () => {
	/**
	 * Save feature flags to chrome.storage.local
	 */
	const tdcs = JSON.parse(window.localStorage.getItem(TDCS_KEY))?.config?.featureFlag;
	chrome.storage.local.set({ tdcs });

	/**
	 * Save tdcs config data to chrome.storage.local
	 */
	const tdcsConfig = JSON.parse(window.localStorage.getItem(TDCS_CONFIG_KEY));
	chrome.storage.local.set({ tdcsConfig });
};

const updateTDCS = () => {
	let tdcs = JSON.parse(window.localStorage.getItem(TDCS_KEY));
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
	window.localStorage.setItem(TDCS_KEY, null);
	window.location.reload();
};

init();
