# Сайт хоккейной команды

Сайт на [Astro](https://astro.build). Цель сайта: заявка на пробную тренировку.

## Как поменять тексты, цены и состав

Почти всё содержимое лежит в одном файле: `src/data/site.ts`. Меняйте текст в кавычках.
Строки с пометкой `УТОЧНИТЬ` пока заглушки.

- Фото и видео кладите в `public/media/` и `public/images/`, затем впишите путь в `site.ts`
  (например, `video: '/media/hero.mp4'`).
- Политика персональных данных: `src/pages/politika/index.astro`. Впишите оператора и покажите юристу.

## Страницы

| Адрес | Файл |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/nachat-igrat/` | Начать играть (новичкам) |
| `/raspisanie/` | Расписание тренировок |
| `/igry/` | Игры и команда |
| `/sostav/` | Состав |
| `/trenirovki/` | Индивидуальные тренировки |
| `/ceny/` | Цены |
| `/kontakty/` | Контакты |
| `/zayavka/` | Форма заявки |
| `/spasibo/` | После отправки заявки |
| `/politika/` | Политика персональных данных |

## Заявки

Форма работает через Netlify Forms: заявки видны в панели Netlify в разделе Forms.
Чтобы они приходили в Telegram, добавьте в Netlify (Site configuration → Environment variables):

- `TELEGRAM_BOT_TOKEN` — токен бота от [@BotFather](https://t.me/BotFather);
- `TELEGRAM_CHAT_ID` — id чата, куда слать заявки (напишите боту, затем откройте
  `https://api.telegram.org/bot<токен>/getUpdates` и найдите `"chat":{"id": ...}`).

Пересылку делает `netlify/functions/submission-created.mjs`.

## Запуск у себя на компьютере

Нужен Node.js 22.12 или новее.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # готовый сайт в папке dist/
```

## Хостинг

Netlify: Add new site → Import from GitHub → этот репозиторий. Настройки сборки берутся из `netlify.toml`.
