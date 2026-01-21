# Промпт для GPT 5.2 Codex

Скопируй всё ниже и вставь в Codex:

---

## Задача

Обнови сайт-визитку проекта L5R (Legend of the Five Rings 5e) чтобы он отражал текущее состояние:

1. **Монорепо структура** — проект теперь объединён: `backend/` + `mobile/`
2. **Полностью оффлайн** — все онлайн-функции удалены
3. **Новые технологии** — React Native, Expo, SQLite, Zustand

## Контекст

Проект — мобильное приложение для настольной ролевой игры L5R 5th Edition. Раньше планировался онлайн-функционал (синхронизация, чаты, AI), но теперь это полностью оффлайн-приложение.

**Структура монорепо:**
```
D:\l5r\
├── backend/    # Node.js + Express + PostgreSQL + Prisma (справочные данные)
├── mobile/     # React Native (Expo 54) + SQLite + Zustand (мобильное приложение)
└── docs/       # Документация
```

**Актуальная статистика:**
- 44 сервиса (mobile)
- 7 репозиториев (mobile)
- 6 Zustand stores (mobile)
- 55 миграций (backend)

## Инструкции

Прочитай файл `PLAN-MONOREPO-UPDATE.md` в корне проекта `C:\Users\LOTAS\Desktop\project-site\` — там подробный план с примерами кода для каждого файла.

**Основные действия:**

### 1. Убрать всё онлайн-связанное:
- SSE, Redis, real-time синхронизация
- JWT, OAuth (Google, VK, Discord)
- Push-уведомления (FCM)
- Чат, typing indicator
- AI/GPT ассистент, AI рекапы
- Discord бот/вебхуки
- Foundry VTT интеграция
- Google/Outlook Calendar синхронизация
- Синхронизация между игроками

### 2. Добавить новые технологии:
- React Native + Expo 54
- SQLite (expo-sqlite)
- Zustand (state management)
- React Hook Form + Zod

### 3. Обновить статистику:
- Заменить "200 endpoints" на "44 сервиса"
- Заменить "109 таблиц" на "55 миграций"
- Добавить информацию о монорепо структуре

### 4. Изменить ключевое сообщение:
**Было:** "Синхронизация между игроками в реальном времени"
**Стало:** "Работает полностью оффлайн, без интернета и аккаунтов"

## Файлы для изменения

1. `components/TechStack.tsx` — добавить mobile стек, убрать Redis/SSE/JWT
2. `components/Progress.tsx` — обновить статистику
3. `components/Achievements.tsx` — убрать Real-time/AI/Интеграции, обновить stats
4. `components/Features.tsx` — убрать OAuth/интеграции, добавить монорепо блок
5. `components/PlayerHero.tsx` — убрать "синхронизация"
6. `components/PlayerFeatures.tsx` — убрать AI/онлайн карточки, добавить "оффлайн"
7. `components/PlayerFAQ.tsx` — обновить вопросы для оффлайн
8. `components/Roadmap.tsx` — обновить статусы фаз
9. `components/PlayerRoadmap.tsx` — обновить статусы фаз
10. `components/CodeShowcase.tsx` — добавить примеры Zustand/SQLite

## Правила

1. **Переводы** — изменяй оба языка (ru и en) одновременно через функцию `t()`
2. **Не удаляй файлы** — только редактируй содержимое
3. **Сохраняй стиль** — используй существующие CSS классы и структуру
4. **После изменений** — запусти `npm run build` чтобы проверить ошибки
5. **Консистентность** — если убрал функцию в одном месте, убери везде

## Проверка

После всех изменений:
```bash
cd C:\Users\LOTAS\Desktop\project-site
npm run build
```

Если билд успешен — сделай коммит:
```bash
git add -A
git commit -m "Update site for monorepo structure and offline-first architecture"
git push origin main
```

## Ключевое сообщение после обновления

> **L5R 5e Companion** — оффлайн мобильное приложение для Legend of the Five Rings 5th Edition.
> Монорепо: React Native (Expo) + SQLite + Zustand.
> Никаких серверов, аккаунтов или подписок. Все данные на твоём устройстве.

