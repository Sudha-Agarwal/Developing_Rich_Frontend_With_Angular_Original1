// server.js

const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json());


app.get('/api/performance-todos', (req, res) => {
  console.log("todo request");

  const todoList = [{
      id: 'task1',
      title: 'Buy Milk - performance',
      description: 'Remember to buy milk - performance'
    },
    {
      id: 'task2',
      title: 'Go to the gym - performance',
      description: 'Remember to work out - performance'
    }
  ];
  return res.json(todoList);
});

app.get('/api/freshness-todos', (req, res) => {
  console.log("fresh todo request");

  const todoList = [{
      id: 'task1',
      title: 'New TODO 1! - freshness',
      description: 'Remember to buy milk - freshness'
    },
    {
      id: 'task2',
      title: 'New TODO 2! - freshness',
      description: 'Remember to work out - freshness'
    }
  ];
  return res.json(todoList);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});