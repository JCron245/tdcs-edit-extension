let tdcsObject = JSON.parse(window.localStorage.getItem('tdcs.data'))?.config?.featureFlag;
delete tdcsObject.changeService;

let tdcsConfig = JSON.parse(window.localStorage.getItem('tdcs.config'));

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log('msg');
	if (request.message === 'update') {
		let tdcs = JSON.parse(window.localStorage.getItem('tdcs.data'));
		chrome.storage.local.get('tdcs', function (data) {
			tdcs.config.featureFlag = { ...data.tdcs };
			console.log('the data: ', tdcs);
			window.localStorage.setItem('tdcs.data', JSON.stringify(tdcs));
		});
	}
	if (request.message === 'request') {
		console.log('SENDING REQUEST');
		chrome.runtime.sendMessage(
			{
				data: 'test',
			},
			function (response) {
				console.dir(response);
			}
		);
	}
});

chrome.storage.local.set({ tdcs: tdcsObject });
chrome.storage.local.set({ tdcsConfig });
