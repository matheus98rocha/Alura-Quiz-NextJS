/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import DivBackground from '../../components/ExternalQuizBackground'
import QuizContainer from '../../components/QuizContainer'
import Widget from '../../components/Widget'
import QuizLogo from '../../components/QuizLogo'
import GitHubCorner from '../../components/GitHubCorner'
import Button from '../../components/Button'
import AlternativesForm from '../../components/AlternativesForm'
import BackLinkArrow from '../../components/BackLinkArrow'

function LoadingWidget () {
  return (
    <Widget>
      <Widget.Header>
        <h1>Carregando...</h1>
      </Widget.Header>
      <Widget.Content>
        <img src="https://media.giphy.com/media/5AtXMjjrTMwvK/giphy.gif" alt="Imagem de Carregamento" style={{ marginLeft: '80px', height: '120px' }}/>
      </Widget.Content>
    </Widget>
  )
}

function Result ({ totalQuestions, result }) {
  return (
    <Widget>
    <Widget.Header>
      <BackLinkArrow href="/"/>
      <h1>Você acertou {result} de {totalQuestions}</h1>
    </Widget.Header>
    <Widget.Content>
    {result > totalQuestions / 2
      ? (
      <h3>Parábens! Você é um bom conhecedor do universo Marvel 🐱‍🏍</h3>
        )
      : <h3>Putss! Prepara uma pipoca por que você vai ter que assistir o filme de novo 🍿</h3>
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
      <h1>Pergunta {questionIndex + 1} de {totalQuestions}</h1>
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

function QuizPage ({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const question = externalQuestions[currentQuestion]
  const totalQuestions = externalQuestions.length
  const [results, setResults] = useState(0)
  const bg = externalBg

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
        <DivBackground backgroundImage={bg}>
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

          {screenState === screenStates.RESULT && <Result totalQuestions={totalQuestions} result={results}/>}
        </QuizContainer>
        <GitHubCorner></GitHubCorner>
      </DivBackground>
  )
}

export default QuizPage
