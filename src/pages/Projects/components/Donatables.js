import React, { Fragment, useEffect, useState } from 'react'
import Donatable from './Donatable'
import { useHttp } from '../../../hooks/http-hook'

const Donatables = (props) => {
  const projectId = props.project._id
  const { sendRequest } = useHttp()  

  const [donatable, setDonatables] = useState([])

  useEffect(() => {
    const fetchDonatables = async () => {
      console.log('Fetching Donatables');
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/donatables/${projectId}`)
      setDonatables(responseData)
    }
    fetchDonatables()
  }, [projectId])

  return (
    <Fragment>
        <div>Na co chci darovat: </div>
        {donatable.map(d => <Donatable donatable={d}/>)}
    </Fragment>
  )
}

export default Donatables