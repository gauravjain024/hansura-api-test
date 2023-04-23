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


export const FIND_USERS = gql`
query findusers($radius: Int!) {
    findusers(args: {bound: $radius, lat1: 43.76417, long1: 11.25869}) {
      user{
        first_name
        gender
        id
        last_name
      }
    }
  }
`;