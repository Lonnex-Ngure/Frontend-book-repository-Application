export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
  }
  
  export type BookAction =
    | { type: 'INIT', payload: Book[] }
    | { type: 'ADD_BOOK', book: Book }
    | { type: 'UPDATE_BOOK', book: Book }
    | { type: 'DELETE_BOOK', id: number };
  