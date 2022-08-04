import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

import './font.css'

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.color.body};
    color: ${({ theme }) => theme.color.text};
    font-family: 'Lato', sans-serif;
    line-height: 1.5;
  }

  button {
    padding: 0;
    border:none;
    border-radius: 0;
    background: inherit;
    color: inherit;
    font-family: 'Lato', sans-serif;
    box-shadow: none;
    cursor: pointer;
  }

  li { 
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default GlobalStyle
