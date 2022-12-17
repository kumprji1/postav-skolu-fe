import React, { useState, useEffect } from 'react'

import Projects from '../../../components/Projects/Projects'

import { useHttp } from '../../../hooks/http-hook'

import './ProjectsSection.scss'

const ProjectsSection = () => {
  const [ projects, setProjects ] = useState([]);
  const { sendRequest } = useHttp()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/get-projects-by-category/dvur')
        setProjects(responseData)
      } catch (err) {
      }
    }
    fetchProjects()
  }, [])

  return (
    <section className='projects-section'>
      <h1 className='title'>Přehled projektů s výtěžkem pro výstavbu školy</h1>
        <Projects projects={projects}/>
    </section>
  )
}

export default ProjectsSection