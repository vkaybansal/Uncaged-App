/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCommunity = /* GraphQL */ `
  query GetCommunity($cId: ID!) {
    getCommunity(cId: $cId) {
      cId
      cName
      users {
        items {
          id
          createdAt
          updatedAt
          communityUsersCId
          usersCommunitiesUId
        }
        nextToken
      }
      books {
        items {
          bookId
          title
          description
          Author
          Image
          status
          createdAt
          updatedAt
          communityBooksCId
          usersOwnBooksUId
          usersBorrowedBooksUId
          requests {
            items {
              id
              createdAt
              updatedAt
              usersRequestsUId
              booksRequestsBookId
            }
            nextToken
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommunities = /* GraphQL */ `
  query ListCommunities(
    $cId: ID
    $filter: ModelCommunityFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCommunities(
      cId: $cId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        cId
        cName
        users {
          nextToken
        }
        books {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($uId: ID!) {
    getUsers(uId: $uId) {
      uId
      userName
      ownBooks {
        items {
          bookId
          title
          description
          Author
          Image
          status
          bookTransactions {
            items {
              id
              type
              borrowdate
              returnedDate
              dueDate
              createdAt
              updatedAt
              usersBorrowerTransactionsUId
              usersOwnerTransactionsUId
              booksBookTransactionsBookId
            }
            nextToken
          }
          requests {
            items {
              id
              createdAt
              updatedAt
              usersRequestsUId
              booksRequestsBookId
            }
            nextToken
          }
          createdAt
          updatedAt
          communityBooksCId
          usersOwnBooksUId
          usersBorrowedBooksUId
        }
        nextToken
      }
      borrowedBooks {
        items {
          bookId
          title
          description
          Author
          Image
          status
          bookTransactions {
            items {
              id
              type
              borrowdate
              returnedDate
              dueDate
              createdAt
              updatedAt
              usersBorrowerTransactionsUId
              usersOwnerTransactionsUId
              booksBookTransactionsBookId
            }
            nextToken
          }
          requests {
            items {
              id
              createdAt
              updatedAt
              usersRequestsUId
              booksRequestsBookId
            }
            nextToken
          }
          createdAt
          updatedAt
          communityBooksCId
          usersOwnBooksUId
          usersBorrowedBooksUId
        }
        nextToken
      }
      borrowerTransactions {
        items {
          id
          type
          borrowdate
          returnedDate
          dueDate
          createdAt
          updatedAt
          usersBorrowerTransactionsUId
          usersOwnerTransactionsUId
          booksBookTransactionsBookId
        }
        nextToken
      }
      ownerTransactions {
        items {
          id
          type
          borrowdate
          returnedDate
          dueDate
          createdAt
          updatedAt
          usersBorrowerTransactionsUId
          usersOwnerTransactionsUId
          booksBookTransactionsBookId
        }
        nextToken
      }
      pushToken
      communities {
        items {
          id
          createdAt
          updatedAt
          communityUsersCId
          usersCommunitiesUId
        }
        nextToken
      }
      requests {
        items {
          id
          createdAt
          updatedAt
          usersRequestsUId
          booksRequestsBookId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $uId: ID
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      uId: $uId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        uId
        userName
        ownBooks {
          nextToken
        }
        borrowedBooks {
          nextToken
        }
        borrowerTransactions {
          nextToken
        }
        ownerTransactions {
          nextToken
        }
        pushToken
        communities {
          nextToken
        }
        requests {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserCommunities = /* GraphQL */ `
  query GetUserCommunities($id: ID!) {
    getUserCommunities(id: $id) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const listUserCommunities = /* GraphQL */ `
  query ListUserCommunities(
    $id: ID
    $filter: ModelUserCommunitiesFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserCommunities(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        updatedAt
        communityUsersCId
        usersCommunitiesUId
      }
      nextToken
    }
  }
`;
export const getRequests = /* GraphQL */ `
  query GetRequests($id: ID!) {
    getRequests(id: $id) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const listRequests = /* GraphQL */ `
  query ListRequests(
    $id: ID
    $filter: ModelRequestsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listRequests(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        createdAt
        updatedAt
        usersRequestsUId
        booksRequestsBookId
      }
      nextToken
    }
  }
`;
export const getBooks = /* GraphQL */ `
  query GetBooks($bookId: ID!) {
    getBooks(bookId: $bookId) {
      bookId
      title
      description
      Author
      Image
      status
      bookTransactions {
        items {
          id
          type
          borrowdate
          returnedDate
          dueDate
          createdAt
          updatedAt
          usersBorrowerTransactionsUId
          usersOwnerTransactionsUId
          booksBookTransactionsBookId
        }
        nextToken
      }
      requests {
        items {
          id
          createdAt
          updatedAt
          usersRequestsUId
          booksRequestsBookId
        }
        nextToken
      }
      createdAt
      updatedAt
      communityBooksCId
      usersOwnBooksUId
      usersBorrowedBooksUId
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $bookId: ID
    $filter: ModelBooksFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listBooks(
      bookId: $bookId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        bookId
        title
        description
        Author
        Image
        status
        bookTransactions {
          items {
            id
            type
            borrowdate
            returnedDate
            dueDate
            createdAt
            updatedAt
            usersBorrowerTransactionsUId
            usersOwnerTransactionsUId
            booksBookTransactionsBookId
          }
          nextToken
        }
        requests {
          items {
            id
            createdAt
            updatedAt
            usersRequestsUId
            booksRequestsBookId
          }
          nextToken
        }
        createdAt
        updatedAt
        communityBooksCId
        usersOwnBooksUId
        usersBorrowedBooksUId
      }
      nextToken
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      id
      type
      borrowdate
      returnedDate
      dueDate
      createdAt
      updatedAt
      usersBorrowerTransactionsUId
      usersOwnerTransactionsUId
      booksBookTransactionsBookId
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        borrowdate
        returnedDate
        dueDate
        createdAt
        updatedAt
        usersBorrowerTransactionsUId
        usersOwnerTransactionsUId
        booksBookTransactionsBookId
      }
      nextToken
    }
  }
`;
