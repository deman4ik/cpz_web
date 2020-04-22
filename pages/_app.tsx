import React from 'react';
import './style.css';
import '../src/assets/static/common.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
