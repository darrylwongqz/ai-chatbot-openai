# AI Chatbot

A production-ready AI Chatbot built with Next.js 15 and Firebase Firestore. This application allows users to interact with OpenAI’s LLM models through a conversational interface. Users can manage multiple chat sessions, view their chat history (persisted in Firestore), delete chats, and authenticate via Google OAuth2.

## Hosted Version

A hosted version of the production build is available at:  
[https://ai-chatbot-eqibipeui-darrylwongqzs-projects.vercel.app/](https://ai-chatbot-eqibipeui-darrylwongqzs-projects.vercel.app/)

## Introduction

This app is an AI Chatbot that enables users to:
- **Interact with OpenAI LLM models:** Engage in conversational chat sessions with an AI assistant.
- **Manage Multiple Chat Sessions:** Each chat session is stored in a backend Firestore database, preserving the user’s conversation history.
- **Delete Chat Sessions:** Users can remove any chat they no longer need, permanently deleting the conversation from Firestore.
- **Authenticate via Google OAuth2:** Securely sign in and out using Google credentials.
- **Maintain Conversational Context:** The AI assistant is provided with the context of the current conversation (up to the last 10 messages) whenever a new message is sent, ensuring coherent interactions.

## Getting Started

Follow these instructions to run the application locally in development mode or in production mode.

### Prerequisites

- **Node.js** (v14 or later recommended)
- **npm** (v6 or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/darrylwongqz/ai-chatbot-openai.git
   cd ai-chatbot-openai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
Before running the application, you need to configure your environment variables. Create a .env.local file at the root of your project and add the following variables:
```
# OpenAI API Key - used to authenticate requests to OpenAI's API
OPENAI_API_KEY=OPENAIKEY_GOES_HERE

# Google OAuth2 Credentials - required for user authentication
GOOGLE_ID=GOOGLE_ID_GOES_HERE
GOOGLE_SECRET=GOOGLE_KEY_GOES_HERE

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=example_secret

# Firebase Service Account Key - required for Firebase Admin API to function.
# IMPORTANT: For the FIREBASE_SERVICE_ACCOUNT_KEY, remove all line breaks from your JSON file.
# You can use a tool like https://www.textfixer.com/tools/remove-line-breaks.php to achieve this.
FIREBASE_SERVICE_ACCOUNT_KEY=YOUR_FIREBASE_SERVICE_ACCOUNT_KEY_GOES_HERE
```

Notes:
1. Replace the placeholder values with your actual API keys and credentials
2. The FIREBASE_SERVICE_ACCOUNT_KEY should be the entire JSON string without any line breaks.
3. Ensure that this file is never committed to version control (add it to your .gitignore).

### Running the Application

#### Development Mode

To run the application in development mode, execute:

```bash
npm run dev
```

This command starts the Next.js development server (usually available at [http://localhost:3000](http://localhost:3000)). The server features hot-reloading, so any changes you make to the source code will update automatically.

#### Production Mode

To build and run the production version of the app, follow these steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm run start
   ```

This will launch the optimized production build of the application, configured for use with Firebase Firestore and Google OAuth2 authentication.

## Additional Information

For more details on how the application is architected and deployed, please refer to the [Architecture Documentation](https://docs.google.com/document/d/1ggqIbTJHwe9LioAQ_Mhkk4VkYQ-r5KLe0MxhoVuiNMY/edit?usp=sharing).

---

Happy coding!
