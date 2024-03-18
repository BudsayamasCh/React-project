import axios from "axios"
import { useCallback, useEffect, useState } from "react"
export default SectionEditBook({
    dataBookOnEdit,
    stateSection,
    setStateSection,
    callbackToParent
}) {
    const [bookId, setBookId] = useState(null)
    const [title, setTitle] =useState('')
    const [author, setAuthor] = useState('')
    const sendItemToEdit = (item) => {
        console.log('item', item)
        setBookOnEdit(item)
        setStateSectionEditBook(true)
    }
    useEffect(() => {
        console.log('dataBookOnEdit', dataBookOnEdit)

        if(dataBookOnEdit){
            setBookId(dataBookOnEdit.id)
            setTitle(dataBookOnEdit.title)
            setAuthor(dataBookOnEdit.author)
        } else{
            setBookId(null)
            setTitle('')
            setAuthor('')
        }
    },[dataBookOnEdit])
    if(!stateSection) return(<></>)
    return (
    <>
    <form>
    <h2>Edit book</h2>
    <label >Book Title</label><br/>
    <input type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />
    <br/><br/>
    <label >Author</label><be/>
    <input 
        type="text" 
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
    />
    <br/><br/>
    <button type='button' onClick={handleSubmitForm}>Save</button>
    <button type='button' onClick={handleCloseForm}>Cancel</button>
    </form>
    </>
)
}