require('dotenv').config();
const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const cors = require('cors');

const app = express();
app.use(cors());

const auth = new GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

app.get('/api/get-tts-token', async (req, res) => {
  try {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    res.json({ accessToken: token.token });
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).json({ error: 'Failed to get access token' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
