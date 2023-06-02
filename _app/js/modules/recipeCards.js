import sanity from '../sanity.js';
import search from './search.js';

export default function recipeCards() {
	const recipesContainer = document.querySelector('.card');
// data
	let recipesList = [];

	async function fetchRecipeList() {
		const query = `*[_type == 'recipe'] | order(name asc) {
			_id,
			name,
			"cover": image.asset->url,
			'slug': slug.current,
			difficulty,
			time,
			rating[]
		}`;

		return await sanity.fetch(query);
	}

	async function setCurrentRecipesList() {
		recipesList = await fetchRecipeList();
	}

	/**
	 *  Gets data from sanity
	*/
	async function init() {
		await setCurrentRecipesList();
		renderRecipesCards();
		search(recipesList);
	}

	/** 
	 * Gets values from Sanity and calculates the sum of each rating.
	*/ 
	function calculateRating(ratings) {
		if(ratings!== null && ratings.length > 0) {
			const sum = ratings
			.reduce(
				(accumulator, current) => accumulator + current, 
			0);

			let averageRating = sum / ratings.length;

			if (Number.isInteger(averageRating)) {
				// If the number recieved from the database is an integer, it returns the number recieved.
				return averageRating;
			} else {
				// If the number recived from the database has decimals, it return the number with only 1 decimal.
				return averageRating.toFixed(1);
			}
		}
		return 0;
	}

	/**
	 * RenderRecipeCard is the function that runs changes in HTML. This function loops over the objects in Sanity and creates elements 
	 */ 
	function renderRecipesCards() {
		recipesList.forEach(card => {
		
			// Create HTML elements
			const recipe = document.createElement('a');
			const image = document.createElement('img');
			const name = document.createElement('p');

			const info = document.createElement('div');
			const difficulty = document.createElement('p');
			const time = document.createElement('p');

			const rating = document.createElement('div');
			const ratingImage = document.createElement('img');
			const ratingValue = document.createElement('span');
			ratingValue.innerText = calculateRating(card.rating);
			
			// Classes
			recipe.className = 'card__container';

			image.className = 'card__image';

			name.className = 'card__name';

			info.className = 'card__info';
			difficulty.className = 'card__difficulty';
			time.className = 'card__time';

			rating.className = 'card__rating';
			ratingImage.className = 'rating__image';
			ratingImage.src = `/_app/assets/svg/${Math.floor(calculateRating(card.rating))}.svg`;
			ratingValue.className = 'rating__value';

			// Inner text
			name.innerText = card?.name;
			difficulty.innerText = card?.difficulty;
			time.innerText = card?.time;
			
			// Sources
			image.src = card?.cover;
			
			// Links
			recipe.href = `/recipe/?${card.slug}`;
			
			// Append
			info.append(
				difficulty,
				time
			);

			recipe.append(
				image,
				name,
				info
			);

			rating.append(
				ratingImage,
				ratingValue
			);

			recipe.append(rating);

			recipesContainer.append(recipe);
			console.log(recipesContainer)
		});
	};

	init();
}