'use client';

import { useEffect, useRef } from 'react';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import {
  collection,
  orderBy,
  query,
  QueryDocumentSnapshot,
  DocumentData,
  Query,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import { ClipLoader } from 'react-spinners';

type Props = {
  chatId: string;
};

interface ChatMessage {
  text: string;
  createdAt: Date | null;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  // Ensure session and user email exist before querying Firestore
  const userEmail = session?.user?.email;
  const messagesQuery =
    userEmail &&
    query(
      collection(db, 'users', userEmail, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    );

  const [messages, loading, error] = useCollection(
    messagesQuery as Query<DocumentData, DocumentData>
  );

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden p-4">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="#ffffff" size={30} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500">
          <p>Failed to load messages. Please try again later.</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {/* No Messages State */}
      {!loading && messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt below to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
        const message = doc.data() as ChatMessage;
        return <Message key={doc.id} message={message} />;
      })}

      <div ref={chatEndRef} />
    </div>
  );
}

export default Chat;
