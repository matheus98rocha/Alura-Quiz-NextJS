import styled from 'styled-components'

import Widget from '../src/components/Widget'
import DivBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

import avengersImg from '../assets/avengers.png'


const QuizImg = styled.img`
  position: fixed;
  right: 20px;
  bottom: 20px;
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
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1>Quiz Conhecimentos Malucos</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Perguntas malucas e respostas mais ainda</p>
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
      <QuizImg src={avengersImg} alt=""/>
    </DivBackground>
  )
}
