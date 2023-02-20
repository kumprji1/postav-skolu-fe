import React from 'react'
import { useParams } from 'react-router-dom'

import CreateDonatableForm from './CreateDonatableForm'
import BTitle from '../../../components/Base/BTitle/BTitle'

const CreateDonatablePage = () => {
    const { projectId } = useParams()
  return (
    <>
        <BTitle>Vytvořit darovatlný box</BTitle>
        <CreateDonatableForm projectId={projectId} />
    </>
  )
}

export default CreateDonatablePage