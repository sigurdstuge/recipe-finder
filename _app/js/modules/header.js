import search from "./search.js";

export default function header() {
	// data
	let isSearchOpen = false;

	// queryselector
	//Here I select HTML elements that I want to interact with javascript. The reason I have it close to the top is that I know which HTML elements that's changed by javascript. I also need to select elements before eventlisteners.
	const searchButton = document.querySelector('.header__search-button');
	const searchField = document.querySelector('.header__search-field');

	// eventlistener
	//  Here I listen to an event on an element, in these cases a 'click'. When that event happens, it runs a handler function.
	searchButton.addEventListener('click', handleSearchButtonClick);

	// handler
	//  Here have the handlers that runs all the methods I want to happen. That way I have ane overview of what happens in the code without looking at the methods themself.
	function handleSearchButtonClick() {
		isSearchOpen = !isSearchOpen;
 
		if (isSearchOpen=== true) {
			searchField.classList.add('header__search-field--open');
		} else {
			searchField.classList.remove('header__search-field--open');
		};
	};
};