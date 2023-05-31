export function readUrl() {
	const allUrl = window.location.href;
	/**
	 * This function will send page to recipe side if is defined, if not will be undefined
	 */
	if(allUrl.includes('recipe')) {
		const slug = window.location.search;
		return slug.slice(1);
	}
	return undefined;
}