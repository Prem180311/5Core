const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3400;

const SHOPIFY_STORE = '5-core.myshopify.com';
const ACCESS_TOKEN = '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';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Shopify API route
app.get('/getdata', async (req, res) => {
  try {
    const response = await axios.get(`https://${SHOPIFY_STORE}/admin/api/2024-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    res.json({ products: response.data.products });
  } catch (error) {
    console.error('🔴 Shopify API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Shopify API request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
