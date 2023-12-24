import React, { useState, useEffect } from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = (token) => {
    let [notes, setNotes] = useState([])


    useEffect(() => {
        if (token) {
            getNotes(token)
        }
    }, [token])

    let getNotes = async () => {
        try {
            let response = await fetch('https://notetaker-f5lt.onrender.com/notes', {
                headers: {
                    Authorization: `Token ${token.token}`,
                    Accept: "application/json"
                }
            });
            let data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <div className='notes'>
            <div className='notes-list'>
                <div className='notes-header'>
                    <h2 className='notes-title'>&#9782; Notes</h2>
                    <p className='notes-count'>{notes.length}</p>
                </div>
                {!notes ? (
                    <div>
                        No notes found
                    </div>
                ) : (Array.from(notes).map((note, index) => (
                    <ListItem key={index} note={note} />
                ))
                )}

            </div>
            <AddButton />
        </div >


    )
}

export default NotesListPage