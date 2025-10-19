/**
 * ChatHistoryService.js
 * Service to interact with the chat history API
 */

class ChatHistoryService {
    constructor() {
        // Use environment-based URL for production deployment
        this.baseUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3005/api'
            : 'https://your-render-app-name.onrender.com/api'; // Update this with your Render URL
        this.currentTopicId = null; // Add a property to track the current topic ID
    }

    // Create a new conversation
    async createConversation(userId, title = 'New Conversation', topicId = null) {
        try {
            // If a specific topicId is not provided, try multiple sources
            if (!topicId) {
                // Try getting from the current service instance
                topicId = this.currentTopicId;

                // Try session storage as a backup
                if (!topicId) {
                    topicId = sessionStorage.getItem('currentTopicId');
                    console.log("Retrieved topic ID from session storage:", topicId);
                }

                // If still no topic ID, generate a new one
                if (!topicId) {
                    topicId = this.generateTopicId();
                    console.log("Generated new topic ID in createConversation:", topicId);
                }
            }

            // Double-check we have a valid topic ID
            if (!topicId || topicId === 'null' || topicId === 'undefined') {
                topicId = this.generateTopicId();
                console.log("Fallback: Generated new topic ID:", topicId);
            }

            // Save the current topic ID
            this.currentTopicId = topicId;

            // Also save to session storage for redundancy
            try {
                sessionStorage.setItem('currentTopicId', topicId);
            } catch (e) {
                console.warn("Could not save topic ID to session storage:", e);
            }

            const response = await fetch(`${this.baseUrl}/conversations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    title,
                    topicId // Include the topicId in the request
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create conversation');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw error;
        }
    }

    // Generate a new topic ID using a more readable integer format
    generateTopicId() {
        // Use current timestamp for uniqueness
        const timestamp = Date.now();

        // Get a simpler integer from the timestamp (last 6 digits)
        const simpleId = parseInt(timestamp.toString().slice(-6));

        // Get a random number between 1-999 for additional uniqueness
        const randomPart = Math.floor(Math.random() * 999) + 1;

        // Combine them into a more readable format: T-[6 digit timestamp]-[3 digit random]
        return `T-${simpleId}-${randomPart}`;
    }

    // Start a new topic - call this when "New Chat" is clicked
    startNewTopic() {
        this.currentTopicId = this.generateTopicId();
        return this.currentTopicId;
    }

    // Get all conversations for a user
    async getConversations(userId) {
        try {
            console.log(`Fetching conversations for user ${userId} from ${this.baseUrl}/conversations/${userId}`);
            const response = await fetch(`${this.baseUrl}/conversations/${userId}`);

            if (!response.ok) {
                console.error(`API error: ${response.status} ${response.statusText}`);
                throw new Error(`Failed to fetch conversations: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`Received ${data.length} conversations from API`);
            return data;
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }

    // Get all conversations for a specific topic
    async getConversationsByTopic(topicId) {
        if (!topicId) return [];

        try {
            console.log(`Fetching conversations for topic ${topicId}`);
            const response = await fetch(`${this.baseUrl}/conversations/topic/${topicId}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch conversations by topic: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Received ${data.length} conversations for topic ${topicId}`);
            return data;
        } catch (error) {
            console.error('Error fetching conversations by topic:', error);
            return [];
        }
    }

    // Check if a conversation belongs to the current topic
    isInCurrentTopic(conversation) {
        return this.currentTopicId && conversation &&
            conversation.topic_id === this.currentTopicId;
    }

    // Save a message
    async saveMessage(conversationId, userId, content, isUser) {
        try {
            const response = await fetch(`${this.baseUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    conversationId,
                    userId,
                    content,
                    isUser
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save message');
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving message:', error);
            throw error;
        }
    }

    // Get all messages for a conversation
    async getMessages(conversationId) {
        try {
            const response = await fetch(`${this.baseUrl}/messages/${conversationId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    // Delete a conversation
    async deleteConversation(conversationId) {
        try {
            const response = await fetch(`${this.baseUrl}/conversations/${conversationId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete conversation');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting conversation:', error);
            throw error;
        }
    }

    // Search conversations by a term
    async searchConversations(userId, searchTerm) {
        try {
            const response = await fetch(`${this.baseUrl}/search?userId=${userId}&term=${encodeURIComponent(searchTerm)}`);

            if (!response.ok) {
                throw new Error('Failed to search conversations');
            }

            return await response.json();
        } catch (error) {
            console.error('Error searching conversations:', error);
            throw error;
        }
    }
}

export default new ChatHistoryService();
