/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage ({ externalDB }) {
  return (
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen externalQuestions={externalDB.questions} externalBg={externalDB.bg}></QuizScreen>
      </ThemeProvider>
  )
}

// this fetch will be run on the server, then when the page is sended to the client - browser
// the content is already fecthed and rendered, next responds with html pure, faster - which also helps seo

export async function getServerSideProps (context) {
  const [projectName, githubName] = context.query.id.split('___')
  const externalDB = await fetch(`https://${projectName}.${githubName}.vercel.app/api/db`).then(response => {
    if (response.ok) {
      return response.json()
    }
    throw new Error('Erro ao pegar os dados externos')
  }).then(responseJson => responseJson).catch(err => {
    console.log(err)
  })
  console.log(externalDB)
  return {
    props: {
      externalDB
    }
  }
}
