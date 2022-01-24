import { useLazyQuery, QueryLazyOptions } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PeopleEntry from '../components/PeopleEntry';
import { GET_PEOPLE } from '../utils/queries';

function PeoplePage() {

    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageLength, setPageLength] = useState(10);
    const navigate = useNavigate();

    const [getPeople, { loading, error, data }] = useLazyQuery(GET_PEOPLE, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first"
    });

    useEffect(() => {

        window.location.hash = window.location.hash ? window.location.hash : current.toString();

        getPeople({
            variables: {
                current_page: parseInt((window.location.hash).split("#")[1]),
                page_limit: pageLength,
            }
        } as QueryLazyOptions<{ current_page: number; page_limit: number; }>);

    }, []);


    useEffect(() => {
        if (data?.results) {
            setCurrent(data.results.previous ? (parseInt((data.results.previous).split("=")[2])) + 1 : parseInt((data.results.next).split("=")[2]) - 1 as number);
            setPages(Array.from(Array(Math.ceil((data.results.count as number) / pageLength)).keys()));
        }
    }, [data]);

    function goToPerson(name: string) {
        navigate(`/person/${name}`)
    }

    return (
        <div className="flex flex-col max-h-screen p-4 overflow-hidden text-3xl text-white bg-black max-w-screen">
            <h2 style={{ fontFamily: "Distant Galaxy" }} className='flex-grow-0 text-lg font-extrabold text-center'>Star Wars Characters</h2>
            <section style={{ fontSize: "12px" }} className='flex flex-col justify-start  px-10 my-6 overflow-y-auto font-light text-center snap-proximity scroll-mr-2.5'>
                <div className='flex justify-center p-2 m-1 text-white bg-gray-900 rounded-t-md '>Top</div>

                {loading ? <Loader /> : (data && data.results ? data.results.results.map(
                    ({ name, height, gender, mass, homeworld }, i) => <PeopleEntry key={name + "_" + i} click={goToPerson} person={{ name, height, gender, mass, homeworld }} />) : null)
                }
                <div className='flex justify-center p-2 m-1 text-white bg-gray-900 rounded-b-md'>End</div>
            </section>

            <footer className="flex items-center justify-between flex-grow-0 px-4 py-3 border-t border-gray-200 sm:px-6">

                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="mx-1 font-medium">1</span>
                        to
                        <span className="mx-1 font-medium">10</span>
                        of
                        <span className="mx-1 font-medium">{data && data.result ? data.results.count : 0}</span>
                        Characters
                    </p>
                </div>
                <div>
                    <nav className='flex align-middle'>
                        <a
                            href="#"
                            aria-disabled={data && data.result ? !data.results.previous : true}
                            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {pages.length ? pages.map((page: number) => <a
                            onClick={async () => {
                                setCurrent((page + 1))
                                getPeople({
                                    variables: {
                                        current_page: page + 1,
                                        page_limit: pageLength
                                    }
                                } as QueryLazyOptions<{ current_page: number; page_limit: number; }>)

                            }}

                            key={page + "_pagination"}
                            href="#"
                            aria-current="page"
                            className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium ${current == (page + 1) ? 'z-10 bg-yellow-50 border-yellow-500 text-yellow-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} `}>
                            {page + 1}
                        </a>) : null}

                        <a aria-disabled={data && data.result ? !data.results.next : true} href="#" className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            
            </footer>


        </div>
    )
}

export default PeoplePage
