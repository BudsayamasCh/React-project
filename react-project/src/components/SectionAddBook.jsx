import axios from "axios"
import { useCallback, useState } from "react"

export default SectionAddBook({
    stateSection,
    setStateSection,
    callbackToParent
}){
    const[title, setTitle] = useState('Hello')
    const [author, setAuthor] = useState('World')

    const handleSubmitForm = useCallback(async() => {
        
        if(title ==='' && author ===''){
            alert('some value should not be empty')
            return
        }

        try {
            const res = await axios.post('http://localhost:3000/books')
            if(res.status === 200){
                alert('Add book successfuly')
                handleCloseForm()
                callbackToParent()
                return
            }
            throw new Error(res)
        } catch(err){
            console.log(err)
        }
    }, [axios,handleCloseForm])
    const handleCloseForm = () => {
        setTitle('')
        setAuthor('')
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
            <button type="button" onClick={handleCloseForm}>Cancel</button>
           </form>
        </>
    )
}