import React from 'react';
import { Book, BookAction } from '../types';
import './BookList.css'; 

interface BookListProps {
  books: Book[];
  dispatch: React.Dispatch<BookAction>;
  onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, dispatch, onEdit }) => {
  return (
    <table className="book-list-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => dispatch({ type: 'DELETE_BOOK', id: book.id })} className="delete-button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
