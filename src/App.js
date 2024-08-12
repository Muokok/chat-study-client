import "./App.css";
import socket from "./server";
import {useEffect, useState} from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import ChatPage from "./pages/Chatpage/Chatpage";
function App() {
    const [user, setUser] = useState(null); // 유저 정보를 저장한다.
    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        socket.on("rooms", (res) => {
            setRooms(res);
        });

        askUserName();
    }, []);
    const askUserName=()=>{
        const userName = prompt("당신의 이름을 입력하세요.")   
        console.log(userName);

        socket.emit("login",userName,(res)=>{//.emit(대화의 제목, 보낼 내용, 콜백함수)
            //.emit이 잘 처리가 되면 마지막에 콜백함수로 응답을 받을 수 있다.
           if(res?.ok){
               setUser(res.data);
           }
        });
    };
    //MessageContainer 코드는 채팅 입력시 내용이 뜨도록 하는 코드. 내가 작성한 메시지는 오른쪽, 다른 메시지는 왼쪽에 뜨도록 한다.
  /*return (
    <div>
      <div className="App">
          <MessageContainer messageList={messageList} user = {user}/>


          <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
   */

    //2개의 페이지를 만들기 위한 프로젝트 구조 수정
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<RoomListPage rooms={rooms} />} />
                <Route exact path="/room/:id" element={<ChatPage user={user} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
