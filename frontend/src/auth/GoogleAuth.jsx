// frontend/src/auth/GoogleAuth.jsx 
export const handleGoogleLogin = () => {
  const params = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: 'http://localhost:5173/auth/callback',
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  };

  const urlParams = new URLSearchParams(params).toString();
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams}`;
  
  window.location.href = googleAuthUrl;
};