import { QuestionForm } from '@/components/forms'
import type { ReactElement } from 'react'

const AskQuestionPage = (): ReactElement => (
  <>
    <h1 className='h1-bold text-dark100_light900'>Ask a question</h1>

    <div className='mt-9'>
      <QuestionForm />
    </div>
  </>
)

export default AskQuestionPage
