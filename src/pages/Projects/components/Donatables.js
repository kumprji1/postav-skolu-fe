import React, { Fragment, useContext, useEffect, useState } from 'react'
import Donatable from './Donatable'
import { useHttp } from '../../../hooks/http-hook'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { Roles } from '../../../utils/roles'

const Donatables = (props) => {
  const auth = useContext(AuthContext)
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
        {donatable.map((d,i) => <Donatable donatable={d} key={i} />)}
        {auth.role == Roles.ADMIN &&  <NavLink className='bbutton-outline' to={`/novy-darovatelny-box/${projectId}`}>Přidat darovatelný box</NavLink>}
    </section>
  )
}

export default Donatables