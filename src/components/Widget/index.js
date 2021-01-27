import styled from 'styled-components'

const Widget = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => {
    return theme.colors.mainBg
  }};
  border-radius: 4px;
  overflow: hidden;
  h1{
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 0;
    font-family: 'Lato', sans-serif;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
    font-family: 'Lato', sans-serif;
    text-align: center;
  }
`

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`

export default Widget
