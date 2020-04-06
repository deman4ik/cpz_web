import React from 'react';
import './style.css';
import 'react-activity/lib/Spinner/Spinner.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
