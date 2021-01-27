import React, { useState } from 'react'
import Slide from '@material-ui/core/Slide'
import { useRouter } from 'next/router'
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
`

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Button = styled.button`
  min-width: 250px;
  background-color: ${({ theme }) => {
    return theme.colors.secondary
  }};
  color: #fff;
  font-family: 'Lato', sans-serif;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
`
const Input = styled.input`
  border: 1px solid ${({ theme }) => { return theme.colors.primary }};
  border-radius: 5px;
  padding: 10px;
  min-width: 250px;
  background: none;
  color: #fff;

  ::placeholder{
    color: #fff;
  }
`

export default function Home () {
  const router = useRouter()
  const [name, setName] = useState('')

  function handleSubmit (event) {
    event.preventDefault()
    router.push(`/quiz?name=${name}`)
  }

  return (
    <DivBackground>
        <QuizContainer>
          <QuizLogo/>
          <Widget>
            <Widget.Header>
              <h1>Avengers Endgame</h1>
            </Widget.Header>
            <Widget.Content>
              <p>Está pronto para testar seu conhecimento sobre o melhor filme da era marvel? Prepara o Mjölnir e vamo lá</p>
              <Form onSubmit={handleSubmit}>
                <Input placeholder="Diz seu nome para jogar :)" onChange={event => setName(event.target.value)}></Input>
                <Button type="submit" disabled={name.length === 0}> Bora Jogar {name} ?</Button>
              </Form>
            </Widget.Content>
          </Widget>
          <Footer/>
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Fernanda-Kipper/Alura-Quiz-NextJS"></GitHubCorner>
        <Slide direction="down" in={true} timeout={1500}>
          <QuizImg src={avengersImg} alt=""/>
        </Slide>
    </DivBackground>
  )
}
