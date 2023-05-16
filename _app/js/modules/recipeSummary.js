import recipe from "../../../_studio/schemas/documents/recipe.js";
import sanity from "../sanity.js";
import { readUrl } from "../util/utlis.js";

export default async function recipeSummary() {
	console.log('inn i oppskift');

	const slug = readUrl();
	

	let recipes = [];

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
		
		console.log('fetching');
		console.log(await sanity.fetch(query));
		return await sanity.fetch(query);
	}

	async function setCurrentRecipe() {
		recipes = await fetchRecipe();
	}

	async function init() {
		await setCurrentRecipe();
		// console.log(recipes);
		renderHTML()
	}

	function renderHTML() {
		recipes.forEach(recipe => {
			console.log(recipe.name)
			const recipePage = document.querySelector('.recipe');
			// console.log(recipePage)
			// create element
			const image = document.createElement('img');
			const topic = document.createElement('h1');

			const container = document.createElement('div');

			const contentLeft = document.createElement('div');
			const ingredientsTopic = document.createElement('h3');
			const ingredientsList = document.createElement('ul');
			const ingredientLiElement = document.createElement('li');
			recipe.ingredients.forEach(ingredient => {
				ingredientLiElement.innerText = `
				${ingredient.quantity}
				${ingredient.unit}
				${ingredient.name}`
			});
			
			const contentRight = document.createElement('div');
			const instructionTopic = document.createElement('h3');
			const instructionList = document.createElement('ol');
			const instructionElement = document.createElement('li')
			instructionElement.innerText = recipe.instructions.instruction;

			console.log(recipe.instructions)
			
			// class name
			image.className = 'recipe__image'
			topic.className = 'recipe__name'
			
			container.className = 'recipe__container'
			contentLeft.className = 'recipe__content-left'
			ingredientsTopic.className = 'recipe__ingredients'
			ingredientsList.className = 'recipe__ingredients-list'
			ingredientLiElement.className = 'recipe__ingredients-ingredients'
			
			contentRight.className = 'recipe__content-right'
			instructionTopic.className = 'recipe__description'
			instructionList.className = 'recipe__description-list'
			instructionElement.className = 'recipe__description-desription'
			
			// innertext
			// ingredientLiElement.innerText = `
			// ${ingredient.quantity}
			// ${ingredient.unit}
			// ${ingredient.name}`
			
			topic.innerText = recipe.name;
			instructionElement.innerText = recipe.instructions.instruction
			ingredientsTopic.innerText = 'Ingredients';
			instructionTopic.innerText = 'Instructions';
			
			
			// sources
			image.src = recipe.cover;
			
			// append
			recipePage.append(
				image,
				topic,
				container
				)
			
			container.append(
				contentLeft,
				contentRight
				)
					
			contentLeft.append(
				ingredientsTopic,
				ingredientsList
				)
						
			ingredientsList.append(
				ingredientLiElement
				)
							
			contentRight.append(
				instructionTopic,
				instructionList
				)
								
			instructionList.append(
				instructionElement
				);
		})
	}
													
	init();
}