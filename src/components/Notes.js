import React, { useState, useEffect } from 'react';
import { auth, db, signOut } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotesContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
`;

const Title = styled.h2`
    color: #333;
    text-align: center;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    margin-bottom: 20px;
    &:hover {
    background-color: #0056b3;
    }
`;

const Form = styled.form`
    display: flex;
    margin-bottom: 20px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = db.collection('notes').onSnapshot((snapshot) => {
            const notesData = [];
            snapshot.forEach((doc) => notesData.push({ ...doc.data(), id: doc.id }));
            setNotes(notesData);
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        try {
            await db.collection('notes').add({ text: newNote });
            setNewNote('');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await db.collection('notes').doc(id).delete();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NotesContainer>
            <Title>Notes</Title>
            <Button onClick={handleLogout}>Logout</Button>
            <Form onSubmit={addNote}>
                <Input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="New note"
                />
                <Button type="submit">Add Note</Button>
            </Form>
            <List>
                {notes.map((note) => (
                    <ListItem key={note.id}>
                        {note.text}
                        <Button onClick={() => deleteNote(note.id)}>Delete</Button>
                    </ListItem>
                ))}
            </List>
        </NotesContainer>
    );
};

export default Notes;
