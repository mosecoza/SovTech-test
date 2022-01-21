import React from 'react'
import { IPerson } from '../utils/interface'
export interface IPeopleEntry {
    person: IPerson,
    click: (name: string) => void
}
const PeopleEntry: React.FC<IPeopleEntry> = ({ person, click }) => {
    return (
        <div className='flex justify-between p-2 m-1 bg-gray-800 hover:bg-gray-600' >
            <div className='flex flex-col justify-start'>
                <a href='#'
                    onClick={() => click(person.name as string)}
                    type='button'
                    className='text-base font-semibold hover:text-yellow-400'>
                    {person.name}
                </a>
                <h6 className='text-left text-gray-400'> {person.gender}</h6>
            </div>
            <div className='flex flex-col'>
                <div>{`${person.height} cm`}</div>
                <div>{`${person.mass} kg`}</div>
            </div>

        </div>
    )
}

export default PeopleEntry
