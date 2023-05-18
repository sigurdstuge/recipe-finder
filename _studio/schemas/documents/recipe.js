export default {
	title: 'Recipe',
	name: 'recipe',
	type: 'document',
	fields: [
		{
			title: 'Image',
			name: 'image',
			type: 'image',
		},
		{
			title: 'Name',
			name: 'name',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 200
			 }
		},
		{
			title: 'Difficulty',
			name: 'difficulty',
			type: 'string',
		},
		{
			title: 'Time',
			name: 'time',
			type: 'string',
		},
		{
			title: 'Ingredients',
			name: 'ingredients',
			type: 'array',
			of: [
				{
					type: 'object',
					fields:[
						{
							title: 'Name',
							name: 'name',
							type: 'string',
						},
						{
							title: 'Quantity',
							name: 'quantity',
							type: 'number',
						},
						{
							title: 'Unit',
							name: 'unit',
							type: 'string',
						}
					]
				}
			]
		},
		{
			title: 'Instructions',
			name: 'instructions',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Instruction',
							name: 'instruction',
							type: 'string',
						}
					]
				}
			]
		},
		{
			title: 'Rating',
			name: 'rating',
			type: 'array',
			of: [
				{type: 'number'}
			]
		},
		{
			title: 'Category',
			name: 'category',
			type: 'reference',
			to: [{ type: 'category' }]
		},	
	]
}