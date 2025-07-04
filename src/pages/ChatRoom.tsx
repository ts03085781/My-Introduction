import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { OnMessageInterface } from '../types/chatRoom';

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import {
  Input,
  Button,
  Avatar,
  message as Message,
  Tooltip,
  ColorPicker,
} from 'antd';

import {
  SendOutlined,
  DisconnectOutlined,
  LinkOutlined,
  AudioMutedOutlined,
  AudioOutlined,
} from '@ant-design/icons';

const ChatRoom: React.FC = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [color, setColor] = useState('#1677ff');
  const [isComposing, setIsComposing] = useState(false);
  const [chatRoomMessages, setChatRoomMessages] = useState<
    OnMessageInterface[]
  >([]);
  const socketRef = useRef<WebSocket | null>(null);
  const chatRoomMessagesRef = useRef<HTMLDivElement>(null);

  // 語音辨識的 hook，用於語音辨識的結果自動填入 userInput
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // 建立連線
  const createSocket = useCallback(() => {
    if (!senderName.trim()) {
      Message.warning('Please enter your name');
      return;
    }

    setIsLoading(true);
    const url = `wss://websocket-server-production-8650.up.railway.app?sender=${encodeURIComponent(senderName)}&color=${encodeURIComponent(color)}`;
    const socket = new WebSocket(url);

    socketRef.current = socket;

    setSocketOnOpen(socket);
    setSocketOnError(socket);
    setSocketOnClose(socket);
    setSocketOnMessage(socket);
  }, [senderName, color]);

  // 連線成功事件
  const setSocketOnOpen = (socket: WebSocket) => {
    socket.onopen = () => {
      setIsConnected(true);
      setIsLoading(false);
      Message.success('已連線');
    };
  };

  // 連線錯誤事件
  const setSocketOnError = (socket: WebSocket) => {
    socket.onerror = (err) => {
      setIsConnected(false);
      setIsLoading(false);
      setUserId(null); // 清空用戶 ID
      Message.error(`錯誤: ${err}`);
    };
  };

  // 關閉連線事件
  const setSocketOnClose = (socket: WebSocket) => {
    socket.onclose = () => {
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
      setUserId(null); // 清空用戶 ID
      Message.warning('聊天室連線關閉');
    };
  };

  // 接收廣播訊息事件
  const setSocketOnMessage = (socket: WebSocket) => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // 設定當前用戶的唯一識別碼
      if (data.type === 'userId') {
        setUserId(data.id);
        return;
      }

      // 將聊天相關訊息加入聊天記錄
      setChatRoomMessages((pre) => [...pre, data]);

      // 同步更新在線人數
      if (data.onlineUsers) {
        setOnlineUsers(data.onlineUsers);
      }
    };
  };

  // 發送訊息到聊天室
  const sendSocket = (messageContent: string) => {
    const isConnected = socketRef.current?.readyState === WebSocket.OPEN;
    if (isConnected && socketRef.current) {
      socketRef.current.send(messageContent);
    } else {
      Message.error('尚未連線至聊天室');
    }
  };

  // 主動關閉 WebSocket 連線
  const closeSocket = () => {
    socketRef.current?.close();
  };

  // 處理發送訊息的事件
  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage) {
      setMessage(''); // 清空輸入框
      sendSocket(trimmedMessage);
    }
  };

  // 語音按鈕事件
  const handleVoiceInput = () => {
    // 檢查瀏覽器是否支援語音辨識
    if (!browserSupportsSpeechRecognition) {
      alert(t('page.aiChat.browserNotSupported'));
      return;
    }

    // 檢查麥克風是否可用
    if (!isMicrophoneAvailable) {
      alert(t('page.aiChat.microphoneNotAvailable'));
      return;
    }

    // 檢查是否正在聆聽
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      // 開始聆聽
      resetTranscript();
      try {
        SpeechRecognition.startListening({
          language: 'zh-TW',
          continuous: false,
        });
      } catch (error) {
        console.error('startListening error:', error);
      }
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

  // 語音辨識結果自動填入 message
  useEffect(() => {
    if (listening) {
      setMessage(transcript);
    }
  }, [transcript, listening]);

  return (
    <div className="h-full max-w-[650px] mx-auto border border-gray-300 rounded-lg p-4 relative">
      {/* 標題 */}
      <h1 className="text-2xl font-bold">Chat Room</h1>
      <p className="text-sm text-gray-400 mt-4 mb-4">
        {isConnected ? `目前有 ${onlineUsers} 人在線上` : '尚未連線'}
      </p>
      <div className="flex gap-2 w-full mt-4 mb-4">
        <Input
          placeholder="Please enter your name..."
          onChange={(e) => setSenderName(e.target.value)}
          value={senderName}
          disabled={isConnected}
        />
        <Tooltip title="頭像底色">
          <ColorPicker
            value={color}
            onChange={(value) => setColor(value.toHexString())}
            disabled={isConnected}
          />
        </Tooltip>
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
              <div
                className={`flex items-center justify-start gap-2 w-full${
                  message.id === userId ? ' flex-row-reverse' : ''
                }`}
              >
                <Avatar
                  className="text-white"
                  src="/src/assets/images/avatarImage.png"
                  size={50}
                  style={{ backgroundColor: message.color }}
                >
                  {message.sender.slice(0, 1)}
                </Avatar>
                <div className="border border-gray-300 w-fit p-2 rounded-lg max-w-[300px]">
                  <span>{message.message}</span>
                  <p
                    className={`text-xs text-gray-400 ${
                      message.id === userId ? 'text-right' : 'text-left'
                    }`}
                  >
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
          onPressEnter={() => {
            if (!isComposing) handleSend();
          }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        {/* 語音輸入 */}
        <Tooltip title={t('page.aiChat.voiceInput')}>
          <Button
            type={listening ? 'default' : 'dashed'}
            className="px-4 py-2 rounded-lg font-bold"
            onClick={handleVoiceInput}
            disabled={!isConnected}
          >
            {listening ? <AudioMutedOutlined /> : <AudioOutlined />}
          </Button>
        </Tooltip>
        {/* 發送按鈕 */}
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
