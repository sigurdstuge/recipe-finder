import sanity from '../sanity.js';

export default function recipeCards() {
	const recipesContainer = document.querySelector('.card')

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
	 * Gets data from sanity
	 */
	async function init() {
		await setCurrentRecipesList();
		renderRecipesCards();
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
			return Math.ceil(sum / ratings.length);
		}
		return 0;
	}

	/** 
	 * RenderRecipeCard is the function that runs changes in HTML. This function loops over the objects in Sanity and creates elements
	*/
	function renderRecipesCards() {
		recipesList.forEach(card => {
			//console.log(card.name)
		

		/** 
		*	create elements
		*	html elements
		*/
		const recipe = document.createElement('a');
		const image = document.createElement('img');
		const name = document.createElement('p');

		const info = document.createElement('div');
		const difficulty = document.createElement('p');
		const time = document.createElement('p');

		const rating = document.createElement('div');
		const ratingImage = document.createElement('img');
		const ratingValue = document.createElement('span');
		ratingValue.innerText = calculateRating(card.rating)
		/**
		 * class
		 * css classes
		 */
		recipe.className = 'card__container'

		image.className = 'card__image'

		name.className = 'card__name'

		info.className = 'card__info'
		difficulty.className = 'card__difficulty'
		time.className = 'card__time'

		rating.className = 'card__rating'
		ratingImage.className = 'rating__image'
		ratingImage.src = 'https://www.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej.jpg'
		ratingValue.className = 'rating__value'

		// inner text
		name.innerText = card?.name;
		difficulty.innerText = card?.difficulty
		time.innerText = card?.time

		// sources
		image.src = card?.cover;

		// links
		recipe.href = `/recipe/?${card.slug}`;

		/**
		 * append
		 */
		 recipe.append(image) 
		 recipe.append(name)

		 info.append(difficulty)
		 info.append(time)
		 recipe.append(info)

		 rating.append(ratingImage)
		 rating.append(ratingValue)
		 recipe.append(rating)






		/*
			<a class="card__container" href="#">
				<img class="card__image" src="https://trinesmatblogg.no/app/uploads/2021/06/IMG_9816.jpg" alt="Bruschetta">
				<p class="card__name">Bruschetta</p>
				<div class="card__info">
					<p class="card__difficulty">difficulty</p>
					<p class="card__time">time</p>
				</div>
				<div class="card__rating">
					<img class="rating__image" src="https://www.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej.jpg" alt="rating">
					<span id="rating-value">3</span>
				</div>
			</a>
		*/

		recipesContainer.appendChild(recipe);

	})
		
	}
 	init();
}