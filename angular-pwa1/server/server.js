const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../dist/angular-pwa1')));

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/angular-pwa1/index.html'));
});

const PORT = process.env.PORT || 5000;

let todos = [
  { id: 1, title: 'Learn Angular', completed: false },
  { id: 2, title: 'Build a PWA', completed: false }
];

app.use(bodyParser.json());

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos = todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
  res.json(updatedTodo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
