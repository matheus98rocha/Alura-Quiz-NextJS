/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slide from '@material-ui/core/Slide'

import projectDb from '../db.json'

import DivBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import GitHubCorner from '../src/components/GitHubCorner'
import Button from '../src/components/Button'

import avengersImg from '../assets/avengersGroup.png'

const QuizImg = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  width: max(40vw, 200px);
  height: (40vh, 200px);
  @media screen and (max-width: 750px) {
    display: none;
  }
`

function LoadingWidget () {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando...</h1>
      </Widget.Header>
      <Widget.Content>
        oi
      </Widget.Content>
    </Widget>
  )
}

function Result ({ totalQuestions }) {
  return (
    <Widget>
    <Widget.Header>
      <h1>Você acertou X de {totalQuestions}</h1>
    </Widget.Header>
    <Widget.Content>
      Parece que você é um bom conhecedor do universo Marvel, principalmente dos Vingadores
    </Widget.Content>
  </Widget>
  )
}

function QuestionWidget ({
  question,
  totalQuestions,
  questionIndex,
  handleSubmit
}) {
  return (
    <Widget>
    <Widget.Header>
      <h1>Pergunta {questionIndex + 1} de {totalQuestions}</h1>
      <img
      alt="Foto da questão"
      src={question.image}
      style={{ width: '100%', height: '150px', objectFit: 'cover' }}/>
    </Widget.Header>
    <Widget.Content>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <form
      onSubmit={(infosDoEvento) => {
        infosDoEvento.preventDefault()
        handleSubmit()
      }}
      >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternativa_${alternativeIndex}`
          return (
            <Widget.Topic
            as="label"
            htmlFor={alternativeId}
            key={alternativeIndex}
          >
            <input
              id={alternativeId}
              name={questionIndex}
              type="radio"
            />
            {alternative}
          </Widget.Topic>
          )
        })}
        <Button type="submit">Cofirmar</Button>
      </form>
    </Widget.Content>
  </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

function QuizPage () {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const question = projectDb.questions[currentQuestion]
  const totalQuestions = projectDb.questions.length

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1000)
  }, [])

  function handleSubmit () {
    if (currentQuestion < (totalQuestions - 1)) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
        <DivBackground>
        <QuizContainer>
          <QuizLogo></QuizLogo>
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={currentQuestion}
              handleSubmit={handleSubmit}>
            </QuestionWidget>
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <Result totalQuestions={totalQuestions}/>}
        </QuizContainer>
        <GitHubCorner></GitHubCorner>
        <Slide in={true} direction="left" timeout={1000}>
          <QuizImg src={avengersImg}></QuizImg>
        </Slide>
      </DivBackground>
  )
}

export default QuizPage
