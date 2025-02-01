'use client';

import { useParams } from 'next/navigation';
import Chat from './Chat';
import ChatInput from './ChatInput';

export default function ChatAggregate() {
  const params = useParams();
  const chatId = params?.id as string;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={chatId} />
      <ChatInput chatId={chatId} />
    </div>
  );
}
