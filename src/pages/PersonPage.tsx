import { useQuery } from '@apollo/client';
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PersonDetailsEntry from '../components/PersonDetailsEntry';
import { IPerson } from '../utils/interface';
import { GET_PERSON } from '../utils/queries';

function PersonPage() {
    const { id } = useParams();
    const location = useNavigate();
    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { person: id },
    });

    const result: IPerson | undefined = data?.person;

    return (
        <div className="flex flex-col justify-center min-h-screen p-4 overflow-hidden text-3xl text-white bg-black max-w-screen">
            <div style={{ fontSize: "12px" }} className='flex flex-col justify-start flex-grow px-10 my-6 overflow-y-auto font-light text-center'>
                <div className='flex justify-between p-2 m-1 text-black align-middle bg-gray-700 rounded-t-md'>
                    <div className='flex justify-start flex-grow-0 text-yellow-500 hover:text-yellow-200'>
                        <a href="#" onClick={() => location(-1)} >Back</a>
                    </div>
                    <div className='flex justify-center flex-grow'>

                        <h2 style={{ fontFamily: "Distant Galaxy" }} className='flex-grow-0 text-lg font-extrabold text-center text-gray-300'>{id}</h2>
                    </div>
                </div>
                {loading ? <Loader/>: <div className='px-10 mx-10'>
                    <PersonDetailsEntry title="Gender" text={result ? result.gender : null}/>
                    <PersonDetailsEntry title="Height" text={result ? result.height : null}/>
                    <PersonDetailsEntry title="Mass" text={result ? result.mass : null}/>
                    <PersonDetailsEntry title="Homeworld" text={result ? result.homeworld : null}/>
                </div>}
                <div className='flex justify-center p-2 m-1 text-black bg-gray-700 rounded-b-md'></div>
            </div >

        </div >
    )
}

export default PersonPage;
