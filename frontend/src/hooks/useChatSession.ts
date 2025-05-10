import { useState, useEffect } from 'react';
import { generateChatId, sendMessageToWebhook } from '@/lib/chatUtils';

export const useChatSession = () => {
    const [chatId, setChatId] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean; timestamp: Date }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Initialize chat with chatId from cookie
    useEffect(() => {
        const storedChatId = getChatIdFromCookie();
        const id = storedChatId || generateChatId();

        setChatId(id);
        if (!storedChatId) {
            setChatIdCookie(id);
        }

        addWelcomeMessage();
    }, []);

    const getChatIdFromCookie = () => {
        const cookieName = "chat_id=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    };

    const setChatIdCookie = (chatId: string) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        document.cookie = `chat_id=${chatId};expires=${expirationDate.toUTCString()};path=/`;
    };

    const addWelcomeMessage = () => {
        if (messages.length === 0) {
            setMessages([{
                text: "Hi do you have any questions?",
                isUser: false,
                timestamp: new Date()
            }]);
        }
    };

    const sendMessage = async (message: string) => {
        // Add user message to chat
        const userMessage = {
            text: message,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsTyping(true);

        try {
            console.log('Sending message to webhook:', message);
            const response: { output: string } = await sendMessageToWebhook(message, chatId);

            // Add bot response to chat from the immediate webhook response
            if (response?.output) {
                setIsTyping(false);
                setMessages(prevMessages => [...prevMessages, {
                    text: response.output,
                    isUser: false,
                    timestamp: new Date()
                }]);
            } else {
                throw new Error('No response from webhook');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setIsTyping(false);
            setMessages(prevMessages => [...prevMessages, {
                text: "Sorry, I couldn't process your request at the moment. Please try again later.",
                isUser: false,
                timestamp: new Date()
            }]);
        }
    };

    return {
        messages,
        isTyping,
        chatId,
        addWelcomeMessage,
        sendMessage
    };
};