import React from 'react'
import BTitle from '../../../components/Base/BTitle/BTitle'
import CreateNewsForm from './CreateNewsForm'

const CreateNewsPage = () => {
  return (
    <>
        <BTitle>Vytvořit novou aktualitu</BTitle>
        <CreateNewsForm />
    </>
  )
}

export default CreateNewsPage