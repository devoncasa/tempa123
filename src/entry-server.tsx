import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../App';
import { TEMPLATES } from '../constants';
import { TemplateCategory } from '../types';
import { SITE_MAP, getCatalogCategoryPath, getCheckoutPath, getInspirationCategoryPath, getTemplateDetailPath } from './siteMap';
import { takeMetadata } from '../scripts/prerender-seo';

const fixedRoutes = Object.entries(SITE_MAP)
  .filter(([key, path]) => !key.startsWith('ADMIN_') && !path.includes(':'))
  .map(([,path]) => path);

export const routes = [
  ...fixedRoutes,
  ...Object.values(TemplateCategory).flatMap(category => [getCatalogCategoryPath(category), getInspirationCategoryPath(category)]),
  ...TEMPLATES.flatMap(template => [getTemplateDetailPath(template.id), getCheckoutPath(template.id)]),
];

export function renderPage(path: string) {
  takeMetadata();
  const html = renderToString(<StaticRouter location={path}><App /></StaticRouter>);
  const metadata = takeMetadata();
  if (!metadata?.title.trim() || !metadata.description.trim()) {
    throw new Error('Missing page metadata for ' + path);
  }
  return { html, ...metadata };
}
