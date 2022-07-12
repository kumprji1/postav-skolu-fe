import React from 'react'

import Projects from '../../../components/Projects/Projects'

import './ProjectsSection.scss'

const ProjectsSection = () => {
  return (
    <section className='projects-section'>
      <h1 className='title'>Přehled projektů s výtěžkem pro výstavbu školy</h1>
        <Projects />
    </section>
  )
}

export default ProjectsSection