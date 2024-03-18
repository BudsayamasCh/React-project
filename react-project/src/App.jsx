import { useCallback, useEffect, useState } from 'react'
import SectionAddBook from './components/SectionAddBook'
import SectionEditBook from './components/SectionEditBook'

function App() {
  const [books, setBooks] = useState([])
  const [stateSectionAddBook,setStateSectionAddBook] = useState(false)
  const [stateSectionEditBook,setStateSectionEditBook] = useState(false)
  const [bookOnEdit, setBookOnEdit] = useState(null)

  const sendItemToEdit = (item) => {
    setBookOnEdit(item)
    setStateSectionEditBook(true)
  }

  const sendItemToDel = (item) => {
    console.log('item',item)
  }
  const fetchBooks = useCallback (async()=> {
    try {
      const res = await axios.get('http://localhost:3000/books')
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  },[axios])
    
  useEffect(() => {
    fetchBooks()
  },[fetchBooks])

  return (
    <>
    <SectionAddBook 
    stateSection={stateSectionAddBook}
    setStateSection={setStateSectionAddBook}
    callbackToParent={triggerFetchBooks}
    />
    <SectionEditBook
    stateSection={stateSectionEditBook}
    setStateSection={setStateSectionEditBook}
    callbackToParent={triggerFetchBooks}
    />
        <div>
          <h3>Data Books</h3>
          <table border={1} style={{
            borderCollapse:'collapse'
          }}>
            <thead>
             <tr>
              <th>No.</th>
              <th>Title.</th>
              <th>Author.</th>
              <th>Actions</th>
             </tr>
            </thead>
            <tbody>
              {
                books.map((item, index) =>(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>
                      <button onClick={() => sendItemToEdit(item)}>
                        Edit
                        </button>
                      <button onClick={() => sendItemToDel(item)}>
                        Del
                        </button>
                    </td>
                  </tr>
                ))
              }
      
            </tbody>
          </table>
            <br/>
            <button onClick={() => setStateSectionAddBook(true)}>
              Add Book
            </button>
        </div>
    </>
  )
}

export default App
