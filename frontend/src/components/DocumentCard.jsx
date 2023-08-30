import React from 'react'
import "./DocumentCard.css"
const DocumentCard = ({document,color}) => {
  return (
    <div className={`document-card ${color}`}>
        <h4>{document.title}</h4>
        <p>{document.owner}</p>
    </div>
  )
}

export default DocumentCard