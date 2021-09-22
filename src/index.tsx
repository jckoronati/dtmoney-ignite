import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela Website',
          type: 'deposit',
          category: 'Dev',
          amount: 5000,
          createdAt: new Date('2021-09-12 09:00:00')
        },
        {
          id: 2,
          title: 'Banho e tosa do doguinho',
          type: 'withdraw',
          category: 'Pet',
          amount: 450,
          createdAt: new Date('2021-09-16 09:00:00')
        },
      ]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);