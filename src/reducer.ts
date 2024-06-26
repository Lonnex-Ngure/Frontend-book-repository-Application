import { Book, BookAction } from './types';

export const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'ADD_BOOK':
      return [...state, action.book];
    case 'UPDATE_BOOK':
      return state.map(book => (book.id === action.book.id ? action.book : book));
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};
