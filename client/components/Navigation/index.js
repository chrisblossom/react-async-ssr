import React from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';
import universal from 'react-universal-component';

const PageA = universal(
  () => import(/* webpackChunkName: 'pageA' */ '../PageA'),
  {
    resolve: () => require.resolveWeak('../PageA'),
    chunkName: 'pageA',
  },
);

const PageB = universal(
  () => import(/* webpackChunkName: 'pageB' */ '../PageB'),
  {
    resolve: () => require.resolveWeak('../PageB'),
    chunkName: 'pageB',
  },
);

const PageC = universal(
  () => import(/* webpackChunkName: 'pageC' */ '../PageC'),
  {
    resolve: () => require.resolveWeak('../PageC'),
    chunkName: 'pageC',
  },
);

const Navigation = () => {
  return (
    <main>
      <Link to="/pageA">Page A</Link>
      <Link to="/pageB">Page B</Link>
      <Link to="/pageC">Page C</Link>

      <Route path="/pageA" component={PageA} exact />
      <Route path="/pageB" component={PageB} exact />
      <Route path="/pageC" component={PageC} exact />
    </main>
  );
};

export default Navigation;
