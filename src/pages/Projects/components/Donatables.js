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
    <section className='section-donatables'>
        <h2 className='donatables-na-co-chci-darovat'>Na co chci darovat: </h2>
        {donatable.map(d => <Donatable donatable={d}/>)}
    </section>
  )
}

export default Donatables