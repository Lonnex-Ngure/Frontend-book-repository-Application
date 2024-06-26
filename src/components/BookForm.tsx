import React, { useRef, useEffect, FormEvent } from 'react';
import { Book } from '../types';
import './BookForm.css';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  book?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, book }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (book) {
      if (titleRef.current) titleRef.current.value = book.title;
      if (authorRef.current) authorRef.current.value = book.author;
      if (yearRef.current) yearRef.current.value = book.year.toString();
    }
  }, [book]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: book ? book.id : Date.now(),
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      year: Number(yearRef.current?.value) || 0,
    };
    onSubmit(newBook);

    // Reset form fields after submission
    if (titleRef.current) titleRef.current.value = '';
    if (authorRef.current) authorRef.current.value = '';
    if (yearRef.current) yearRef.current.value = '';
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        ref={titleRef}
        required
      />
      <input
        type="text"
        placeholder="Author"
        ref={authorRef}
        required
      />
      <input
        type="number"
        placeholder="Year"
        ref={yearRef}
        required
      />
      <button type="submit">{book ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default BookForm;
