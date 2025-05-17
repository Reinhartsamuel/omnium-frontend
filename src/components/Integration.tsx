import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const Integration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'js' | 'react' | 'node'>('js');
  const [copied, setCopied] = useState(false);
  
  const copyCode = () => {
    const codeElement = document.getElementById('code-snippet');
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const renderCode = () => {
    switch (activeTab) {
      case 'js':
        return `
// Initialize the omnium client
import { omnium } from 'omnium-js';

const gateway = new omnium({
  apiKey: 'your_api_key',
  environment: 'production' // or 'sandbox' for testing
});

// Create a payment session
async function createPayment() {
  try {
    const session = await gateway.createSession({
      amount: 100.00,
      currency: 'USD',
      redirectUrl: 'https://your-site.com/success',
      cancelUrl: 'https://your-site.com/cancel',
      metadata: {
        orderId: '12345',
        customerName: 'John Doe'
      }
    });
    
    // Redirect to payment page
    window.location.href = session.checkoutUrl;
  } catch (error) {
    console.error('Payment creation failed:', error);
  }
}

// Call the function when user clicks "Pay"
document.getElementById('pay-button').addEventListener('click', createPayment);
`;
      case 'react':
        return `
import React, { useState } from 'react';
import { useomnium } from 'omnium-react';

function PaymentButton({ amount, orderId }) {
  const [loading, setLoading] = useState(false);
  const { createSession } = useomnium({
    apiKey: 'your_api_key'
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      const session = await createSession({
        amount,
        currency: 'USD',
        redirectUrl: \`\${window.location.origin}/success\`,
        cancelUrl: \`\${window.location.origin}/cancel\`,
        metadata: { orderId }
      });
      
      window.location.href = session.checkoutUrl;
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePayment}
      disabled={loading}
      className="bg-indigo-600 text-white py-2 px-4 rounded"
    >
      {loading ? 'Processing...' : 'Pay with Crypto'}
    </button>
  );
}

export default PaymentButton;
`;
      case 'node':
        return `
const express = require('express');
const { omnium } = require('omnium-node');

const app = express();
app.use(express.json());

// Initialize the omnium client
const gateway = new omnium({
  apiKey: process.env.omnium_API_KEY,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});

// Route to create a payment session
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, orderId, customerEmail } = req.body;
    
    const session = await gateway.createSession({
      amount,
      currency: 'USD',
      redirectUrl: \`\${process.env.FRONTEND_URL}/payment/success\`,
      cancelUrl: \`\${process.env.FRONTEND_URL}/payment/cancel\`,
      metadata: {
        orderId,
        customerEmail
      },
      webhookUrl: \`\${process.env.API_URL}/webhooks/payment\`
    });
    
    res.json({ checkoutUrl: session.checkoutUrl });
  } catch (error) {
    console.error('Payment creation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook to receive payment notifications
app.post('/webhooks/payment', async (req, res) => {
  const signature = req.headers['omnium-signature'];
  
  try {
    const event = gateway.verifyWebhook(req.body, signature);
    
    if (event.type === 'payment.completed') {
      // Update order status in your database
      const { orderId } = event.data.metadata;
      // await updateOrderStatus(orderId, 'paid');
    }
    
    res.sendStatus(200);
  } catch (error) {
    console.error('Invalid webhook:', error);
    res.status(400).send('Invalid webhook signature');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`;
    }
  };

  const integrationSteps = [
    {
      number: '01',
      title: 'Sign Up & Get API Key',
      description: 'Create an account and generate your API keys from the dashboard.',
    },
    {
      number: '02',
      title: 'Install SDK',
      description: 'Install our SDK using npm, yarn, or include our script directly.',
    },
    {
      number: '03',
      title: 'Create Payment Sessions',
      description: 'Initialize the client and create payment sessions for your customers.',
    },
    {
      number: '04',
      title: 'Handle Webhooks',
      description: 'Set up webhook endpoints to receive payment notifications.',
    },
  ];

  return (
    <section id="docs" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Integrate in Minutes
          </h2>
          <p className="text-xl text-gray-300">
            Simple API and SDK libraries for any platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {integrationSteps.map((step) => (
            <div key={step.number} className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 mt-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex space-x-1 text-sm font-medium">
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === 'js'
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('js')}
              >
                JavaScript
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === 'react'
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('react')}
              >
                React
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  activeTab === 'node'
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('node')}
              >
                Node.js
              </button>
            </div>
            <div className="ml-auto">
              <button
                onClick={copyCode}
                className="text-gray-400 hover:text-white p-1"
                title="Copy code"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="p-4 bg-slate-950 overflow-x-auto">
            <pre id="code-snippet" className="text-gray-300 font-mono text-sm whitespace-pre">
              {renderCode()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integration;