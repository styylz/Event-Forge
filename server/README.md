# EventForge Backend

Express.js backend server for EventForge that proxies the Geoapify API requests and keeps the API key secure.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Add your Geoapify API key:**
   Edit `.env` and add your API key:
   ```
   GEOAPIFY_KEY=your_api_key_here
   PORT=3001
   ```

## Running

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /health
```

### Places Search (Geoapify Proxy)
```
POST /api/places/search
Content-Type: application/json

{
  "query": "New York"
}
```

## Security

- API key is stored securely on the server
- Client never has direct access to the API key
- All requests go through this proxy
- CORS is enabled to allow requests from the frontend
