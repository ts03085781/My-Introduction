import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { INFORMATION_OF_DEAN } from '@/constants/aiChat';
import { Message } from '@/types/aiChat';
import { MessageRole } from '@/constants/enum';
import { useQuery } from '@tanstack/react-query';
import {
  AudioOutlined,
  AudioMutedOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const fetchAIChat = async (userInput: string) => {
  const conversationHistory = localStorage.getItem('conversationHistory');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: MessageRole.System,
          content: `INFORMATION_OF_DEAN: ${INFORMATION_OF_DEAN}, CONVERSATION_HISTORY: ${conversationHistory}`,
        },
        { role: MessageRole.User, content: userInput },
      ],
    }),
  });
  return response.json();
};

const AIChat: React.FC = () => {
  const { t } = useTranslation();
  const AI_Opening_remarks: Message = {
    role: MessageRole.Assistant,
    content: t('page.aiChat.aiOpeningRemarks'),
  };
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const { isFetching, refetch } = useQuery({
    queryKey: ['aiChat'],
    queryFn: () => fetchAIChat(userInput),
    enabled: false,
  });

  // 語音辨識的 hook，用於語音辨識的結果自動填入 userInput
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // 語音辨識結果自動填入 userInput
  useEffect(() => {
    if (listening) {
      setUserInput(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    const conversationHistory = localStorage.getItem('conversationHistory');
    if (conversationHistory) {
      setChatMessages(JSON.parse(conversationHistory));
    } else {
      setChatMessages([AI_Opening_remarks]);
      localStorage.setItem(
        'conversationHistory',
        JSON.stringify([AI_Opening_remarks])
      );
    }
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { role: MessageRole.User, content: userInput },
    ]);

    const response = await refetch();

    setChatMessages((prev) => [
      ...prev,
      {
        role: MessageRole.Assistant,
        content: response.data.choices[0].message.content || '',
      },
    ]);

    localStorage.setItem(
      'conversationHistory',
      JSON.stringify([
        ...chatMessages,
        { role: MessageRole.User, content: userInput },
        {
          role: MessageRole.Assistant,
          content: response.data.choices[0].message.content || '',
        },
      ])
    );

    setUserInput('');
  };

  // 語音按鈕事件
  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert(t('page.aiChat.browserNotSupported'));
      return;
    }

    if (!isMicrophoneAvailable) {
      alert(t('page.aiChat.microphoneNotAvailable'));
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
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

  const handleClearConversation = () => {
    localStorage.removeItem('conversationHistory');
    setChatMessages([AI_Opening_remarks]);
  };

  return (
    <div>
      {/* 標題 */}
      <h1 className="text-2xl font-bold mb-4">{t('page.aiChat.title')}</h1>
      <div className="flex flex-col h-[calc(100vh-280px)] max-w-[650px] mx-auto">
        <Button
          type="primary"
          color="danger"
          variant="solid"
          className="ml-2 px-4 py-2 rounded-lg mb-4 w-fit"
          onClick={handleClearConversation}
        >
          {t('page.aiChat.clearConversation')}
        </Button>
        {/* 對話訊息顯示區 */}
        <div
          className="flex-1 p-4 overflow-y-auto border rounded-lg mb-4"
          ref={messagesContainerRef}
        >
          {/* 這裡未來會放訊息氣泡 */}
          {chatMessages.map((chatMessage, index) => {
            if (chatMessage.role === MessageRole.User) {
              return (
                <div className="flex justify-end mb-3 pl-8" key={index}>
                  <div className="bg-white dark:bg-gray-700 border rounded-2xl px-4 py-2 inline-block">
                    {chatMessage.content}
                  </div>
                </div>
              );
            }
            if (chatMessage.role === MessageRole.Assistant) {
              return (
                <div className="mb-3 pr-8" key={index}>
                  <div className="bg-gray-100 dark:bg-gray-800 border rounded-2xl px-4 py-2 inline-block">
                    {chatMessage.content}
                  </div>
                </div>
              );
            }
          })}
          {isFetching && (
            <div className="mb-3 pr-8">
              <div className="bg-gray-100 dark:bg-gray-800 border rounded-2xl px-4 py-2 inline-block">
                <LoadingOutlined />
              </div>
            </div>
          )}
        </div>
        {/* 輸入區 */}
        <div className="flex items-center p-3 border rounded-lg">
          <Input
            type="text"
            placeholder={t('page.aiChat.placeholder')}
            className="flex-1 mr-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={isFetching}
            onPressEnter={handleSend}
          />
          <Button
            type={listening ? 'default' : 'dashed'}
            className={` px-4 py-2 rounded-lg font-bold ${listening ? 'bg-red-200' : ''}`}
            onClick={handleVoiceInput}
          >
            {listening ? <AudioMutedOutlined /> : <AudioOutlined />}
          </Button>
          <Button
            type="primary"
            className="px-4 py-2 rounded-lg ml-2"
            onClick={handleSend}
            loading={isFetching}
            disabled={isFetching}
          >
            {t('page.aiChat.send')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
