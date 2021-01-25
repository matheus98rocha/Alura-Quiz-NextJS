import { createGlobalStyle, ThemeProvider } from 'styled-components'
import projectDb from '../db.json'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;1,100;1,300;1,500&display=swap');
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Montserrat';
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = projectDb.theme

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
