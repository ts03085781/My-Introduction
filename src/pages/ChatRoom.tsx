import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, Avatar, Modal } from 'antd';
// import { useTranslation } from 'react-i18next';
import { OnMessageInterface } from '../types/chatRoom';

const ChatRoom: React.FC = () => {
  //   const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [chatRoomMessages, setChatRoomMessages] = useState<
    OnMessageInterface[]
  >([]);
  const socketRef = useRef<WebSocket | null>(null);

  // 建立連線
  const createSocket = useCallback(() => {
    const url = `wss://websocket-server-production-8650.up.railway.app?sender=${encodeURIComponent(senderName)}`;
    const socket = new WebSocket(url);
    socketRef.current = socket;
    socketRef.current.onopen = () => console.log('已連線');
    socketRef.current.onerror = (err) => console.error('錯誤', err);
    socketRef.current.onclose = () => console.log('連線關閉');
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChatRoomMessages((prev) => [...prev, data]);
      setOnlineUsers(data.onlineUsers);
    };
  }, [senderName]);

  // 發送訊息函式
  const sendSocket = (data: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    } else {
      console.warn('尚未連線');
    }
  };

  // 關閉連線
  const closeSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    } else {
      console.warn('尚未連線');
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
      sendSocket(message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSenderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenderName(e.target.value);
  };

  const handleModalOk = () => {
    if (senderName.trim()) {
      setIsModalOpen(false);
      createSocket();
    } else {
      alert('Please enter your name');
    }
  };

  const returnModalFooter = () => {
    return (
      <Button type="primary" onClick={handleModalOk}>
        Send
      </Button>
    );
  };

  useEffect(() => {
    return () => {
      closeSocket();
    };
  }, [closeSocket]);

  return (
    <div className="h-full max-w-[650px] mx-auto border border-gray-300 rounded-lg p-4">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Chat Room</h1>
      <p className="text-sm text-gray-400 mt-4 mb-4">
        目前有 {onlineUsers} 人在線
      </p>
      <div className="flex flex-col h-[calc(100%-138px)] border border-gray-300 rounded-lg p-2 gap-2">
        {/* 聊天室訊息 */}
        {chatRoomMessages.map((message, index) => (
          <div className="flex justify-center rounded-lg" key={index}>
            {/* 訊息氣泡 */}
            {message.type === 'message' && (
              <div className="flex items-center justify-start gap-2 w-full">
                <Avatar
                  className="bg-blue-500 text-white"
                  src="/src/assets/images/avatarImage.png"
                  size={50}
                >
                  {message.sender}
                </Avatar>
                <div className="border border-gray-300 w-fit p-2 rounded-lg">
                  <p>{message.message}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}
            {/* 加入聊天室 */}
            {message.type === 'join' && (
              <div
                className="flex justify-center rounded-lg p-4 bg-green-100"
                key={index}
              >
                <p>{message.sender} 加入聊天室</p>
              </div>
            )}
            {/* 離開聊天室 */}
            {message.type === 'close' && (
              <div
                className="flex justify-center rounded-lg p-4 bg-red-100"
                key={index}
              >
                <p>{message.sender} 離開聊天室</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 w-full mt-4">
        <Input
          placeholder="Please enter your message..."
          onChange={handleInputChange}
          value={message}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
      {/* 輸入名字彈窗 */}
      <Modal
        open={isModalOpen}
        closable={false}
        maskClosable={false}
        footer={returnModalFooter}
      >
        <Input
          placeholder="Please enter your name..."
          onChange={handleSenderNameChange}
          value={senderName}
        />
      </Modal>
    </div>
  );
};

export default ChatRoom;
