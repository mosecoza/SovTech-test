import { ApolloServer, gql } from "apollo-server";
import { RESTDataSource } from 'apollo-datasource-rest';
import PeopleAPI from "./star-wars-api";


const typeDefs = gql`
  type PageInfo {
  startCursor: String!
  endCursor: String!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
}

type EventEdge {
  cursor: String!
}

type EventConnection {
  edges: [EventEdge]
  pageInfo: PageInfo!
}
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld:String
  }

  type Results {
    count: Int
    next: String
    previous: String
    results: [Person]
  }


  type Query {
    results(current_page: Int, page_limit: Int): Results
    person(person: String!) :  Person

  }
`;


const resolvers = {
  Query: {
    results: async (_: any, {current_page, page_limit}: any, { dataSources }: any) => {

      
      return dataSources.PeopleAPI.getPeople(current_page, page_limit);
    },
    person: async(_: any, { person = "Boba Fett" }: any, { dataSources }: any)=>{
      return dataSources.PeopleAPI.getPerson(person);
    }
  },
};
const SERVERCONFIG = {
  typeDefs,
  resolvers,
  dataSources: ()=> ({
    PeopleAPI:  new PeopleAPI(),
  }  ) ,
};

const server = new ApolloServer(SERVERCONFIG);

server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`🚀  sovtech-api ready at ${url}`);
});
