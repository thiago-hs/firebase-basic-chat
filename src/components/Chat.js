import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from "../firebase-config";

export const Chat = (props) => {

    const { room, setRoom } = props;

    const [newMessage, setNewMessage] = useState('');

    const messageCollection = collection(db, "messages");

    const [messages, setMessages] = useState([]);
     
    useEffect(() => {
        const queryMessages = query(
            messageCollection, 
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            const messages = [];
            snapshot.forEach((docs) => {
                messages.push({ ...docs.data(), id: docs.id });
            });
            console.log(messages);
            setMessages(messages);
        });

        return () => unsuscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage == "") return;

        await addDoc(messageCollection, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room
        });

        setNewMessage("");
    };

    return <div className="chat-app">
        <h3>Welcome to {room}</h3>
        <button onClick={() => { setRoom('') }}>Leave room</button>
        <ul>
            {messages.map(message => <li key={message.id}>
                <strong>{message.user}</strong>: 
                {message.text}
            </li>)}
        </ul>
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input 
                className="new-message-input"
                placeholder="Type your message ..."
                onChange={(e) => { setNewMessage(e.target.value) }}
                value={newMessage}
            />
            <button type="submit" className="send-button">
                Send  
            </button>
        </form>
    </div>;
};