"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null); // Reference for scrolling to the bottom

  const colors = {
    user: ['#ff4d6d', '#ff758f'],
    ai: ['#85acb1', '#2f7f8e']
  };

  const getRandomColor = (type, index) => {
    const [color1, color2] = colors[type];
    const ratio = (index + 1) / messages.length;
    return `linear-gradient(to right, ${color1} 0%, ${color2} ${ratio * 100}%)`;
  };

  const getAIResponse = (userInput) => {
    const lowercasedInput = userInput.toLowerCase().trim();
    const predefinedResponses = {
      'hi': 'Hi! How can I help you today?',
      'what classes do you offer?': 'We offer various classes including Ballet, Jazz, Hip-Hop, and Contemporary.',
      'what are the class timings?': 'Class timings vary. Please check our schedule on the website.',
      'how much are the fees?': 'Our fees depend on the class type. Visit our pricing page for details.',
      'where is the dance school located?': 'We are located at 123 Dance Street, Cityville.',
      'how can i enroll?': 'Fill out the enrollment form on our website or contact us.',
      'do you offer private lessons?': 'Yes, we offer private lessons. Contact us to schedule.'
    };
    return predefinedResponses[lowercasedInput] || "Sorry, I don't have an answer for that.";
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Scroll to the bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Get AI response
    setTimeout(() => {
      const aiResponse = { text: getAIResponse(input), sender: 'ai' };
      setMessages([...newMessages, aiResponse]);
      // Scroll to the bottom
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.heading}>Dance School Chatbot</h1>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}
            style={{ background: getRandomColor(msg.sender, index) }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Empty div to use for scrolling */}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Send</button>
      </div>
    </div>
  );
}
