/**
 * Generates a 10-character alphanumeric chat ID
 */
export const generateChatId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

/**
 * Sends a message to the webhook
 */
export const sendMessageToWebhook = async (messageFromUser: string, chatId: string): Promise<{ output: string }> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch(process.env.CHATBOT_WEBHOOK as string, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
            body: JSON.stringify({
                message_from_user: messageFromUser,
                chat_id: chatId
            })
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return { output: "Sorry, I couldn't process your request at the moment. Please try again later." };
        }
        const data: { output: string } = await response.json();
        return data;
    } catch (error: any) {
        console.error('Error sending message to webhook:', error);
        if (error.name === 'AbortError') {
            throw new Error("The request timed out. Please try again later.");
        }
        throw error;
    }
};

