import React from 'react'

const ProjectDetailProductsPage = (props) => {
  return (
    <div>
      <h1>{props.project.title}</h1>
      <h2>{props.project.desc}</h2>
      <p>Vybráno: {props.project.earnedMoney}</p>
      <p>Cíl: {props.project.maxMoney}</p>
    </div>
  )
}

export default ProjectDetailProductsPage