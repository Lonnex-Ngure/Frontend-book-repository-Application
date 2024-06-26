import React, { useReducer, useEffect, useCallback, useState } from 'react';
import './App.css'; 
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import useLocalStorage from './hooks/useLocalStorage';
import { bookReducer } from './reducer';
import { Book } from './types';

const App: React.FC = () => {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [localBooks, setLocalBooks] = useLocalStorage<Book[]>('books', []);

  useEffect(() => {
    if (localBooks && localBooks.length > 0) {
      dispatch({ type: 'INIT', payload: localBooks });
    }
  }, [localBooks]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const booksPerPage = 5;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleSubmit = (book: Book) => {
    dispatch({
      type: editingBook ? 'UPDATE_BOOK' : 'ADD_BOOK',
      book
    });
    setEditingBook(null); 
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTitle.toLowerCase()) && 
    book.author.toLowerCase().includes(searchAuthor.toLowerCase())
  );
  
  const displayedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  useEffect(() => {
    setLocalBooks(books);
  }, [books, setLocalBooks]);

  return (
    <div>
      <h1>Book Repository</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={e => setSearchTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={e => setSearchAuthor(e.target.value)}
        />
      </div>
      <BookForm onSubmit={handleSubmit} book={editingBook || undefined} />
      <BookList books={displayedBooks} dispatch={dispatch} onEdit={handleEdit} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
