import React from 'react'
import moment from "moment"
import "./Documentation.css"
import TagBubble from '../components/TagBubble'
const Documentation = () => {
    
  const doc={"id":22,"body":"<ol><li>sadfdsaf<strong>sadfsadf<u>sadfsd</u></strong><strong style=\"color: rgb(230, 0, 0);\"><u>afsdasdafsadfsadfsdaf</u></strong></li></ol>","title":"some New Documentation","tags":["deprecation","downgrade"],"accessLevel":"public","owner":"tejas.ko","createdAt":1693320655000,"updatedAt":1693320655000}
    return (
    <div className='container document-parent'>
        
 
 <div className='document-left'>
 <h1 className='document-title'>Title</h1>
 <p>Updated {moment(doc.updatedAt).fromNow()}</p>
 <div className='document-body' dangerouslySetInnerHTML={{ __html: doc.body }} />
 </div>
<div className='document-right bg-blue'>
    <h3>Tags :</h3>
<div className="selected-tags ">
{doc.tags?.map((tag) => (
            <TagBubble tag={tag} color={"bg-red"}/>
          ))}



</div> 
<h3 className='doc_sub'>Created On :</h3>
<p className='time info-val'>{moment(doc.createdAt).format("LLL")}</p>
<h3 className='doc_sub'>Updated On :</h3>
<p className='time info-val'>{moment(doc.updatedAt).format("LLL")}</p>
<h3 className='doc_sub'>Owner :</h3>
<p className='owner info-val'>{doc.owner}</p>
<h3 className='doc_sub'>Access Level : </h3>
<p className='access-level-disp info-val'>{doc.accessLevel}</p>
</div>

</div>
  )
}

export default Documentation