import { gql } from 'apollo-server-express';

const typeDefs = gql`
	type Person {
		id: Int
		name: String
        height: String
        mass: String
        gender: String
		homeworld: String
	}
	type Query {
		allPeople: [Person]
		person(id: Int!): Person
	}
`;

export default typeDefs