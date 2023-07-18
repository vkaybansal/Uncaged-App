/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCommunity = /* GraphQL */ `
  mutation CreateCommunity(
    $input: CreateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    createCommunity(input: $input, condition: $condition) {
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
export const updateCommunity = /* GraphQL */ `
  mutation UpdateCommunity(
    $input: UpdateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    updateCommunity(input: $input, condition: $condition) {
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
export const deleteCommunity = /* GraphQL */ `
  mutation DeleteCommunity(
    $input: DeleteCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    deleteCommunity(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createUserCommunities = /* GraphQL */ `
  mutation CreateUserCommunities(
    $input: CreateUserCommunitiesInput!
    $condition: ModelUserCommunitiesConditionInput
  ) {
    createUserCommunities(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const updateUserCommunities = /* GraphQL */ `
  mutation UpdateUserCommunities(
    $input: UpdateUserCommunitiesInput!
    $condition: ModelUserCommunitiesConditionInput
  ) {
    updateUserCommunities(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const deleteUserCommunities = /* GraphQL */ `
  mutation DeleteUserCommunities(
    $input: DeleteUserCommunitiesInput!
    $condition: ModelUserCommunitiesConditionInput
  ) {
    deleteUserCommunities(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      communityUsersCId
      usersCommunitiesUId
    }
  }
`;
export const createRequests = /* GraphQL */ `
  mutation CreateRequests(
    $input: CreateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    createRequests(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const updateRequests = /* GraphQL */ `
  mutation UpdateRequests(
    $input: UpdateRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    updateRequests(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const deleteRequests = /* GraphQL */ `
  mutation DeleteRequests(
    $input: DeleteRequestsInput!
    $condition: ModelRequestsConditionInput
  ) {
    deleteRequests(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      usersRequestsUId
      booksRequestsBookId
    }
  }
`;
export const createBooks = /* GraphQL */ `
  mutation CreateBooks(
    $input: CreateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    createBooks(input: $input, condition: $condition) {
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
export const updateBooks = /* GraphQL */ `
  mutation UpdateBooks(
    $input: UpdateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    updateBooks(input: $input, condition: $condition) {
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
export const deleteBooks = /* GraphQL */ `
  mutation DeleteBooks(
    $input: DeleteBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    deleteBooks(input: $input, condition: $condition) {
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
export const createTransactions = /* GraphQL */ `
  mutation CreateTransactions(
    $input: CreateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    createTransactions(input: $input, condition: $condition) {
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
export const updateTransactions = /* GraphQL */ `
  mutation UpdateTransactions(
    $input: UpdateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    updateTransactions(input: $input, condition: $condition) {
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
export const deleteTransactions = /* GraphQL */ `
  mutation DeleteTransactions(
    $input: DeleteTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    deleteTransactions(input: $input, condition: $condition) {
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
