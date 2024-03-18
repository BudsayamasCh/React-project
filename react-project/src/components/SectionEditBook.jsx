import axios from "axios";
import { useCallback,useEffect, useState } from "react";

export default  SectionEditBook({
    dataBookOnEdit,
    stateSection,
    setStateSection,
    callbackToParent // Assuming function for notifying parent component
}) {
  const [bookId, setBookId] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Handle form submission (implementation needed)
  const handleSubmitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validation (optional)
    if (!title || !author) {
      alert("Please fill in both title and author fields.");
      return;
    }

    try {
      // Assuming API call to update book details
      const response = await axios.put(`http://localhost:3000/books/${bookId}`, {
        title,
        author,
      });

      console.log("Book updated successfully:", response.data);
      callbackToParent(); // Update parent component (trigger data refetch)
      setStateSection(false); // Close edit section
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book. Please try again.");
    }
  };

  // Handle closing the form (implementation needed)
  const handleCloseForm = () => {
    setStateSection(false); // Close edit section
  };

  useEffect(() => {
    if (bookToEdit) { // Use the received prop name
      setBookId(bookToEdit.id);
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
    } else {
      setBookId(null);
      setTitle("");
      setAuthor("");
    }
  }, [bookToEdit]); // Update state when bookToEdit changes

  if (!stateSection) return <></>;

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <h2>Edit Book</h2>
        <label htmlFor="bookTitle">Book Title</label><br />
        <input
          type="text"
          id="bookTitle" // Add an ID for accessibility
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <label htmlFor="author">Author</label><br />
        <input
          type="text"
          id="author" // Add an ID for accessibility
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br /><br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCloseForm}>
          Cancel
        </button>
      </form>
    </>
  );
}
