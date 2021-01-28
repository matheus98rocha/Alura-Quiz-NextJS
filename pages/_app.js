import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import projectDb from '../db.json'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
    margin: 0;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = projectDb.theme

// eslint-disable-next-line react/prop-types
export default function App ({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
