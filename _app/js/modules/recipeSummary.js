import sanity from "../sanity.js";
import { readUrl } from "../util/read-url.js";

export default async function recipeSummary() {
	const slug = readUrl();

	let recipes = [];

	/**
	 * 
	 * @returns data from the Sanity database
	 */
	async function fetchRecipe() {
		const query = `*[slug.current == "${slug}"] {
			_id,
			name,
			"cover": image.asset->url,
			'slug': slug.current,
			difficulty,
			time,
			rating[],
			ingredients,
			instructions[]
		}`;
		
		return await sanity.fetch(query);
	}

	async function setCurrentRecipe() {
		recipes = await fetchRecipe();
	}

	// Initiates the current recipe from the URL based on the slug and renders elements.
	async function init() {
		await setCurrentRecipe();
		renderHTML();
	}

		/**
		 * RenderHTML is the function that runs changes in HTML. This function loops over the objects in Sanity and creates elements
		 */ 
			 

	function renderHTML() {
		recipes.forEach(recipe => {
			const recipePage = document.querySelector('.recipe');
			const image = document.createElement('img');
			const topic = document.createElement('h1');

			const container = document.createElement('div');

			const contentLeft = document.createElement('div');
			const ingredientsTopic = document.createElement('h3');
			const ingredientsList = document.createElement('ul');
			
			const contentRight = document.createElement('div');
			const instructionTopic = document.createElement('h3');
			const instructionList = document.createElement('ol');
			
			/**
			 * Gets an array of elements from Sanity and loops over for each and inserts data based on data from Sanity.
			 */
			
			recipe.instructions.forEach(element => {
				const instructionText = document.createElement('li');
				instructionText.innerText = element.instruction;
				instructionText.className = 'recipe__instruction-text';
				instructionList.append(instructionText);
			})
			/**
			 * Does the same as the one above, but removes the quantity and unit keys if the are not present.
			 */
			recipe.ingredients.forEach(element => {
				const ingredientText = document.createElement('li');
				if (element.quantity !== undefined && element.unit !== undefined) {
					ingredientText.innerText = `${element.quantity} ${element.unit} ${element.name}`;
				} else {
					ingredientText.innerText = element.name;
				}
				ingredientText.className = 'recipe__ingredients-text';
				ingredientsList.append(ingredientText);
			});
			
			// class name
			image.className = 'recipe__image';
			topic.className = 'recipe__name';
			
			container.className = 'recipe__container';
			contentLeft.className = 'recipe__content-left';
			ingredientsTopic.className = 'recipe__ingredients';
			ingredientsList.className = 'recipe__ingredients-list';
			
			contentRight.className = 'recipe__content-right';
			instructionTopic.className = 'recipe__instruction';
			instructionList.className = 'recipe__instruction-list';

			 
			
			topic.innerText = recipe.name;
			ingredientsTopic.innerText = 'Ingredients';
			instructionTopic.innerText = 'Instructions';
			
			
			// sources
			image.src = recipe.cover;
			
			// append
			recipePage.append(
				image,
				topic,
				container
			);
			
			container.append(
				contentLeft,
				contentRight
			);
					
			contentLeft.append(
				ingredientsTopic,
				ingredientsList
			);
							
			contentRight.append(
				instructionTopic,
				instructionList
			);
		});
	};
													
	init();
};