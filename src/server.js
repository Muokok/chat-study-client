import {io} from "socket.io-client";
const socket = io("http://localhost:5001");//백엔드 서버의 주소로 연결할 수 있는 소켓을 만듦
export default socket;



