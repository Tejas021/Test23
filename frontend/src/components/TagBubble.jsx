import React from 'react'
import "./TagBubble.css"
const TagBubble = ({tag,color}) => {
  return (
    <div className={`tag-bubble ${color}`}>{tag}</div>
  )
}

export default TagBubble