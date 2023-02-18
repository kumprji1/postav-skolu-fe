import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http-hook'
import KupSiSvojiCastPozemkuPage from '../../KupSiSvojiCastPozemkuPage/KupSiSvojiCastPozemkuPage'
import ProjectDetailDonatePage from './ProjectDetailDonatePage'
import ProjectDetailProductsPage from './ProjectDetailProductsPage'

const ProjectDetailPage = () => { 
  const [project, setProject] = useState()
  const { sendRequest } = useHttp()
  const { urlTitle } = useParams();
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/projects-by-title/${urlTitle}`)  
        setProject(responseData)
      } catch (err) {  
      }  
    }
    fetchProject();
  }, [urlTitle])
  console.log(urlTitle)
    const choosePage = () => {
        switch (project.type) {
            case 'donate': return <ProjectDetailDonatePage project={project} />; break;
            case 'products': return <ProjectDetailProductsPage project={project} />; break;
            case 'donate-land': return <KupSiSvojiCastPozemkuPage project={project} />
            default: new Error('Unknown project type')
        }
    }

  return (
    project ? choosePage() : null
  )
}

export default ProjectDetailPage