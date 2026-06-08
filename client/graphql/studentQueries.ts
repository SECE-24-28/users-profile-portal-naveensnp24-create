import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query Students {
    students {
      id
      name
      email
      phone
      department
      year
      profileImage
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation AddStudent(
    $name: String!
    $email: String!
    $phone: String
    $department: String
    $year: Int
    $profileImage: String
  ) {
    addStudent(
      name: $name
      email: $email
      phone: $phone
      department: $department
      year: $year
      profileImage: $profileImage
    ) {
      id
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: ID!
    $name: String
    $email: String
    $phone: String
    $department: String
    $year: Int
    $profileImage: String
  ) {
    updateStudent(
      id: $id
      name: $name
      email: $email
      phone: $phone
      department: $department
      year: $year
      profileImage: $profileImage
    ) {
      id
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id)
  }
`;