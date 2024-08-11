import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



const seed = async ()=>{ 
	const cartExample={
		id :'9f9a3083-c28f-4aba-a5ae-4bca24c76873',
		user_id: '1f9809e5-b1b7-48c3-bd38-693ac3a1ccba',
		items:[
			{
			id:1,
			cart_id :'9f9a3083-c28f-4aba-a5ae-4bca24c76873',
			product_id:'2abf938e-7c9e-433b-a562-e7a491c04390',
			count:1,
		},
	{		id:2,
		cart_id :'9f9a3083-c28f-4aba-a5ae-4bca24c76873',
		product_id:'8843d285-4723-4a42-b782-1c6f92bb38a0',
		count:1,
	},
	],
		status: 'OPEN'
	}

	const {items, ...rest} = cartExample;
	
	await prisma.cart.create({
    data: rest
  });

	 items.forEach(async item=>{
		await prisma.cart_item.create({data:item})
	})


await prisma.$disconnect();}

seed();
