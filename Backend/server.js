const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can change this to any port you prefer

// Enable CORS for all routes (adjust the options as needed for your environment)
app.use(cors());

app.use(bodyParser.json()); // Parse JSON request bodies

// Sample data for products
const products = [
  { id: 1, name: 'Product 1', description: 'Description 1' ,category:"mobile"},
  { id: 2, name: 'Product 2', description: 'Description 2' ,category:"mobile"},
  { id: 3, name: 'Product 3', description: 'Description 3' ,category:"laptop"},
  { id: 4, name: 'Product 4', description: 'Description 3',category: 'furniture' },
  { id: 5, name: 'Product 1', description: 'Description 1' ,category:"mobile"},
  { id: 6, name: 'Product 2', description: 'Description 2' ,category:"mobile"},
  { id: 7, name: 'Product 3', description: 'Description 3' ,category:"laptop"},
  { id: 8, name: 'Product 4', description: 'Description 3',category: 'furniture' },
  { id: 9, name: 'Product 1', description: 'Description 1' ,category:"laptop"},
  { id: 10, name: 'Product 2', description: 'Description 2' ,category:"laptop"},
  { id: 11, name: 'Product 3', description: 'Description 3' ,category:"laptop"},
  { id: 12, name: 'Product 4', description: 'Description 3',category: 'laptop' },
  { id: 13, name: 'Product 1', description: 'Description 1' ,category:"laptop"},
  { id: 14, name: 'Product 2', description: 'Description 2' ,category:"laptop"},
  { id: 15, name: 'Product 3', description: 'Description 3' ,category:"laptop"},
  { id: 16, name: 'Product 4', description: 'Description 3',category: 'laptop' },
  { id: 17, name: 'Product 4', description: 'Description 3',category: 'laptop' },
];

class User{
  firstName;
  lastName;
  email;
  password;

  constructor(firstName, lastName, email, password){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

const users = [];


app.post('/createUser', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Create a new user with the provided data
  //const user = user.find((user) => user.username === username && user.password === password);
  const newUser = new User(firstName,lastName,email,password);
  users.push(newUser);
  res.status(200).json({ message: 'User registered successfully' });
 });


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user with the provided credentials
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {     
    res.status(200).json({ message: 'Login successful'});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route to get products by category
app.get('/products', (req, res) => {
  console.log('get'); 
  
  //or
  if (products.length === 0) {
    // If there are no products, respond with a 404 Not Found status code
    res.status(404).json({ message: 'No products found'});
  } else {
    // If there are products, respond with a 200 OK status code
    res.status(200).json(products);
  }
});


app.get('/products/pagination/items', (req, res) => {
  
  const category = req.query.category;
  const filteredProducts = products.filter(product => product.category === category);
  
  const totalItems = filteredProducts.length;

  console.log(filteredProducts.length);
  res.json({totalItems});
});

app.put('/products', (req, res) => {

  const productId = parseInt(req.body.id, 10); // Convert the product ID to an integer

  console.log(productId);
  // Find the product to update by its ID (in-memory database)
  const productToUpdate = products.find((product) => product.id === productId);

  if (!productToUpdate) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Update the product with data from the request body
  if (req.body.name) {
    productToUpdate.name = req.body.name;
  }
  if (req.body.description) {
    productToUpdate.description = req.body.description;
  }
  

  return res.json({ message: 'Product updated successfully', product: productToUpdate });

  
});

// Route to add a new product using POST
app.post('/products', (req, res) => {
  const newProduct = req.body; // Assuming request body contains product data

  // Get the last ID of the products array
  const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;

  // Increment the last ID by 1 to assign to the new product
  const newProductId = lastProductId + 1;

  // Add the new product to the in-memory database with the incremented ID
  const productWithId = { ...newProduct, id: newProductId };
  products.push(productWithId);

  return res.status(201).json(productWithId); // Respond with the added product
});


app.delete('/products/:id', (req, res) => {   
  const productId = parseInt(req.params.id); // Convert productId to a number
  console.log(productId);
  // Find the index of the product with the specified ID in the products array
  const index = products.findIndex(product => product.id === productId);
console.log(index)
  // If the product with the specified ID exists, remove it from the products array
  if (index !== -1) {
    products.splice(index, 1);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } else {
    // If the product with the specified ID doesn't exist, return a 404 Not Found response
    return res.status(404).json({ error: 'Product not found' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

