export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    phone: String
    department: String
    year: Int
    profileImage: String
    createdAt: String
    updatedAt: String
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Query {
    students: [Student!]!
    student(id: ID!): Student
    me: User
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthResponse!
    login(email: String!, password: String!): AuthResponse!

    addStudent(
      name: String!
      email: String!
      phone: String
      department: String
      year: Int
      profileImage: String
    ): Student!

    updateStudent(
      id: ID!
      name: String
      email: String
      phone: String
      department: String
      year: Int
      profileImage: String
    ): Student!

    deleteStudent(id: ID!): String!
  }
`;