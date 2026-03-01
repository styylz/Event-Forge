# 🚀 EventForge

##  Client

### 1. Installation
Clone the repository and install the dependencies:
```bash
cd client 
npm install

```

### 2. Development Mode

```bash
npm run dev

```


### 3. Production Build & Preview
Do not forget to run server to activate API

To verify the production bundle and run the code from the `/dist` folder:

```bash
npm run build
npm run start

```
---
## Server

### 1. Installation
```bash
cd server 
npm install
```

### 🔑 Register to Geoapify API Key

To enable location features and maps, you will need a **GEOAPIFY_KEY**. Follow these steps:

1. **Sign Up**: Go to [Geoapify MyProjects](https://myprojects.geoapify.com/) and create a free account.
2. **Create Project**: Click the **"Create New Project"** button (e.g., name it *EventForge*).
3. **Access API Keys**: Once your project is created, click on the **"API Keys"** tab in the left-hand sidebar.
4. **Copy Token**: You will see a field labeled **"API keys
"**. Copy that alphanumeric string.
  

### 3. Check .env.example and create .env Add API token to .env file
```env
   GEOAPIFY_KEY=your_copied_key_here
```

### 3. Run server
```bash
npm run dev
```

### 4. Production Build & Preview
```bash
npm run build
npm run start

```
