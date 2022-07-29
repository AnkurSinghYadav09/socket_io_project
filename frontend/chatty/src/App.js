import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

//nodev

const socket = io.connect("http://localhost:5000"); //connect the server side
let username = nanoid(4);

function App() {


  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message,username });  //first pass everyhting here as a payload
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  }, [chat]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>chatty app</h2>
        {chat.map((payload, index) => {
          return <p key={index}>{payload.message} : <span style={{backgroundColor:"blue"}}> id: {payload.username}</span></p>;
        })}

        <form onSubmit={sendChat}>
          <input
            value={message}
            type="text"
            placeholder="send Text"
            name="chat"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
