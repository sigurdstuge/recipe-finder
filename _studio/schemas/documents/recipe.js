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
			title: 'Difficulty',
			name: 'difficulty',
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
			title: 'Description',
			name: 'description',
			type: 'text',
		},
		{
			title: 'Rating',
			name: 'rating',
			type: 'string',
			options: {
							list: [
								'1',
								'2',
								'3',
								'4',
							]
			}
		},
		{
			title: 'Category',
			name: 'category',
			type: 'reference',
			to: [{ type: 'category' }]
		},	
	]
}