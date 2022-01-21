import React, { useCallback, useEffect, useState } from 'react'
import { ApolloProvider, useQuery } from '@apollo/client';
import { ApolloClient, gql, } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'

import "./index.scss";
import { IPerson, IResults } from './utils/interface';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8080/"
});


const GET_PEOPLE = gql`
query PeopleQuery {
  results {
    count,
    next,
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

const GET_PERSON = gql`
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
function People() {
    return (
        <ApolloProvider client={client}>
            <Navigation />
        </ApolloProvider>
    )
}

export default People;


function Navigation() {
    return <Router>
        <Routes>
            <Route path="/" element={<PeoplePage />} />
            <Route
                element={<PersonPage person={undefined} />}
                path="/person/:id"
            // element={<PersonPage />} 
            />
        </Routes>
    </Router>
}

function PeoplePage() {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_PEOPLE);
   
    const results: IResults | undefined = data?.results;
    

    return (
        <div className="flex flex-col max-h-screen p-4 overflow-hidden text-3xl text-white bg-black max-w-screen">
            <h2 style={{ fontFamily: "Distant Galaxy" }} className='flex-grow-0 text-lg font-extrabold text-center'>Star Wars Characters</h2>

            <section style={{ fontSize: "12px" }} className='flex flex-col justify-start  px-10 my-6 overflow-y-auto font-light text-center snap-proximity scroll-mr-2.5'>
                <div className='flex justify-center p-2 m-1 text-white bg-gray-900 rounded-t-md '>Top</div>

                {loading ? <div className='flex justify-center w-full h-full align-middle bg-yellow-300'><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                </svg></div> : (results ? results.results.map(({ name, height, gender, mass, homeworld }, i) => {
                    const state: any = { person: name }
                    return <div key={name + "_" + i} className='flex justify-between p-2 m-1 bg-gradient-to-tr from-gray-700 via-gray-700 to-gray-900 hover:bg-gray-600' >
                        <div className='flex flex-col justify-start'>
                            <a href='#' onClick={() => navigate(`/person/${name}`, { state })} type='button' className='text-base font-semibold hover:text-gray-600'>{name}</a>
                            <h6 className='text-left text-gray-400'> {gender}</h6>
                        </div>
                        <div className='flex flex-col'>
                            <div>{`${height} cm`}</div>
                            <div>{`${mass} kg`}</div>
                        </div>

                    </div>
                }) : null)}
                <div className='flex justify-center p-2 m-1 text-white bg-gray-900 rounded-b-md'>End</div>
            </section>

            <footer className="flex items-center justify-between flex-grow-0 px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex justify-between flex-1 sm:hidden">
                    <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Previous
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing
                            <span className="mx-1 font-medium">1</span>
                            to
                            <span className="mx-1 font-medium">10</span>
                            of
                            <span className="mx-1 font-medium">{results ? results.count : 0}</span>
                            Characters
                        </p>
                    </div>
                    <div>
                        <nav className='flex align-middle'>
                            <a href="#" className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" --> */}
                            <a href="#" aria-current="page" className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-500 bg-indigo-50">
                                1
                            </a>

                            <a href="#" className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>


        </div>
    )
}

function PersonPage({ person }) {
    const { id } = useParams()
    const location = useNavigate()
    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { person: id },
    });

    const result: IPerson | undefined = data?.person;
    useEffect(() => {
        console.log("person: ", person);

    }, [person])

    useEffect(() => {
        console.log("PersonPage data: ", data);

    }, [data])
    return (
        <div className="flex flex-col justify-center min-h-screen p-4 overflow-hidden text-3xl text-white bg-black max-w-screen">
            <div style={{ fontSize: "12px" }} className='flex flex-col justify-start flex-grow px-10 my-6 overflow-y-auto font-light text-center'>
                <div className='flex justify-between p-2 m-1 text-black align-middle bg-gray-700 rounded-t-md'>
                    <div className='flex justify-start flex-grow-0 text-white hover:text-gray-500'>
                        <a href="#" onClick={() => location(-1)} >Back</a>
                    </div>
                    <div className='flex justify-center flex-grow'>

                        <h2 style={{ fontFamily: "Distant Galaxy" }} className='flex-grow-0 text-lg font-extrabold text-center text-gray-300'>{id}</h2>
                    </div>
                </div>
                <pre>{JSON.stringify(result, null, '\t')}</pre>
                <div className='flex justify-center p-2 m-1 text-black bg-gray-700 rounded-b-md'></div>
            </div>

        </div>
    )
}
