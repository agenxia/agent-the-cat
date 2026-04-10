// Telegram Connector module
module.exports = async function execute(inputs, params) {
  const chatId = inputs?.chat_id;
  const text = inputs?.text;
  const botToken = params?.bot_token;

  if (!chatId || !text || !botToken) {
    return { 
      success: false, 
      error: 'Paramètres manquants (bot_token) ou entrées manquantes (chat_id, text)' 
    };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      throw new Error(data.description || `Telegram error ${res.status}`);
    }

    return {
      success: true,
      message_id: data.result.message_id,
      chat_id: chatId
    };
  } catch (err) {
    console.error('[telegram] Error:', err.message);
    return {
      success: false,
      error: err.message
    };
  }
};
