import { gql } from "@apollo/client/core";

export const GET_PEOPLE = gql`
query PeopleQuery($current_page:Int, $page_limit:Int) {
  results(current_page:$current_page,page_limit:$page_limit) {
    count,
    next,
    previous,
    results {
      name
      gender
      mass
      height
      homeworld
    }
  } 
}
`;

export const GET_PERSON = gql`
  query GetPERSON($person: String!)  {
    person(person: $person) {
        name
        gender
        mass
        height
        homeworld
    }
  }
`;