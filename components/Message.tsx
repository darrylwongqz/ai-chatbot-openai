import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatBot = message.user.name === 'AI Chatbot';

  return (
    <div className={`py-5 text-white ${isChatBot && 'bg-[#434654]'}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        <Image
          src={message.user.avatar}
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full object-contain"
        />
        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
