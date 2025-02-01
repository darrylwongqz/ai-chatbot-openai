'use client';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, 'users', session?.user?.email!, 'chats'),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    router.push(`
        /chat/${doc.id}
    `);
  };

  return (
    <div
      className="border-gray-700 border chatRow items-center justify-center"
      onClick={createNewChat}
    >
      <PlusIcon className="h-4 w-4" />
      <p className="hidden md:inline-flex flex-1">New Chat</p>
    </div>
  );
}

export default NewChat;
