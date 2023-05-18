export default function search(recipes) {
	const recipeList = recipes;

	const searchField = document.querySelector('.header__search-field')

	searchField.addEventListener('input', handleSearchFieldInput);

	function handleSearchFieldInput () {
		const searchValue = getSearchInputValue()
		sortProductsBySearch(searchValue)
	}
	
	function sortProductsBySearch(search) {
		const recipeNodeList = document.querySelectorAll('.card__container');
		for (const [index, recipe] of recipeNodeList.entries()) {
			recipe.classList.add('card__container--hidden')

			if (recipeList[index].name.toLowerCase().includes(search.toLowerCase())) {
				recipe.classList.remove('card__container--hidden')
			}
		}
	}
	
	function getSearchInputValue() {
		const searchValue = searchField.ariaValueMax;

		return searchValue;
	}
}