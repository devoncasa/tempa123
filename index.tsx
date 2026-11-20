import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import App from './App';
import './studio.css';
import {startAnalytics} from './src/analytics';
startAnalytics();

const offline = location.protocol === 'file:' || document.documentElement.hasAttribute('data-tempa-offline');
if(!offline && location.hash.startsWith('#/') && location.pathname==='/'){
  const target = new URL(location.hash.slice(1),location.origin);
  if(target.origin===location.origin){
    new URLSearchParams(location.search).forEach((v,k)=>{if(!target.searchParams.has(k))target.searchParams.set(k,v)});
    history.replaceState(null,'',target.pathname+target.search);
  }
}
const Router = offline ? HashRouter : BrowserRouter;
createRoot(document.getElementById('root')!).render(<Router><App/></Router>);
