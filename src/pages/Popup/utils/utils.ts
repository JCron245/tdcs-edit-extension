import copy from 'clipboard-copy';

export const findAndUpdateKey = (
	obj: any,
	toggleParentName: string,
	toggleName: string,
	newToggleValue: string | number | boolean
): any => {
	for (const property in obj) {
		// Because some of our bottom most toggles share names ( "enabled" is a common example),
		// My search is based off of the parent key of the toggle to avoid making a match on the wrong key
		if (property === toggleParentName) {
			if (obj[property][toggleName] !== undefined) {
				obj[property][toggleName] = newToggleValue;
				return true;
			}
		} else if (property === toggleName && toggleParentName === 'tdcs') {
			obj[property] = newToggleValue;
			return true;
		} else if (typeof obj[property] === 'object') {
			const recurse = findAndUpdateKey(obj[property], toggleParentName, toggleName, newToggleValue);
			if (recurse !== undefined) {
				return recurse;
			}
		}
	}
};

export const copyValue = (event: any, value?: string) => {
	if (value) {
		event.preventDefault();
		event.stopPropagation();
		copy(value);
	}
};

export const isNumeric = (str: string) => {
	if (typeof str != "string") return false // we only process strings!
	return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
