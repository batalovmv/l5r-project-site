# План: Обновление сайта для монорепо структуры

## Контекст

Проект объединён в **монорепо** `D:\l5r` со структурой:
```
D:\l5r\
├── backend/         # Node.js/Express API сервер
├── mobile/          # React Native (Expo) мобильное приложение
├── docs/            # Документация
├── backups/         # Резервные копии
├── README.md        # Общий README
└── CHANGELOG.md     # История изменений API
```

**Важно:** Проект теперь **полностью оффлайн** — все онлайн-функции удалены.

---

## Актуальная статистика проекта

### Backend (`D:\l5r\backend\`)
| Метрика | Значение | Пояснение |
|---------|----------|-----------|
| Миграций | 55 | PostgreSQL, Prisma ORM |
| Endpoint'ов | ~60-80 | После удаления онлайн-эндпоинтов |

### Mobile (`D:\l5r\mobile\`)
| Метрика | Значение | Пояснение |
|---------|----------|-----------|
| Сервисов | 44 | Бизнес-логика оффлайн |
| Репозиториев | 7 | Data access (SQLite) |
| Stores (Zustand) | 6 | State management |

### Общее
| Метрика | Значение |
|---------|----------|
| Структура | Монорепо |
| Фронтенд | React Native (Expo 54) |
| Бэкенд | Node.js 20+ / TypeScript / Express |
| База данных (mobile) | SQLite (expo-sqlite) |
| База данных (backend) | PostgreSQL (Prisma ORM) |
| State Management | Zustand |
| Формы | React Hook Form + Zod |
| Тесты | Jest |

---

## Изменения на сайте

### 1. `components/TechStack.tsx`

**ОБНОВИТЬ раздел backend:**
```typescript
const backend = [
  { icon: 'fa-node-js', name: 'Node.js 20+', color: 'text-green-600', brand: true },
  { icon: 'fa-js', name: 'TypeScript 5.9', color: 'text-yellow-500', brand: true },
  { icon: 'fa-bolt', name: 'Express 5', color: 'text-gray-600' },
  { icon: 'fa-database', name: 'PostgreSQL', color: 'text-blue-600' },
  { icon: 'fa-layer-group', name: 'Prisma ORM', color: 'text-purple-600' },
  { icon: 'fa-flask', name: 'Jest', color: 'text-green-500' },
]
```

**УБРАТЬ:**
- Redis
- SSE
- JWT/OAuth
- Docker (опционально, если не используется)

**ДОБАВИТЬ раздел mobile:**
```typescript
const mobile = [
  { icon: 'fa-react', name: 'React Native', color: 'text-cyan-500', brand: true },
  { icon: 'fa-js', name: 'TypeScript 5.9', color: 'text-yellow-500', brand: true },
  { icon: 'fa-mobile', name: 'Expo 54', color: 'text-purple-500' },
  { icon: 'fa-database', name: 'SQLite', color: 'text-blue-500' },
  { icon: 'fa-store', name: 'Zustand', color: 'text-amber-600' },
  { icon: 'fa-file-code', name: 'React Hook Form', color: 'text-pink-500' },
  { icon: 'fa-shield', name: 'Zod', color: 'text-blue-600' },
  { icon: 'fa-flask', name: 'Jest', color: 'text-green-500' },
]
```

---

### 2. `components/Progress.tsx`

**ОБНОВИТЬ статистику:**
```typescript
// Было: '200 endpoints • 109 tables • 90 services'
// Стало: 
{t('Монорепо: backend + mobile • 44 сервиса • 55 миграций', 'Monorepo: backend + mobile • 44 services • 55 migrations')}
```

---

### 3. `components/Achievements.tsx`

**ОБНОВИТЬ stats:**
```typescript
const stats = [
  {
    value: '44',
    label: t('Сервисов', 'Services'),
    sub: t('Мобильное приложение', 'Mobile app'),
    hint: t('Вся бизнес-логика оффлайн', 'All business logic offline'),
  },
  {
    value: '55',
    label: t('Миграций', 'Migrations'),
    sub: 'Prisma ORM',
    hint: t('Схема БД эволюционировала с проектом', 'DB schema evolved with the project'),
  },
  {
    value: '7',
    label: t('Репозиториев', 'Repositories'),
    sub: 'SQLite',
    hint: t('Data access layer для оффлайн данных', 'Data access layer for offline data'),
  },
  {
    value: '6',
    label: t('Stores', 'Stores'),
    sub: 'Zustand',
    hint: t('Reactive state management', 'Reactive state management'),
  },
]
```

**УДАЛИТЬ feature карточки:**
- "Real-time" — удалён SSE/Redis
- "AI Ассистент" — удалены AI-функции  
- "Интеграции" — удалены Discord, Foundry, Calendar
- "Мониторинг" — Prometheus/Sentry не нужны для оффлайн

**ОСТАВИТЬ/ИЗМЕНИТЬ:**
```typescript
const features = [
  {
    icon: 'fa-database',
    color: 'bg-blue-600',
    title: t('Оффлайн хранение', 'Offline storage'),
    items: [
      'SQLite (expo-sqlite)',
      t('Zustand state management', 'Zustand state management'),
      t('Локальный экспорт/импорт', 'Local export/import'),
      t('Данные только на устройстве', 'Data only on device'),
    ],
  },
  {
    icon: 'fa-khanda',
    color: 'bg-success',
    title: t('Боевая система', 'Combat system'),
    items: [
      t('Дуэли с фазами', 'Duels with phases'),
      t('Интриги', 'Intrigues'),
      t('Массовые сражения', 'Mass battles'),
      t('Критические ранения', 'Critical injuries'),
    ],
  },
  {
    icon: 'fa-wand-sparkles',
    color: 'bg-pink-600',
    title: t('Генераторы', 'Generators'),
    items: [
      t('Генератор NPC + скейлинг', 'NPC generator + scaling'),
      t('Генератор имён', 'Name generator'),
      t('Encounter builder', 'Encounter builder'),
      t('Случайные события', 'Random events'),
    ],
  },
  {
    icon: 'fa-dice',
    color: 'bg-l5r-gold',
    title: t('Dice Roller', 'Dice Roller'),
    items: [
      t('Кольцо + навык', 'Ring + skill'),
      t('Explosions', 'Explosions'),
      t('Opportunities', 'Opportunities'),
      t('Визуализация результатов', 'Results visualization'),
    ],
  },
  {
    icon: 'fa-book',
    color: 'bg-cyan-500',
    title: t('Справочники L5R', 'L5R Reference'),
    items: [
      t('5 книг данных', '5 books of data'),
      t('Техники, предметы, качества', 'Techniques, items, qualities'),
      t('7 великих кланов', '7 great clans'),
      t('Локальный поиск', 'Local search'),
    ],
  },
  {
    icon: 'fa-code',
    color: 'bg-gray-700',
    title: t('Архитектура', 'Architecture'),
    items: [
      t('Монорепо: backend + mobile', 'Monorepo: backend + mobile'),
      'React Native (Expo 54)',
      'TypeScript 5.9',
      'Zod валидация',
    ],
  },
]
```

---

### 4. `components/Features.tsx` (версия для разработчиков)

**ИЗМЕНИТЬ заголовок:**
```typescript
// Было: 'Функциональность (backend)'
// Стало: 'Архитектура приложения'
```

**УДАЛИТЬ секции:**
- "Аккаунты и вход" (OAuth)
- "Интеграции" (Discord, Foundry, Calendar)
- Любые упоминания real-time, SSE, Redis, JWT

**ДОБАВИТЬ информацию о монорепо структуре:**
```typescript
// Новый блок в начале:
<div className="card p-6 mb-8" data-reveal>
  <h4 className="font-header text-xl font-bold text-ink mb-4">
    <i className="fa-solid fa-folder-tree text-l5r-gold mr-2"></i>
    {t('Структура монорепо', 'Monorepo Structure')}
  </h4>
  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <h5 className="font-bold text-sm mb-2 text-tech">backend/</h5>
      <ul className="text-sm text-ink-light space-y-1">
        <li>• Node.js 20+ / Express</li>
        <li>• PostgreSQL + Prisma ORM</li>
        <li>• {t('55 миграций', '55 migrations')}</li>
        <li>• {t('Справочные данные L5R', 'L5R reference data')}</li>
      </ul>
    </div>
    <div>
      <h5 className="font-bold text-sm mb-2 text-tech">mobile/</h5>
      <ul className="text-sm text-ink-light space-y-1">
        <li>• React Native (Expo 54)</li>
        <li>• SQLite (expo-sqlite)</li>
        <li>• Zustand + React Hook Form</li>
        <li>• {t('44 сервиса', '44 services')}</li>
      </ul>
    </div>
  </div>
</div>
```

**ИЗМЕНИТЬ "Кампании":**
```typescript
// Убрать:
// - Уникальный код приглашения
// - Чат + typing indicator
// - Планирование сессий + ICS

// Оставить/добавить:
<li>
  <i className="fa-solid fa-cloud-arrow-down text-success mr-2"></i>
  {t('Локальный экспорт/импорт JSON', 'Local JSON export/import')}
</li>
```

**ИЗМЕНИТЬ "Инструменты GM":**
```typescript
// Убрать:
// - AI генерация NPC и локаций
// - Шаринг контента (NPC, модули)

// Оставить:
<li>
  <i className="fa-solid fa-file-pdf text-red-500 mr-2"></i>
  {t('PDF экспорт персонажа', 'Character PDF export')}
</li>
<li>
  <i className="fa-solid fa-eye-slash text-purple-500 mr-2"></i>
  {t('Приватные заметки', 'Private notes')}
</li>
<li>
  <i className="fa-solid fa-wand-magic-sparkles text-pink-500 mr-2"></i>
  {t('Генератор NPC (локальный)', 'NPC generator (local)')}
</li>
```

---

### 5. `components/PlayerHero.tsx`

**ИЗМЕНИТЬ описание:**
```typescript
// Было:
'Забудь про бумажные листы персонажей. Кубики, техники, бой — всё в одном приложении. Синхронизация между игроками в реальном времени.'

// Стало:
'Забудь про бумажные листы персонажей. Кубики, техники, бой — всё в одном приложении. Работает полностью оффлайн.'
```

---

### 6. `components/PlayerFeatures.tsx`

**УДАЛИТЬ карточки:**
- "Играй с друзьями" (синхронизация)
- "AI помощник для мастера"
- "Пересказ 'что было'" (AI рекапы)
- "Напоминания о сессиях" (Push/Calendar)

**ДОБАВИТЬ карточку:**
```typescript
{
  icon: 'fa-wifi-slash',
  color: 'bg-gray-700',
  title: t('Работает оффлайн', 'Works offline'),
  description: t(
    'Никаких серверов или аккаунтов. Все данные хранятся локально на твоём устройстве. Полная приватность.',
    'No servers or accounts. All data stored locally on your device. Complete privacy.'
  ),
},
```

**ИЗМЕНИТЬ карточку справочника:**
```typescript
{
  icon: 'fa-book-open',
  color: 'bg-amber-600',
  title: t('Справочник под рукой', 'Rulebook at your fingertips'),
  description: t(
    'Все техники, преимущества, оружие — ищи прямо в приложении. 5 книг L5R, мгновенный поиск, работает без интернета.',
    'All techniques, advantages, weapons — search right in the app. 5 L5R books, instant search, works offline.'
  ),
},
```

---

### 7. `components/PlayerFAQ.tsx`

**УДАЛИТЬ вопросы:**
- "Нужен интернет для игры?" (неактуально)
- "Что если я забыл что было на прошлой сессии?" (AI рекапы)
- "GM должен платить за AI-фичи?" (нет AI)

**ИЗМЕНИТЬ вопрос о столе:**
```typescript
{
  q: t('Можно играть за одним столом?', 'Can I play at one table?'),
  a: t(
    'Да! Это основной сценарий. Каждый игрок ведёт своего персонажа на телефоне. Синхронизация не нужна — данные у каждого свои.',
    'Yes! This is the main scenario. Each player manages their character on their phone. No sync needed — each has their own data.'
  ),
},
```

**ДОБАВИТЬ вопросы:**
```typescript
{
  q: t('Приложение работает без интернета?', 'Does the app work offline?'),
  a: t(
    'Да, полностью! Никаких серверов, аккаунтов или подписок. Все данные хранятся на устройстве.',
    'Yes, completely! No servers, accounts, or subscriptions. All data stored on device.'
  ),
},
{
  q: t('Как перенести персонажа на другой телефон?', 'How to transfer a character to another phone?'),
  a: t(
    'Экспортируй в JSON, отправь файл на новый телефон (мессенджер, email, AirDrop) и импортируй.',
    'Export to JSON, send the file to the new phone (messenger, email, AirDrop) and import.'
  ),
},
{
  q: t('Данные персонажей безопасны?', 'Is character data safe?'),
  a: t(
    'Данные хранятся только на твоём устройстве. Мы не собираем никакой информации. Рекомендуем периодически экспортировать важных персонажей.',
    'Data is stored only on your device. We do not collect any information. We recommend periodically exporting important characters.'
  ),
},
```

---

### 8. `components/Roadmap.tsx` и `components/PlayerRoadmap.tsx`

**ОБНОВИТЬ статусы:**
```typescript
// PlayerRoadmap.tsx
const phases = [
  {
    icon: 'fa-check',
    status: 'done' as PhaseStatus,
    title: t('Движок готов', 'Engine ready'),
    description: t('Вся логика игры реализована', 'All game logic implemented'),
  },
  {
    icon: 'fa-check',
    status: 'done' as PhaseStatus,
    title: t('Мобильное приложение', 'Mobile app'),
    description: t('React Native + SQLite оффлайн архитектура', 'React Native + SQLite offline architecture'),
  },
  {
    icon: 'fa-palette',
    status: 'current' as PhaseStatus,
    title: t('UI/UX дизайн', 'UI/UX design'),
    description: t('Работа над интерфейсом', 'Working on interface'),
  },
  {
    icon: 'fa-rocket',
    status: 'pending' as PhaseStatus,
    title: t('Релиз!', 'Release!'),
    description: t('Публикация в App Store и Google Play', 'Publishing to App Store and Google Play'),
  },
]
```

---

### 9. `components/CodeShowcase.tsx`

**ОБНОВИТЬ примеры кода — добавить mobile примеры:**
```typescript
// Пример Zustand store
{
  id: 'zustand-store',
  title: t('State: Zustand store', 'State: Zustand store'),
  caption: t('Reactive state для персонажей', 'Reactive character state'),
  icon: 'fa-store',
  iconColorClass: 'text-amber-600',
  sourceLabel: 'mobile • stores',
  languageLabel: 'TypeScript',
  code: `import { create } from 'zustand'

interface CharacterStore {
  characters: Character[]
  activeId: string | null
  setActive: (id: string) => void
  addCharacter: (char: Character) => void
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  characters: [],
  activeId: null,
  setActive: (id) => set({ activeId: id }),
  addCharacter: (char) => set((s) => ({ 
    characters: [...s.characters, char] 
  })),
}))`,
},
```

```typescript
// Пример SQLite репозитория
{
  id: 'sqlite-repo',
  title: t('DB: SQLite repository', 'DB: SQLite repository'),
  caption: t('Оффлайн хранение данных', 'Offline data storage'),
  icon: 'fa-database',
  iconColorClass: 'text-blue-600',
  sourceLabel: 'mobile • repositories',
  languageLabel: 'TypeScript',
  code: `export class CharacterRepository {
  constructor(private db: SQLiteDatabase) {}

  async findAll(): Promise<Character[]> {
    const rows = await this.db.getAllAsync(
      'SELECT * FROM characters ORDER BY name'
    )
    return rows.map(mapRowToCharacter)
  }

  async save(char: Character): Promise<void> {
    await this.db.runAsync(
      \`INSERT OR REPLACE INTO characters 
       (id, name, clan, family, school, rings) 
       VALUES (?, ?, ?, ?, ?, ?)\`,
      [char.id, char.name, char.clan, char.family, char.school, JSON.stringify(char.rings)]
    )
  }
}`,
},
```

---

## Порядок выполнения

1. ✅ Прочитать текущее состояние файлов
2. ✅ `TechStack.tsx` — обновить стек, добавить mobile
3. ✅ `Progress.tsx` — обновить статистику
4. ✅ `Achievements.tsx` — обновить stats и features
5. ✅ `Features.tsx` — убрать онлайн, добавить монорепо
6. ✅ `PlayerHero.tsx` — убрать синхронизацию
7. ✅ `PlayerFeatures.tsx` — убрать онлайн-карточки
8. ✅ `PlayerFAQ.tsx` — обновить вопросы
9. ✅ `Roadmap.tsx` / `PlayerRoadmap.tsx` — обновить статусы
10. ✅ `CodeShowcase.tsx` — добавить mobile примеры
11. ✅ Запустить `npm run build`
12. ✅ Проверить сайт в браузере
13. ✅ Сделать git commit и push

---

## Ключевые сообщения после обновления

### Для игроков:
> **Оффлайн приложение для L5R 5e** — работает без интернета, без аккаунтов, без подписок. Все данные только на твоём устройстве.

### Для разработчиков:
> **Монорепо: backend + mobile** — React Native (Expo 54) + SQLite для оффлайн хранения. TypeScript, Zustand, Zod. 44 сервиса, 55 миграций.

---

## Примечания для GPT 5.2 Codex

1. **Монорепо структура** — подчеркнуть что это единый проект с `backend/` и `mobile/`
2. **Оффлайн-first** — убрать ВСЕ упоминания онлайн-функций
3. **Новые технологии** — добавить React Native, Expo, SQLite, Zustand
4. **Актуальные цифры:**
   - 44 сервиса (mobile)
   - 7 репозиториев (mobile)
   - 6 stores (Zustand)
   - 55 миграций (backend)
5. **Удалить полностью:**
   - SSE, Redis, JWT, OAuth
   - Discord, Foundry, Calendar интеграции
   - AI/GPT функции
   - Push-уведомления
   - Синхронизация между пользователями

