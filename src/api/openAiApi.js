import axios from "axios";
import {AI_SYSTEM_PROMPT} from "./constants/openAi.js";

export async function getOpenAiResponse(prompt) {
    const token = process.env.OPEN_AI_TOKEN;

    if (!token) {
        return null;
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4-0125-preview',
                messages: [
                    { role: 'system', content: AI_SYSTEM_PROMPT },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 1000
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response?.data?.choices[0]?.message?.content;

    } catch (error) {
        console.error('Ошибка при запросе к OpenAI:', error.response?.data || error.message);
        return 'Ошибка при обращении к OpenAI API.';
    }
}