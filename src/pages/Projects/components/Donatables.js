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

  const [donatables, setDonatables] = useState([])

  useEffect(() => {
    const fetchDonatables = async () => {
      console.log('Fetching Donatables');
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/donatables-by-project-id/${projectId}`)
      setDonatables(responseData)
    }
    fetchDonatables()
  }, [projectId])

  const deleteDonatableHandler = async (donatableId) => {
    console.log('Delete: ', donatableId)
    try {
      const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/admin/donatable/delete/${donatableId}`, 'PATCH', null, {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      })
      // if (responseData.msg === 'ok') {
        setDonatables(donatables.filter(don => don._id !== donatableId))
      // }
    } catch (err) {
      
    }
  }

  return (
    <section className='section-donatables'>
        <h2 className='donatables-na-co-chci-darovat'>Na co chci darovat: </h2>
        {donatables.map((d,i) => <Donatable donatable={d} key={i} deleteHandler={() => deleteDonatableHandler(d._id)} />)}
        {auth.role == Roles.ADMIN &&  <NavLink className='bbutton-outline' to={`/novy-darovatelny-box/${projectId}`}>Přidat darovatelný box</NavLink>}
    </section>
  )
}

export default Donatables