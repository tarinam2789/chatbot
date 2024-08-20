// api/chat/route.js
import { NextResponse } from 'next/server';

const predefinedResponses = {
  'what classes do you offer?': 'We offer various classes including Ballet, Jazz, Hip-Hop, and Contemporary. You can find more details on our website or contact us directly for the latest schedule.',
  'what are the class timings?': 'Class timings vary depending on the type of class and level. Please check our schedule on the website or reach out to us for more information.',
  'how much are the fees?': 'Our fees depend on the class type and duration. Please visit our pricing page on the website or contact us for specific details.',
  'where is the dance school located?': 'We are located at 123 Dance Street, Cityville. For more details on our location, please refer to our contact page on the website.',
  'how can i enroll?': 'To enroll in our classes, you can fill out the enrollment form on our website or contact us directly to get started.',
  'do you offer private lessons?': 'Yes, we offer private lessons. Please contact us to schedule a private session and discuss your specific needs.',
};

export async function POST(request) {
  try {
    const { message } = await request.json();
    console.log('Received message:', message); // Log the incoming message

    // Convert the message to lowercase to match predefined responses
    const lowerCaseMessage = message.toLowerCase().trim();
    console.log('Lowercased message:', lowerCaseMessage);

    let responseMessage;

    // Check if the message matches any predefined questions
    if (predefinedResponses[lowerCaseMessage]) {
      responseMessage = predefinedResponses[lowerCaseMessage];
    } else {
      responseMessage = "Sorry, I don't have an answer for that. Please visit our website or contact us for more information.";
    }

    console.log('Chatbot response:', responseMessage); // Log the response

    return NextResponse.json({ response: responseMessage });
  } catch (error) {
    console.error('Error in API route:', error); // Log the error details
    return NextResponse.json({ response: "Sorry, there was an error." });
  }
}
