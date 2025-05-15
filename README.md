# 🚀 Omnium — The Minimalist Crypto Payment Gateway

[![License](https://img.shields.io/github/license/your-username/omnium )](https://github.com/your-username/omnium/blob/main/LICENSE )
[![Build Status](https://img.shields.io/github/workflow/status/your-username/omnium/CI )](https://github.com/your-username/omnium/actions )
[![npm version](https://img.shields.io/npm/v/omnium )](https://www.npmjs.com/package/omnium )

> Built on Lisk | Accepts $IDRX (Indonesian Rupiah-backed ERC20)

---

## 💡 What is Omnium?

Omnium is a **supercharged, minimalistic crypto payment gateway** designed for developers who want to accept payments in **IDRX**, a stablecoin pegged 1:1 to the Indonesian Rupiah (IDR), all powered by the **Lisk blockchain ecosystem**.

No fluff. No bloat. Just clean, fast, and secure crypto payments — *made simple*.

---

## 🔥 Why Use Omnium?

✅ **Minimalist Design** – Lightweight codebase, easy to integrate  
🌐 **Lisk-Powered** – Leverage the scalable and developer-friendly Lisk chain  
💰 **Accept IDRX** – Tap into Indonesia’s booming crypto economy with an IDR-pegged token  
⚡ **Fast & Secure** – Instant transaction verification + battle-tested smart contracts  
🧑‍💻 **Developer First** – Simple APIs, clear documentation, and modular architecture  
🌱 **Open Source** – Because transparency matters  

---

## 📦 Features

| Feature               | Description |
|----------------------|-------------|
| 💳 Accept IDRX        | Payments in Rupiah-stable crypto. No volatility headaches. |
| 🧩 Modular API         | Plug-and-play integration with any e-commerce or SaaS platform. |
| 🔐 Secure by Default   | Smart contract audits, encrypted payloads, and more. |
| 📊 Transaction Dashboard | View real-time payment status and history. |
| 🧠 Lisk Chain Integration | Fast finality, low fees, and EVM compatibility. |

---

## 🛠️ How to Use Omnium

### 1. Clone the repo
```bash
git clone https://github.com/your-username/omnium.git 
```

### 2. Install dependencies
```bash
npm Install
```
### 3. Configure .env
Create a .env file in the root:
```
PRIVATE_KEY=your_lisk_wallet_private_key
RPC_URL=https://rpc.lisk.com/mainnet 
IDRX_CONTRACT_ADDRESS=0x...
PORT=3000
```

### 4. Start the server
```
npm run start
```

### 5. Make a test payment
Use our Postman collection or send a POST request:

```
{
  "to": "merchant_wallet_address",
  "amount": "50000", // in IDRX (equals IDR 50,000)
  "orderId": "order_12345"
}
```


## 🤝 Want to Contribute?

We’re open to collaborators! Whether you're a dev, designer, or just love crypto payments — we need your help to make Omnium better.

1. Fork it 🍴  
2. Create your feature branch (`git checkout -b feat/new-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to the branch (`git push origin feat/new-feature`)  
5. Open a pull request 🙌  

---

## 📢 Roadmap

| Phase       | Goal |
|-------------|------|
| MVP         | Live IDRX payments on Lisk |
| v1.1        | Add webhooks for payment confirmation |
| v1.2        | Merchant dashboard for analytics |
| v2.0        | Multi-chain support (Polygon, Binance, etc.) |
| v2.1        | Invoice generation & recurring payments |

---

## 🧾 License

MIT © [Your Name or Company]  
See [LICENSE](https://github.com/your-username/omnium/blob/main/LICENSE ) for details.

---

## 🚨 Disclaimer

This software is provided as-is, without warranty of any kind. Use at your own risk. We recommend thorough testing before deploying to production.

---

## 👇 Let’s Build the Future of Crypto Payments — Together!

Got questions? Want to contribute or sponsor this project?

📧 Email: [youremail@example.com]  
🐦 Twitter: [@OmniumPay]  
💬 Telegram: [t.me/OmniumChat]  
🔗 Website: [www.omniumpay.io]

---

✨ **Omnium** – Where simplicity meets power in crypto payments.  
🚀 Accept IDRX today. On Lisk. For everyone.

# omnium-frontend
