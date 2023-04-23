import { gql } from "graphql-request";

export const GET_USERS = gql`
query getUsers {
    user(limit: 10, offset: 10, order_by: {id: asc}) {
      id
      first_name
      last_name
      gender
    }
}
`;