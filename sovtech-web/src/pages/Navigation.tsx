import React from 'react'
import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import "../index.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PeoplePage from './PeoplePage';
import PersonPage from './PersonPage';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:8080/"
});


function Navigation() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<PeoplePage />} />
                    <Route
                        element={<PersonPage/>}
                        path="/person/:id"
                    />
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default Navigation;





