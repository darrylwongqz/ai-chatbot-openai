'use client';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { FormEvent, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import ModelSelection from './ModelSelection';
import { useSession } from 'next-auth/react';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const { data: model } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo',
  });
  const { data: session } = useSession();

  const generateResponse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = prompt.trim();
    setPrompt('');

    if (!prompt) return;

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    // Add user message to Firestore
    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    const notification = toast.loading('AI Chatbot is thinking...');

    try {
      const response = await fetch('/api/askQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input, chatId, model, session }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      // Success toast
      toast.success('ChatGPT has responded!', { id: notification });
    } catch (error) {
      console.error('Failed to fetch response:', error);

      // Failure toast
      toast.error('Failed to fetch response. Please try again.', {
        id: notification,
      });
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm focus:outline-none">
      <form onSubmit={generateResponse} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1
            disabled:cursor-not-allowed disabled:text-gray-300
          "
          value={prompt}
          placeholder="Type your message here..."
          onChange={(e) => setPrompt(e.target.value)}
          disabled={!session}
        />

        <button
          disabled={!prompt || !session}
          className="
            bg-[#11A37F] hover:opacity-50 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed
        "
          type="submit"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
