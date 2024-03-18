import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import SectionAddBook from './components/SectionAddBook';
import SectionEditBook from './components/SectionEditBook';

function App() {
  const [books, setBooks] = useState([]);
  const [stateSectionAddBook, setStateSectionAddBook] = useState(false);
  const [stateSectionEditBook, setStateSectionEditBook] = useState(false);
  const [bookOnEdit, setBookOnEdit] = useState(null); // Can be null or an object

  const sendItemToEdit = (item) => {
    console.log('item', item);
    setBookOnEdit(item);
    setStateSectionEditBook(true);
  };

  const sendItemToDel = (item) => {
    const isConfirmed = confirm(`Are you sure to delete book: ${item.title}?`); // Use template literals for cleaner string formatting
    if (isConfirmed) {
      deleteBook(item.id); // Corrected function name (lowercase d)
    }
  };

  const deleteBook = useCallback(async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/books/${id}`); // Include book ID in the URL
      if (response.status === 200) {
        alert('Book deleted successfully');
        fetchBooks(); // Update book data after deletion
        return;
      }
      throw new Error(response);
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the book. Please try again.'); // Provide user feedback
    }
  }, [axios, fetchBooks]);

  const triggerFetchBooks = () => {
    fetchBooks();
  };

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching books. Please try again.'); // Provide user feedback
    }
  }, [axios]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
        <table border={1} style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <button onClick={() => sendItemToEdit(item)}>Edit</button>
                  <button onClick={() => sendItemToDel(item)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button onClick={() => setStateSectionAddBook(true)}>Add Book</button>
      </div>
    </>
  );
}

export default App;
