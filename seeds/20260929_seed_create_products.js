export async function seed(knex) {
  if (process.env.NODE_ENV !== "development") {
    console.log("Seed has been skipped: not development environment");
    return;
  }

  const now = new Date();

  const products = [
    // Category: Men's Clothing
    {
      name: "Leather Jacket",
      description: "Leather jacket with zipper and pockets",
      price: 350.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Basic T-Shirt",
      description: "Basic Cotton T-Shirt",
   
      price: 120.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Jeans Pants",
      description: "Casual Jeans Pants",
      price: 90.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Black Hoodie",
      description: "Black Hoodie with front pockets",
      price: 150.0,
      created_at: now,
      updated_at: now,
    },

    // Category: Women's Clothing
    {
      name: "Cotton Pants",
      description: "Grey Cotton Pants",
      price: 130.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "White Dress",
      description: "White Dress with Floral Print",
      price: 180.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Pink Blouse",
      description: "Casual Pink Blouse",
      price: 70.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Long Skirt",
      description: "Long Blue Skirt",
      price: 140.0,
      created_at: now,
      updated_at: now,
    },

    // Categoria: Footwear
    {
      name: "Sports Sneakers",
      description: "Running sneakers",
      price: 250.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Leather Boot",
      description: "Brown leather boot",
      price: 320.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Women's Sandal",
      description: "Comfortable flat sandal",
      price: 110.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Basic Flip-Flops",
      description: "Simple rubber flip-flops",
      price: 40.0,
      created_at: now,
      updated_at: now,
    },

    // Category: Accessories
    {
      name: "Digital Watch",
      description: "Water-resistant watch",
      price: 180.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Sunglasses",
      description: "Sunglasses with UV protection",
      price: 200.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Leather Wallet",
      description: "Men's genuine leather wallet",
      price: 95.0,
      created_at: now,
      updated_at: now,
    },
  ];

  for (const product of products) {
    await knex('products')
      .insert({
        ...product,
        id: crypto.randomUUID(),
      })
      .onConflict('id') 
      .ignore();
  }

  console.log("Seed completed!");
}