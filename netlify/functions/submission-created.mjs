// Netlify вызывает эту функцию сам после каждой отправки формы.
// Нужны переменные окружения в настройках сайта на Netlify:
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата, куда слать заявки
// Без них заявки всё равно сохраняются в разделе Forms на Netlify.

const labels = {
  type: 'Тип',
  name: 'Имя',
  contact: 'Контакт',
  level: 'Уровень',
  equipment: 'Экипировка',
  position: 'Позиция',
  experience: 'Опыт',
  comment: 'Комментарий',
  page: 'Страница',
};

export default async (req) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return new Response('Telegram не настроен', { status: 200 });

  const { payload } = await req.json();
  const data = payload?.data ?? {};
  const lines = Object.entries(labels)
    .filter(([key]) => data[key])
    .map(([key, label]) => `${label}: ${data[key]}`);
  const text = ['Новая заявка с сайта', '', ...lines].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) console.error('Telegram error', res.status, await res.text());
  return new Response('ok');
};
