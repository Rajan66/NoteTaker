import React, { useState, useEffect } from 'react'
// import notes from '../assets/data'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = (token) => {
    const { id } = useParams()
    const navigate = useNavigate();
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    let getNote = async () => {
        if (id === 'new') return
        let response = await fetch(`https://notetaker-f5lt.onrender.com/notes/${id}`, {
            headers: {
                Authorization: `Token ${token.token}`,
                Accept: "application/json"
            }
        })
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        await fetch(`https://notetaker-f5lt.onrender.com/notes/`, {
            method: 'POST',
            headers: {
                Authorization: `Token ${token.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updatedAt': new Date() })
        })
    }

    let updateNote = async () => {
        await fetch(`https://notetaker-f5lt.onrender.com/notes/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Token ${token.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updatedAt': new Date() })
        })
    }

    let deleteNote = async () => {
        await fetch(`https://notetaker-f5lt.onrender.com/notes/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Token ${token.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate(`/`)
    }


    let handleSubmit = (e) => {
        if (id !== 'new' && !note.body) {
            deleteNote()
        } else if (id !== 'new') {
            updateNote()
        } else if (id === 'new' && note.body !== null) {
            createNote()
        }
        navigate(`/`)
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to='/'>
                        <ArrowLeft onClick={handleSubmit} />
                    </Link>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e) => { setNote({ ...note, 'body': e.target.value }) }} value={note?.body}>
            </textarea>
        </div >
    )
}

export default NotePage