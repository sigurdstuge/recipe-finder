import search from "./search.js";

export default function header() {
	// data
	let isSearchOpen = false;

	// queryselector
	const searchButton = document.querySelector('.header__search-button');
	const searchField = document.querySelector('.header__search-field');

	// eventlistener
	searchButton.addEventListener('click', handleSearchButtonClick);

	// handler

	function handleSearchButtonClick() {
		isSearchOpen = !isSearchOpen;
 
		if (isSearchOpen=== true) {
			searchField.classList.add('header__search-field--open');
		} else {
			searchField.classList.remove('header__search-field--open');
		};
	};
};