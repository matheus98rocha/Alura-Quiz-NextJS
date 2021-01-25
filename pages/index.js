import styled from 'styled-components'

import Widget from '../src/components/widget'
import DivBackground from '../src/components/QuizBackground'
import Footer from '../src/components/footer'
import divasImg from '../assets/divas.svg'
import GitHubCorner from '../src/components/gitHubCorner'


const LogoImg = styled.img`
  position: fixed;
  right: 0;
  bottom: 10px;
  width: max(40vw, 200px);
  height: (40vh, 200px);
`

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <DivBackground>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Quiz das Divas</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Faça o quiz e descubra o quanto você conhece do nosso grupo de amigas</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Quiz de JavaScript</p>
          </Widget.Content>
        </Widget>
        <Footer/>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Fernanda-Kipper/Alura-Quiz-NextJS"></GitHubCorner>
      <LogoImg src={divasImg} alt=""/>
    </DivBackground>
  )
}
