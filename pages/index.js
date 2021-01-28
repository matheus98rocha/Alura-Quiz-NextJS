import React, { useState } from 'react'
import Slide from '@material-ui/core/Slide'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import projectDb from '../db.json'

import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget'
import DivBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Input from '../src/components/Input'
import Button from '../src/components/Button'

import avengersImg from '../assets/avengers.png'

const QuizImg = styled.img`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: max(40vw, 200px);
  height: (40vh, 200px);
`

const Form = styled.form`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
              <h1>{projectDb.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{projectDb.description}</p>
              <Form onSubmit={handleSubmit}>
                <Input placeholder="Diz seu nome para jogar :)" onChange={event => setName(event.target.value)} name="NomedoUsuário"></Input>
                <Button type="submit" disabled={name.length === 0}> Bora Jogar {name} ?</Button>
              </Form>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              {projectDb.external.map(quiz => {
                return (<Widget.Topic key={quiz.url} href={quiz.url}>{quiz.name}</Widget.Topic>)
              })}
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
