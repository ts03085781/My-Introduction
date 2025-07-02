import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Button, Avatar, message as Message, Tooltip } from 'antd';
// import { useTranslation } from 'react-i18next';
import { OnMessageInterface } from '../types/chatRoom';
import {
  SendOutlined,
  DisconnectOutlined,
  LinkOutlined,
} from '@ant-design/icons';

const ChatRoom: React.FC = () => {
  //   const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatRoomMessages, setChatRoomMessages] = useState<
    OnMessageInterface[]
  >([]);
  const socketRef = useRef<WebSocket | null>(null);
  const chatRoomMessagesRef = useRef<HTMLDivElement>(null);

  // 建立連線
  const createSocket = useCallback(() => {
    if (!senderName.trim()) {
      Message.warning('Please enter your name');
      return;
    }

    setIsLoading(true);
    const url = `wss://websocket-server-production-8650.up.railway.app?sender=${encodeURIComponent(senderName)}`;
    const socket = new WebSocket(url);

    socketRef.current = socket;

    // 連線成功事件
    socketRef.current.onopen = () => {
      setIsConnected(true);
      setIsLoading(false);
      Message.success('已連線');
    };

    // 連線錯誤事件
    socketRef.current.onerror = (err) => {
      setIsConnected(false);
      setIsLoading(false);
      Message.error(`錯誤: ${err}`);
    };

    // 關閉連線事件
    socketRef.current.onclose = () => {
      setChatRoomMessages((prev) => [
        ...prev,
        {
          type: 'close',
          sender: senderName,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setOnlineUsers(0);
      setIsConnected(false);
      setIsLoading(false);
      Message.warning('聊天室連線關閉');
    };

    // 接收廣播訊息事件
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
      Message.error('尚未連線1');
    }
  };

  // 關閉連線
  const closeSocket = () => {
    socketRef.current?.close();
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
      sendSocket(message);
    }
  };

  // 組件卸載時關閉連線
  useEffect(() => {
    return () => {
      closeSocket();
    };
  }, []);

  // 偵測有新訊息時自動捲動到最下方
  useEffect(() => {
    const container = chatRoomMessagesRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [chatRoomMessages]);

  return (
    <div className="h-full max-w-[650px] mx-auto border border-gray-300 rounded-lg p-4 relative">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Chat Room</h1>
      <p className="text-sm text-gray-400 mt-4 mb-4">
        目前有 {onlineUsers} 人在線
      </p>
      <div className="flex gap-2 w-full mt-4 mb-4">
        <Input
          placeholder="Please enter your name..."
          onChange={(e) => setSenderName(e.target.value)}
          value={senderName}
          disabled={isConnected}
        />
        <Tooltip title="連線至聊天室">
          <Button
            color="primary"
            variant="solid"
            onClick={createSocket}
            disabled={isConnected || isLoading}
          >
            <LinkOutlined />
          </Button>
        </Tooltip>
        <Tooltip title="關閉連線">
          <Button
            color="danger"
            variant="solid"
            onClick={closeSocket}
            disabled={!isConnected}
          >
            <DisconnectOutlined />
          </Button>
        </Tooltip>
      </div>
      <div
        className="flex flex-col h-[calc(100vh-435px)] overflow-y-auto border border-gray-300 rounded-lg p-2 gap-2"
        ref={chatRoomMessagesRef}
      >
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
                className="flex justify-center rounded-lg p-2 bg-green-100"
                key={index}
              >
                <p>{message.sender} 加入聊天室</p>
              </div>
            )}
            {/* 離開聊天室 */}
            {message.type === 'close' && (
              <div
                className="flex justify-center rounded-lg p-2 bg-gray-100"
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
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          disabled={!isConnected}
          onPressEnter={handleSend}
        />
        <Tooltip title="送出訊息">
          <Button type="primary" onClick={handleSend} disabled={!isConnected}>
            <SendOutlined />
          </Button>
        </Tooltip>
      </div>
      <div className="absolute top-4 right-5 text-sm text-gray-600">
        連線狀態: {isConnected ? '連線中' : '未連線'}
      </div>
    </div>
  );
};

export default ChatRoom;
