import React from 'react'
import { useParams } from 'react-router-dom'
import ProjectDetailDonatePage from './ProjectDetailDonatePage'
import ProjectDetailProductsPage from './ProjectDetailProductsPage'

const ProjectDetailPage = ({project}) => { 
  const { urlPath } = useParams();
  console.log(urlPath)
    const choosePage = () => {
        switch (project.type) {
            case 'donate': <ProjectDetailDonatePage />; break;
            case 'products': <ProjectDetailProductsPage />; break;
            case 'donate-land':
            default: new Error('Unknown project type')
        }
    }

  return (
    choosePage()
  )
}

export default ProjectDetailPage