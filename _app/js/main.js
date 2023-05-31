import header from "./modules/header.js";
import recipeCards from "./modules/recipeCards.js";
import recipeSummary from "./modules/recipeSummary.js";
import search from "./modules/search.js";
import { readUrl } from "./util/read-url.js";

header()
if(readUrl() !== undefined) {
	recipeSummary()
} else {
	recipeCards()
}