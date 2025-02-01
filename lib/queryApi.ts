import { adminDb } from '../firebaseAdmin';
import openai from './chatgpt';

interface FirestoreMessage {
  text: string;
  createdAt: FirebaseFirestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
}

interface OpenAIMessage {
  role: 'user' | 'assistant';
  content: string;
}

const query = async (
  prompt: string,
  chatId: string,
  model: string,
  userEmail: string
): Promise<string> => {
  try {
    // Fetch last 10 messages from Firestore for context
    const messagesSnapshot = await adminDb
      .collection('users')
      .doc(userEmail)
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const previousMessages: FirestoreMessage[] = messagesSnapshot.docs
      .map((doc) => doc.data() as FirestoreMessage)
      .reverse(); // Reverse to maintain chronological order

    const formattedMessages: OpenAIMessage[] = previousMessages.map((msg) => ({
      role: msg.user._id === 'AI-Chatbot' ? 'assistant' : 'user',
      content: msg.text,
    }));

    formattedMessages.push({ role: 'user', content: prompt });

    const res = await openai.chat.completions.create({
      model,
      messages: formattedMessages,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return res.choices[0]?.message?.content || 'No response from AI';
  } catch (err) {
    console.error('OpenAI API Error:', err);
    return `AI Chatbot was unable to find an answer for that! (Error: ${
      (err as Error).message
    })`;
  }
};

export default query;
