import React from 'react'
import "./DocumentCard.css"
import { Link } from 'react-router-dom'
const DocumentCard = ({document,color}) => {
  return (
    <div className={`document-card ${color}`}>
      <Link to={`/document/${document.id}`}>
      <h4>{document.title}</h4>
        <p>{document.owner}</p>
      </Link>
        
    </div>
  )
}

export default DocumentCard