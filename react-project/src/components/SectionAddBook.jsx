import { useState } from "react"

export default function SectionAddBook({
    stateSection,
    setStateSection
}){
    const[title, setTitle] = useState('Hello')
    const [author, setAuthor] = useState('World')

    const handleSubmitForm = () => {
        console.log('title', title)
        console.log('author', author)
    }
    const handleCloseForm = () => {
        setStateSection(false)
    }
    if(!stateSection) return(<></>)
    return (
        <>
           <form >
            <h2>Add book</h2>

            <label>Book Title</label> <br/>
            <input type="text"  value={title} onChange={(e) => 
                setTitle(e.target.value)}
            />

            <br/><br/>
            <label >Author</label>
            <input type="text" value={author} 
            onChange={(e) => 
                setAuthor(e.target.value)}/>
            <br/><br/>
            <button type="button" onClick={handleSubmitForm}>Submit</button>
            <button>Cancel</button>
           </form>
        </>
    )
}