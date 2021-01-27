import React from 'react'
import { useRouter } from 'next/router'

import DivBackground from '../src/components/QuizBackground'

function QuizPage () {
  const router = useRouter()
  const name = router.query.name
  return (
      <DivBackground>
        <h1>{name}</h1>
      </DivBackground>
  )
}

export default QuizPage
