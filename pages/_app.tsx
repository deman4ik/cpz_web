import React from 'react';
import Router from 'next/router';

import { pageview } from '../src/libs/gtag';
import './style.css';
import '../src/assets/static/common.css';

Router.events.on('routeChangeComplete', url => pageview(url));

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
