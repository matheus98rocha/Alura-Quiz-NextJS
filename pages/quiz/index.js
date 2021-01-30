/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Slide from '@material-ui/core/Slide'

import projectDb from '../../db.json'

import DivBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import GitHubCorner from '../../src/components/GitHubCorner'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativesForm'
import BackLinkArrow from '../../src/components/BackLinkArrow'

import avengersImg from '../../assets/avengersGroup.png'
import loadingGif from '../../assets/loading.gif'

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
        <img src={loadingGif} alt="Imagem de Carregamento" style={{ marginLeft: '80px', height: '120px' }}/>
      </Widget.Content>
    </Widget>
  )
}

function Result ({ totalQuestions, result, name }) {
  return (
    <Widget>
    <Widget.Header>
      <BackLinkArrow href="/"/>
      <h1>Você acertou {result} de {totalQuestions}</h1>
    </Widget.Header>
    <Widget.Content>
    {result > totalQuestions / 2
      ? (
      <h3>Parábens {`${name}`}! Você é um bom conhecedor do universo Marvel 🐱‍🏍</h3>
        )
      : <h3>Putss {`${name}`}! Prepara uma pipoca por que você vai ter que assistir o filme de novo 🍿</h3>
    }
    </Widget.Content>
  </Widget>
  )
}

function QuestionWidget ({
  question,
  totalQuestions,
  questionIndex,
  handleSubmit,
  addResults
}) {
  const [isFormSubmited, SetFormSubmted] = useState(false)
  const [selectedAlternative, setSelectedAlternative] = useState()
  const isCorrect = selectedAlternative === question.answer
  const hasSelectedAlternatve = selectedAlternative !== undefined
  return (
    <Widget>
    <Widget.Header>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BackLinkArrow href="/"/>
        <h1>Pergunta {questionIndex + 1} de {totalQuestions}</h1>
      </div>
      <img
      alt="Foto da questão"
      src={question.image}
      style={{ width: '100%', height: '150px', objectFit: 'cover' }}/>
    </Widget.Header>
    <Widget.Content>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <AlternativesForm
      onSubmit={(infosDoEvento) => {
        infosDoEvento.preventDefault()
        SetFormSubmted(true)
        if (isCorrect) {
          addResults()
        }
        setTimeout(() => {
          handleSubmit()
          SetFormSubmted(false)
        }, 1000)
      }}
      >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternativa_${alternativeIndex}`
          const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
          const isSelected = selectedAlternative === alternativeIndex
          return (
            <Widget.Topic
            as="label"
            htmlFor={alternativeId}
            key={alternativeIndex}
            data-selected={isSelected}
            data-status={isFormSubmited && alternativeStatus}
          >
            <input
              id={alternativeId}
              name={questionIndex}
              onChange={() => setSelectedAlternative(alternativeIndex)}
              type="radio"
            />
            {alternative}
          </Widget.Topic>
          )
        })}
        {isCorrect && isFormSubmited ? <p>Você acertou 😃</p> : null}
        {!isCorrect && isFormSubmited ? <p>Você errou 😢</p> : null}
        <Button type="submit" disabled={!hasSelectedAlternatve}>Cofirmar</Button>
      </AlternativesForm>
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
  const router = useRouter()
  const name = router.query.name
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const question = projectDb.questions[currentQuestion]
  const totalQuestions = projectDb.questions.length
  const [results, setResults] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 1500)
  }, [])

  function handleSubmit () {
    if (currentQuestion < (totalQuestions - 1)) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  function addPoint () {
    setResults(results + 1)
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
              handleSubmit={handleSubmit}
              addResults={addPoint}>
            </QuestionWidget>
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && <Result totalQuestions={totalQuestions} result={results} name={name}/>}
        </QuizContainer>
        <GitHubCorner></GitHubCorner>
        <Slide in={true} direction="left" timeout={1000}>
          <QuizImg src={avengersImg}></QuizImg>
        </Slide>
      </DivBackground>
  )
}

export default QuizPage
