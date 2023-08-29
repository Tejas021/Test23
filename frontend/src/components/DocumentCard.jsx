import React from 'react'
import "./DocumentCard.css"
const DocumentCard = ({document}) => {
  return (
    <div className='document-card'>
        <h4>{document.title}</h4>
        <p>{document.owner}</p>
    </div>
  )
}

export default DocumentCard