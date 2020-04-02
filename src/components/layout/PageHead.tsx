import React from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
}

const description = 'Cryptuoso - Cryptocurrency Trading Platform for your successful investment';
const keywords = 'cryptocurrency, bitcoin, trading, signals, robots, btc, crypto, mining, bitfinex, bitmex, kraken';

export const PageHead: React.FC<Props> = ({ title }) => (
  <Head>
    <title>CRYPTUOSO - {title}</title>
    <meta charSet='utf-8' />
    <meta name='viewport" content="initial-scale=1.0, width=device-width' />
    <meta name='description' content={description} />
    <meta name='keywords' content={keywords} />
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.png' />
    <link
      href='https://fonts.googleapis.com/css?family=Roboto:400,700'
      rel='stylesheet'
    />
  </Head>
);
