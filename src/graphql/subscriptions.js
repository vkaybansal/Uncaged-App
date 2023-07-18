/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCommunity = /* GraphQL */ `
  subscription OnCreateCommunity(
    $filter: ModelSubscriptionCommunityFilterInput
  ) {
    onCreateCommunity(filter: $filter) {
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCommunity = /* GraphQL */ `
  subscription OnUpdateCommunity(
    $filter: ModelSubscriptionCommunityFilterInput
  ) {
    onUpdateCommunity(filter: $filter) {
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCommunity = /* GraphQL */ `
  subscription OnDeleteCommunity(
    $filter: ModelSubscriptionCommunityFilterInput
  ) {
    onDeleteCommunity(filter: $filter) {
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
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
export const onCreateUserCommunities = /* GraphQL */ `
  subscription OnCreateUserCommunities(
    $filter: ModelSubscriptionUserCommunitiesFilterInput
  ) {
    onCreateUserCommunities(filter: $filter) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const onUpdateUserCommunities = /* GraphQL */ `
  subscription OnUpdateUserCommunities(
    $filter: ModelSubscriptionUserCommunitiesFilterInput
  ) {
    onUpdateUserCommunities(filter: $filter) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const onDeleteUserCommunities = /* GraphQL */ `
  subscription OnDeleteUserCommunities(
    $filter: ModelSubscriptionUserCommunitiesFilterInput
  ) {
    onDeleteUserCommunities(filter: $filter) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const onCreateRequests = /* GraphQL */ `
  subscription OnCreateRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onCreateRequests(filter: $filter) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const onUpdateRequests = /* GraphQL */ `
  subscription OnUpdateRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onUpdateRequests(filter: $filter) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const onDeleteRequests = /* GraphQL */ `
  subscription OnDeleteRequests($filter: ModelSubscriptionRequestsFilterInput) {
    onDeleteRequests(filter: $filter) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const onCreateBooks = /* GraphQL */ `
  subscription OnCreateBooks($filter: ModelSubscriptionBooksFilterInput) {
    onCreateBooks(filter: $filter) {
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
export const onUpdateBooks = /* GraphQL */ `
  subscription OnUpdateBooks($filter: ModelSubscriptionBooksFilterInput) {
    onUpdateBooks(filter: $filter) {
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
export const onDeleteBooks = /* GraphQL */ `
  subscription OnDeleteBooks($filter: ModelSubscriptionBooksFilterInput) {
    onDeleteBooks(filter: $filter) {
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
export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onCreateTransactions(filter: $filter) {
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
export const onUpdateTransactions = /* GraphQL */ `
  subscription OnUpdateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onUpdateTransactions(filter: $filter) {
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
export const onDeleteTransactions = /* GraphQL */ `
  subscription OnDeleteTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onDeleteTransactions(filter: $filter) {
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
