import { API } from "aws-amplify";
import { createContext, useContext, useEffect, useState } from "react";
import { listBooks } from "../src/graphql/queries";
import { CommunityContext } from "./ComunityContext";

export const BooksContext = createContext({});

export default function BooksContextProvider({ children }) {
  const communityData = useContext(CommunityContext);
  let community = {};
  if (communityData.currCom != null) community = communityData.currCom;

  const [books, setBooks] = useState({
    books: null,
    refreshBooks: async () => {
      await fetchBooks();
    },
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  //   console.log(books.books);

  // when called, the status of the corresponding DOES change to available
  async function fetchBooks() {
    console.log("fetching books!");
    const allBooks = await API.graphql({ query: listBooks });
    const booksInfo = allBooks.data.listBooks.items;
    const filteredBooks = booksInfo.filter(
      (book) => book.communityBooksCId == community.cId
    );
    setBooks({
      books: filteredBooks,
      refreshBooks: async () => {
        await fetchBooks();
      },
    });
  }

  if (typeof books != "undefined")
    return (
      <BooksContext.Provider value={books}>{children}</BooksContext.Provider>
    );
}
