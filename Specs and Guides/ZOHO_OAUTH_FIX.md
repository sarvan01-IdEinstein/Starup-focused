# 🔧 Zoho OAuth Scope Fix - Quick Solution

## Problem: "Invalid OAuth Scope" Error

You're seeing this error because some Zoho scopes need to be configured differently. Let's fix this step by step.

## ✅ IMMEDIATE FIX - Use This URL Instead:

Replace `YOUR_CLIENT_ID` with your actual Client ID and visit this URL:

```
https://accounts.zoho.eu/oauth/v2/auth?scope=ZohoCRM.modules.contacts.ALL,ZohoProjects.projects.ALL,ZohoBooks.invoices.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3000
```

## Why This Works:

- **Simplified scopes**: Uses specific, commonly available scopes
- **Correct redirect**: Uses localhost for development
- **Basic permissions**: Enough for Phase 1 functionality

## Step-by-Step Fix:

### 1. Update Your Redirect URI in Zoho Console

1. Go back to your Zoho API Console
2. Edit your "IdEinstein" application
3. Add this redirect URI: `http://localhost:3000`
4. Save the changes

### 2. Use the Fixed Authorization URL

Copy this URL and replace `YOUR_CLIENT_ID`:

```
https://accounts.zoho.eu/oauth/v2/auth?scope=ZohoCRM.modules.contacts.ALL,ZohoProjects.projects.ALL,ZohoBooks.invoices.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3000
```

### 3. Complete the Authorization

1. Visit the URL in your browser
2. Log in to Zoho and authorize
3. You'll be redirected to `http://localhost:3000/?code=AUTHORIZATION_CODE`
4. Copy the `AUTHORIZATION_CODE` from the URL

### 4. Get Your Refresh Token

Use this curl command (replace the placeholders):

```bash
curl -X POST https://accounts.zoho.eu/oauth/v2/token \
  -d "grant_type=authorization_code" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=http://localhost:3000" \
  -d "code=YOUR_AUTHORIZATION_CODE"
```

## Alternative: Use Postman

If curl doesn't work, use Postman:

1. **Method**: POST
2. **URL**: `https://accounts.zoho.eu/oauth/v2/token`
3. **Body** (form-data):
   - `grant_type`: `authorization_code`
   - `client_id`: `YOUR_CLIENT_ID`
   - `client_secret`: `YOUR_CLIENT_SECRET`
   - `redirect_uri`: `http://localhost:3000`
   - `code`: `YOUR_AUTHORIZATION_CODE`

## Expected Response:

```json
{
  "access_token": "1000.xxx...",
  "refresh_token": "1000.yyy...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
```

**Save the `refresh_token` - this is what you need for your `.env.local` file!**

## Quick Test:

Once you have your refresh token, create `.env.local`:

```env
ZOHO_CLIENT_ID=your_actual_client_id
ZOHO_CLIENT_SECRET=your_actual_client_secret
ZOHO_REFRESH_TOKEN=your_generated_refresh_token
ZOHO_DOMAIN=https://accounts.zoho.eu
NEXTAUTH_SECRET=any_long_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

Then test:

1. `npm run dev`
2. Go to `http://localhost:3000/portal`
3. Sign in with `demo@ideinstein.com` / `demo123`

**This should resolve the OAuth scope error and get you up and running!** 🚀
