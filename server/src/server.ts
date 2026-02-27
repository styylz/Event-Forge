import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/places/search', async (req, res) => {
  try {
    const { query } = req.body; 
    const apiKey = process.env.GEOAPIFY_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const url = new URL('https://api.geoapify.com/v1/geocode/autocomplete');
    url.searchParams.set('text', query); 
    url.searchParams.set('apiKey', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search places' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 EventForge backend running on http://localhost:${PORT}`)
})