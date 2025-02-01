'use client';

import { useState } from 'react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';

function SideBar() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [isHovered, setIsHovered] = useState(false);

  // Ensure session is available before querying Firestore
  const chatQuery = userEmail
    ? collection(db, 'users', userEmail, 'chats')
    : null;
  const [chats, loading, error] = useCollection(chatQuery);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {session ? (
          <div>
            <NewChat />

            <div className="hidden sm:inline">
              <ModelSelection />
            </div>

            <div className="flex flex-col space-y-2 my-2">
              {loading && (
                <div className="animate-pulse text-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-center">
                  <p>Failed to load chats. Please try again.</p>
                </div>
              )}

              {chats?.docs?.length === 0 && !loading && !error && (
                <div className="text-gray-400 text-center">
                  <p>No chats found. Start a new chat!</p>
                </div>
              )}

              {chats?.docs?.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-gray-300 animate-pulse">
              Sign in to view Chats
            </h2>
          </div>
        )}
      </div>

      {session && (
        <div className="relative mx-auto mb-2 sm:hidden">
          <Image
            src={session.user?.image || '/default-avatar.png'}
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover cursor-pointer hover:opacity-50"
            onClick={() => signOut()}
          />
        </div>
      )}

      {session && (
        <div className="absolute bottom-4 left-2 w-fit max-w-[150px]">
          <div
            className={`hidden sm:flex items-center justify-between rounded-full transition-all duration-300 ease-in-out mb-2 ml-1 overflow-hidden ${
              isHovered
                ? 'w-36 px-4 py-2 bg-red-500'
                : 'w-20 px-2 py-1 bg-[#11A37F]'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* ✅ User Avatar */}
            <Image
              src={session.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

            {/* ✅ Heroicon Chevron Double Right (Only when not hovered) */}
            {!isHovered && (
              <div className="flex items-center justify-center w-6 h-6">
                <ChevronDoubleRightIcon className="w-6 h-6 text-white animate-pulse" />
              </div>
            )}

            {/* ✅ Sign Out Button (Visible only on hover) */}
            {isHovered && (
              <button
                onClick={() => signOut()}
                className="ml-3 text-white text-sm font-medium animate-pulse"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
