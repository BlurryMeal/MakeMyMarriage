
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, MoreVertical, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  sender: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

interface ConversationMessage {
  id: number;
  sender: string;
  message: string;
  time: string;
}

interface MessagesTabProps {
  initialMessages: Message[];
  initialConversation: ConversationMessage[];
}

const MessagesTab = ({ initialMessages, initialConversation }: MessagesTabProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [selectedChat, setSelectedChat] = useState<number | null>(initialMessages.length > 0 ? initialMessages[0].id : null);
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState(initialConversation);
  
  // Update filtered messages when search query or messages change
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(
        message => 
          message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  }, [searchQuery, messages]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Get the current date and time
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      
      // Add message to conversation
      const newMessageObj = {
        id: conversation.length + 1,
        sender: 'me',
        message: newMessage,
        time: 'Just now'
      };
      
      setConversation([...conversation, newMessageObj]);
      
      // Update the last message in the messages list
      if (selectedChat) {
        const updatedMessages = messages.map(msg => 
          msg.id === selectedChat 
            ? { ...msg, lastMessage: newMessage, time: 'Just now' } 
            : msg
        );
        setMessages(updatedMessages);
        setFilteredMessages(updatedMessages.filter(
          msg => 
            msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
        ));
      }
      
      // Show success toast
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
      
      // Clear input
      setNewMessage('');
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Messages</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-3 h-[600px]">
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-[552px]">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`px-4 py-3 border-b cursor-pointer hover:bg-gray-50 ${selectedChat === message.id ? 'bg-gray-50' : ''} ${message.unread ? 'bg-blue-50 hover:bg-blue-50' : ''}`}
                    onClick={() => {
                      setSelectedChat(message.id);
                      // Mark as read when selected
                      if (message.unread) {
                        const updatedMessages = messages.map(msg => 
                          msg.id === message.id ? { ...msg, unread: false } : msg
                        );
                        setMessages(updatedMessages);
                        setFilteredMessages(updatedMessages.filter(
                          msg => msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
                        ));
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <p className={`font-medium ${message.unread ? 'text-blue-700' : ''}`}>{message.sender}</p>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm truncate">{message.lastMessage}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No messages found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
          
          <div className="col-span-2 flex flex-col">
            {selectedChat ? (
              <>
                <div className="p-4 border-b flex justify-between items-center">
                  <div>
                    <p className="font-medium">{messages.find(m => m.id === selectedChat)?.sender}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto">
                  {conversation.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          msg.sender === 'me' 
                            ? 'bg-wedding-red text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-500'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Type your message here..." 
                      className="resize-none" 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-wedding-red hover:bg-wedding-red/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;
