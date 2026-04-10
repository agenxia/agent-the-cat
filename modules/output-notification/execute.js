// Output Notification module
module.exports = async function execute(inputs, params, context) {
  const title = inputs?.title;
  const message = inputs?.message || '';
  const type = params?.type || 'info';

  if (!title) {
    console.warn('[output-notification] No title provided');
    return { status: 'skipped', error: 'Missing title' };
  }

  // L'URL de l'API peut être configurée via l'environnement ou passée par le contexte
  const apiUrl = process.env.VITE_API_URL || context?.apiUrl || 'https://api.anteika.fr';
  
  // Authentification : On cherche un token de session ou un token d'agent
  const sessionId = context?.sessionId || context?.agentToken;
  const agentId = context?.agentId;

  try {
    const res = await fetch(`${apiUrl}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': sessionId || '',
        'Authorization': sessionId ? `Bearer ${sessionId}` : '',
      },
      body: JSON.stringify({
        type,
        title,
        message,
        agent_id: agentId,
        timestamp: new Date().toISOString()
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Platform API error ${res.status}: ${errorText}`);
    }

    return { 
      status: 'success', 
      sent: { title, type },
      platform_response: await res.json()
    };
  } catch (err) {
    console.error('[output-notification] Failed to send notification:', err.message);
    return { status: 'error', message: err.message };
  }
};
