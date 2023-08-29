import React from 'react'
import "./Documentation.css"
import TagBubble from '../components/TagBubble'
const Documentation = () => {
    
  const doc={"id":22,"body":"<ol><li>sadfdsaf<strong>sadfsadf<u>sadfsd</u></strong><strong style=\"color: rgb(230, 0, 0);\"><u>afsdasdafsadfsadfsdaf</u></strong></li></ol>","title":"some New Documentation","tags":["deprecation","downgrade"],"accessLevel":"public","owner":"tejas.ko","createdAt":1693320655000,"updatedAt":1693320655000}
    return (
    <div className='container document-parent'>
        
 
 <div className='document-left'>
 <h1 className='document-title'>Title</h1>
 <div className='document-body' dangerouslySetInnerHTML={{ __html: doc.body }} />
 </div>
<div className='document-right'>
    <h3>Tags :</h3>
<div className="selected-tags">
{doc.tags?.map((tag) => (
            <TagBubble tag={tag}/>
          ))}



</div> 
<h3 className='doc_sub'>Created On :</h3>
{doc.createdAt}
<h3 className='doc_sub'>Updated On :</h3>
{doc.updatedAt}
<h3 className='doc_sub'>Owner :</h3>
{doc.owner}
<h3 className='doc_sub'>Access Level : </h3>
{doc.accessLevel}
</div>

</div>
  )
}

export default Documentation