import 'babel-polyfill';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import renderTemplate from './template';
import Navigation from '../client/components/Navigation';

const app = express();
const webpackStats = JSON.parse(fs.readFileSync('./stats.json'));

app.use(express.static('public'));
app.get('/favicon.ico', (request, response) => {
  response.send(404)
});

app.get('*', function (request, response) {
  const context = {};

  const App = () => {
    return (
      <StaticRouter context={context} location={request.url}>
        <Navigation />
      </StaticRouter>
    );
  };

  const html = renderToString(<App />);
  const chunkNames = flushChunkNames();

  const { js } = flushChunks(webpackStats, {
    before: ['manifest', 'vendor'],
    after: ['main'],
    chunkNames,
  });

  response.send(renderTemplate(html, js));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
