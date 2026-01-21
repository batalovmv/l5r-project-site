'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'
import { SITE_REPO_URL } from '@/lib/links'
import Notice from '@/components/Notice'

type CodeScene = {
  id: string
  title: string
  caption: string
  icon: string
  iconColorClass: string
  sourceLabel: string
  sourceUrl?: string
  languageLabel: string
  code: string
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(Boolean(mql.matches))
    update()

    if ('addEventListener' in mql) {
      mql.addEventListener('change', update)
      return () => mql.removeEventListener('change', update)
    }

    // Safari < 14
    // @ts-expect-error legacy API
    mql.addListener(update)
    // @ts-expect-error legacy API
    return () => mql.removeListener(update)
  }, [])

  return reduced
}

function sanitizeCode(code: string): string {
  const secretKey =
    /(PASSWORD|SECRET|API_KEY|DATABASE_URL|REDIS_URL|SENTRY_DSN|METRICS_TOKEN|JWT_ACCESS_SECRET|JWT_REFRESH_SECRET|REFRESH_TOKEN_PEPPER|FEATURE_FLAGS_ADMIN_TOKEN|ADMIN_TOKEN)/i

  return code
    .split('\n')
    .map((rawLine) => {
      let line = rawLine

      const assign = /^(\s*)([A-Z0-9_]+)\s*[:=]\s*(.+)$/.exec(line)
      if (assign) {
        const [, indent, key, value] = assign
        if (secretKey.test(key) && value.trim() && !value.trim().startsWith('${{')) {
          return `${indent}${key}: ***`
        }
      }

      line = line.replace(/(postgres(?:ql)?:\/\/[^:\s]+:)([^@\s]+)(@)/gi, '$1***$3')
      line = line.replace(/(redis:\/\/:)([^@\s]+)(@)/gi, '$1***$3')
      line = line.replace(/(redis:\/\/[^:\s]+:)([^@\s]+)(@)/gi, '$1***$3')
      line = line.replace(/(https?:\/\/[^:\s]+:)([^@\s]+)(@)/gi, '$1***$3')
      line = line.replace(/(\bBearer\s+)([A-Za-z0-9._-]+)\b/g, '$1***')
      line = line.replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '***.***.***')
      line = line.replace(/(x-admin-token:\s*)(\S+)/gi, '$1***')

      return line
    })
    .join('\n')
}

export default function CodeShowcase() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const prefersReducedMotion = usePrefersReducedMotion()
  const sceneDurationMs = 9000

  const scenes = useMemo<CodeScene[]>(
    () => [
      {
        id: 'character-wizard',
        title: t('Создание персонажа: 20 вопросов', 'Character creation: 20 Questions'),
        caption: t('Ответы сохраняются, бонусы пересчитываются автоматически.', 'Answers are saved and bonuses are recalculated automatically.'),
        icon: 'fa-scroll',
        iconColorClass: 'text-l5r-gold',
        sourceLabel: t('app • character', 'app • character'),
        languageLabel: 'TypeScript',
        code: [
          'type Answer = { questionId: string; choiceId: string };',
          '',
          'export function applyAnswer(state: Draft, answer: Answer): Draft {',
          '  const next = {',
          '    ...state,',
          '    answers: [...state.answers, answer]',
          '  };',
          '',
          '  return recalcCharacter(next);',
          '}',
        ].join('\n'),
      },
      {
        id: 'derived-stats',
        title: t('Производные статы', 'Derived stats'),
        caption: t('Чистые функции считают выносливость, фокус и бдительность.', 'Pure functions calculate endurance, focus, and vigilance.'),
        icon: 'fa-calculator',
        iconColorClass: 'text-tech',
        sourceLabel: t('app • rules', 'app • rules'),
        languageLabel: 'TypeScript',
        code: [
          'type Rings = { air: number; earth: number; fire: number; water: number; void: number };',
          'type Derived = { endurance: number; composure: number; focus: number; vigilance: number };',
          '',
          'export function deriveStats(rings: Rings): Derived {',
          '  return {',
          '    endurance: calcEndurance(rings),',
          '    composure: calcComposure(rings),',
          '    focus: calcFocus(rings),',
          '    vigilance: calcVigilance(rings)',
          '  };',
          '}',
        ].join('\n'),
      },
      {
        id: 'dice-roll',
        title: t('Бросок кубиков', 'Dice roll'),
        caption: t('Пул из колец и навыков, взрывы и возможности.', 'Pool from rings and skills, explosions, opportunities.'),
        icon: 'fa-dice',
        iconColorClass: 'text-success',
        sourceLabel: t('app • dice', 'app • dice'),
        languageLabel: 'TypeScript',
        code: [
          'type DieFace = { success: number; opportunity: number; strife: number; explode?: boolean };',
          '',
          'const ringDie: DieFace[] = [/* ...faces... */];',
          'const skillDie: DieFace[] = [/* ...faces... */];',
          '',
          'const rollDie = (faces: DieFace[], rng = Math.random) => {',
          '  return faces[Math.floor(rng() * faces.length)];',
          '};',
          '',
          'export function rollPool(ring: number, skill: number, rng = Math.random) {',
          '  const pool = [',
          '    ...Array.from({ length: ring }, () => ringDie),',
          '    ...Array.from({ length: skill }, () => skillDie)',
          '  ];',
          '',
          '  return pool.map((faces) => rollDie(faces, rng));',
          '}',
        ].join('\n'),
      },
      {
        id: 'local-storage',
        title: t('Локальное хранение', 'Local storage'),
        caption: t('Данные персонажа живут на устройстве, без сервера.', 'Character data lives on the device, no server required.'),
        icon: 'fa-hard-drive',
        iconColorClass: 'text-l5r-red',
        sourceLabel: t('app • storage', 'app • storage'),
        languageLabel: 'TypeScript',
        code: [
          'type Storage = {',
          '  get(key: string): Promise<string | null>;',
          '  set(key: string, value: string): Promise<void>;',
          '};',
          '',
          'const key = (id: string) => `l5r:character:${id}`;',
          '',
          'export async function saveCharacter(store: Storage, character: Character) {',
          '  await store.set(key(character.id), JSON.stringify(character));',
          '}',
          '',
          'export async function loadCharacter(store: Storage, id: string) {',
          '  const raw = await store.get(key(id));',
          '  return raw ? JSON.parse(raw) : null;',
          '}',
        ].join('\n'),
      },
      {
        id: 'zustand-store',
        title: t('State: Zustand store', 'State: Zustand store'),
        caption: t('Reactive state для персонажей', 'Reactive character state'),
        icon: 'fa-store',
        iconColorClass: 'text-amber-600',
        sourceLabel: 'mobile • stores',
        languageLabel: 'TypeScript',
        code: [
          "import { create } from 'zustand'",
          '',
          'interface CharacterStore {',
          '  characters: Character[]',
          '  activeId: string | null',
          '  setActive: (id: string) => void',
          '  addCharacter: (char: Character) => void',
          '}',
          '',
          'export const useCharacterStore = create<CharacterStore>((set) => ({',
          '  characters: [],',
          '  activeId: null,',
          '  setActive: (id) => set({ activeId: id }),',
          '  addCharacter: (char) => set((s) => ({',
          '    characters: [...s.characters, char]',
          '  })),',
          '}))',
        ].join('\n'),
      },
      {
        id: 'sqlite-repo',
        title: t('DB: SQLite repository', 'DB: SQLite repository'),
        caption: t('Оффлайн хранение данных', 'Offline data storage'),
        icon: 'fa-database',
        iconColorClass: 'text-blue-600',
        sourceLabel: 'mobile • repositories',
        languageLabel: 'TypeScript',
        code: [
          'export class CharacterRepository {',
          '  constructor(private db: SQLiteDatabase) {}',
          '',
          '  async findAll(): Promise<Character[]> {',
          '    const rows = await this.db.getAllAsync(',
          "      'SELECT * FROM characters ORDER BY name'",
          '    )',
          '    return rows.map(mapRowToCharacter)',
          '  }',
          '',
          '  async save(char: Character): Promise<void> {',
          '    await this.db.runAsync(',
          '      `INSERT OR REPLACE INTO characters ',
          '       (id, name, clan, family, school, rings) ',
          '       VALUES (?, ?, ?, ?, ?, ?)`,',
          '      [char.id, char.name, char.clan, char.family, char.school, JSON.stringify(char.rings)]',
          '    )',
          '  }',
          '}',
        ].join('\n'),
      },
      {
        id: 'rulebook-search',
        title: t('Поиск по справочнику', 'Rulebook search'),
        caption: t('Индекс строится локально и работает оффлайн.', 'The index is built locally and works offline.'),
        icon: 'fa-book-open',
        iconColorClass: 'text-amber-500',
        sourceLabel: t('app • reference', 'app • reference'),
        languageLabel: 'TypeScript',
        code: [
          'type Entry = { id: string; title: string; tags: string[]; body: string };',
          '',
          'export function buildIndex(entries: Entry[]) {',
          '  const index = new Map<string, Set<string>>();',
          '  entries.forEach((entry) => {',
          '    const tokens = tokenize(`${entry.title} ${entry.tags.join(" ")} ${entry.body}`);',
          '    tokens.forEach((token) => {',
          '      if (!index.has(token)) index.set(token, new Set());',
          '      index.get(token)?.add(entry.id);',
          '    });',
          '  });',
          '  return index;',
          '}',
        ].join('\n'),
      },
      {
        id: 'export-json',
        title: t('Экспорт в JSON', 'JSON export'),
        caption: t('Файл легко переносится между устройствами.', 'Files are easy to move between devices.'),
        icon: 'fa-file-code',
        iconColorClass: 'text-tech',
        sourceLabel: t('app • export', 'app • export'),
        languageLabel: 'TypeScript',
        code: [
          'export function exportCharacterJson(character: Character) {',
          '  return JSON.stringify(',
          '    {',
          '      version: 1,',
          '      exportedAt: new Date().toISOString(),',
          '      character',
          '    },',
          '    null,',
          '    2',
          '  );',
          '}',
        ].join('\n'),
      },
      {
        id: 'export-pdf',
        title: t('Экспорт в PDF', 'PDF export'),
        caption: t('Готовый лист для печати или архива.', 'A ready sheet for printing or archiving.'),
        icon: 'fa-file-pdf',
        iconColorClass: 'text-red-400',
        sourceLabel: t('app • export', 'app • export'),
        languageLabel: 'TypeScript',
        code: [
          'export async function exportCharacterPdf(character: Character) {',
          '  const doc = new PdfDocument({ pageSize: "A4" });',
          '  doc.text(`${character.name} — ${character.clan}`);',
          '  doc.section("Rings", renderRings(character.rings));',
          '  doc.section("Skills", renderSkills(character.skills));',
          '  return doc.save();',
          '}',
        ].join('\n'),
      },
      {
        id: 'i18n',
        title: t('Двуязычность', 'Localization'),
        caption: t('Весь контент доступен на русском и английском.', 'All content is available in Russian and English.'),
        icon: 'fa-language',
        iconColorClass: 'text-purple-600',
        sourceLabel: t('app • i18n', 'app • i18n'),
        languageLabel: 'TypeScript',
        code: [
          'type Locale = "ru" | "en";',
          '',
          'export const t = (ru: string, en: string, locale: Locale) => {',
          '  return locale === "ru" ? ru : en;',
          '};',
          '',
          'const label = t("Кольца", "Rings", locale);',
        ].join('\n'),
      },
    ],
    [locale]
  )

  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? 'character-wizard')
  const [autoplay, setAutoplay] = useState(true)
  const [pausedByHover, setPausedByHover] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const activeIndex = Math.max(
    0,
    scenes.findIndex((s) => s.id === activeSceneId)
  )
  const active = scenes[activeIndex] ?? scenes[0]
  const activeCode = useMemo(() => sanitizeCode(active.code), [active.code])

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const sceneTimeoutIdRef = useRef<number | null>(null)
  const sceneStartedAtRef = useRef<number | null>(null)
  const sceneRemainingMsRef = useRef<number>(sceneDurationMs)
  const prevSceneIdRef = useRef<string>(activeSceneId)

  useEffect(() => {
    if (!prefersReducedMotion) return
    setAutoplay(false)
  }, [prefersReducedMotion])

  useEffect(() => {
    const clear = () => {
      if (sceneTimeoutIdRef.current !== null) {
        window.clearTimeout(sceneTimeoutIdRef.current)
        sceneTimeoutIdRef.current = null
      }
    }

    if (prevSceneIdRef.current !== activeSceneId) {
      prevSceneIdRef.current = activeSceneId
      sceneRemainingMsRef.current = sceneDurationMs
      sceneStartedAtRef.current = null
    }

    clear()

    if (prefersReducedMotion || !autoplay || scenes.length <= 1) {
      sceneRemainingMsRef.current = sceneDurationMs
      sceneStartedAtRef.current = null
      return
    }

    if (pausedByHover) {
      if (sceneStartedAtRef.current !== null) {
        const elapsed = Date.now() - sceneStartedAtRef.current
        sceneRemainingMsRef.current = Math.max(0, sceneRemainingMsRef.current - elapsed)
      }
      sceneStartedAtRef.current = null
      return
    }

    sceneStartedAtRef.current = Date.now()
    sceneTimeoutIdRef.current = window.setTimeout(() => {
      sceneRemainingMsRef.current = sceneDurationMs
      sceneStartedAtRef.current = null
      setActiveSceneId((current) => {
        const idx = scenes.findIndex((s) => s.id === current)
        const next = idx >= 0 ? (idx + 1) % scenes.length : 0
        return scenes[next]?.id ?? current
      })
    }, sceneRemainingMsRef.current)

    return clear
  }, [activeSceneId, autoplay, pausedByHover, prefersReducedMotion, scenes, sceneDurationMs])

  useEffect(() => {
    if (prefersReducedMotion || !autoplay || pausedByHover) return
    const el = scrollRef.current
    if (!el) return

    let rafId = 0
    let lastTs = performance.now()
    const speedPxPerSecond = 14

    const tick = (ts: number) => {
      const dt = ts - lastTs
      lastTs = ts

      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll > 0) {
        const next = el.scrollTop + (speedPxPerSecond * dt) / 1000
        el.scrollTop = next >= maxScroll ? 0 : next
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(rafId)
  }, [activeSceneId, autoplay, pausedByHover, prefersReducedMotion])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = 0
  }, [activeSceneId])

  const showAutoplayProgress = autoplay && !prefersReducedMotion && scenes.length > 1

  const handleCopy = async () => {
    if (!activeCode) return
    try {
      await navigator.clipboard.writeText(activeCode)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1200)
    } catch {
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 1500)
    }
  }

  return (
    <section id="code" className="py-20 bg-white border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h3 className="section-title mb-0">{t('Видео кода (приложение)', 'Code walkthrough (app)')}</h3>
              <SectionLinkButton targetId="code" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t(
                'Не скриншоты — а «видео кода»: живые фрагменты из приложения (создание персонажа, кубики, справочник, оффлайн‑хранение и экспорт).',
                'Not screenshots — a code walkthrough: live snippets from the app (character creation, dice, rulebook, offline storage, export).'
              )}
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              {t(
                'Автопрокрутка и автосмена останавливаются при наведении. Если включён reduced motion — автопоказ выключается.',
                'Auto-scroll and auto-switch pause on hover. If reduced motion is enabled, autoplay is disabled.'
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4" data-reveal data-reveal-delay="0">
              <div className="card-soft p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="text-xs font-code text-gray-600 uppercase tracking-wider">{t('Сцены', 'Scenes')}</div>
                  <button
                    type="button"
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                      autoplay
                        ? 'bg-l5r-red text-white border-l5r-red'
                        : 'bg-white/70 text-ink border-ink/10 hover:bg-white'
                    }`}
                    onClick={() => setAutoplay((v) => !v)}
                    aria-pressed={autoplay}
                  >
                    <i className={`fa-solid ${autoplay ? 'fa-pause' : 'fa-play'} mr-2`}></i>
                    {autoplay ? t('Автопоказ', 'Autoplay') : t('Ручной', 'Manual')}
                  </button>
                </div>

                <div className="grid gap-2 max-h-[520px] overflow-y-auto pr-1">
                  {scenes.map((scene) => {
                    const activeItem = scene.id === activeSceneId
                    return (
                      <button
                        key={scene.id}
                        type="button"
                        onClick={() => setActiveSceneId(scene.id)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          activeItem
                            ? 'bg-white border-l5r-red/30 shadow-sm'
                            : 'bg-white/60 border-ink/10 hover:bg-white hover:border-l5r-red/20'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <i className={`fa-solid ${scene.icon} ${scene.iconColorClass} text-lg mt-0.5`}></i>
                          <div className="min-w-0">
                            <div className="font-header font-bold text-sm text-ink">{scene.title}</div>
                            <div className="text-xs text-gray-600 leading-relaxed">{scene.caption}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8" data-reveal data-reveal-delay="120">
              <div
                className="card overflow-hidden"
                onMouseEnter={() => setPausedByHover(true)}
                onMouseLeave={() => setPausedByHover(false)}
              >
                <div className="px-5 py-4 border-b border-ink/10 bg-white/70">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-header font-bold text-lg text-ink flex items-center gap-2">
                        <i className={`fa-solid ${active.icon} ${active.iconColorClass}`}></i>
                        <span className="truncate">{active.title}</span>
                      </div>
                      <div className="text-xs text-gray-600 font-code mt-1">
                        {active.sourceUrl ? (
                          <a
                            className="hover:text-l5r-red underline decoration-ink/20 hover:decoration-l5r-red"
                            href={active.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {active.sourceLabel}
                          </a>
                        ) : (
                          active.sourceLabel
                        )}{' '}
                        • {active.languageLabel}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-xs font-bold rounded-lg border border-ink/10 bg-white hover:bg-gray-50"
                          onClick={handleCopy}
                        >
                          <i className="fa-solid fa-copy mr-2"></i>
                          {t('Копировать', 'Copy')}
                        </button>
                        {copyState !== 'idle' ? (
                          <div className={`copy-toast ${copyState === 'copied' ? 'is-ok' : 'is-err'}`} role="status" aria-live="polite">
                            <i className={`fa-solid ${copyState === 'copied' ? 'fa-check' : 'fa-triangle-exclamation'}`}></i>
                            <span>{copyState === 'copied' ? t('Скопировано', 'Copied') : t('Ошибка', 'Error')}</span>
                          </div>
                        ) : null}
                      </div>
                      <a
                        href={SITE_REPO_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-ink/10 bg-white hover:bg-gray-50"
                      >
                        <i className="fa-brands fa-github mr-2"></i>
                        {t('Репозиторий сайта', 'Site repo')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative bg-ink text-paper">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent pointer-events-none"></div>

                  {showAutoplayProgress && (
                    <div className={`code-progress ${pausedByHover ? 'paused' : ''} bg-white/10`}>
                      <div
                        key={activeSceneId}
                        className="code-progress-bar"
                        style={{ ['--duration' as any]: `${sceneDurationMs}ms` }}
                      ></div>
                    </div>
                  )}

                  <div ref={scrollRef} className="max-h-[380px] overflow-y-auto px-5 py-4">
                    <pre key={activeSceneId} className="code-scene-enter font-code text-[12px] md:text-sm leading-relaxed">
                      {activeCode.split('\n').map((line, i) => (
                        <div key={i} className="flex">
                          <span className="select-none text-white/30 w-10 pr-3 text-right">
                            {i + 1}
                          </span>
                          <code className="whitespace-pre">{line.length > 0 ? line : ' '}</code>
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8" data-reveal data-reveal-delay="180">
            <Notice variant="success" title={t('Приватность', 'Privacy')} icon="fa-shield-halved">
              <div className="leading-relaxed">
                {t(
                  'Витрина показывает безопасные фрагменты: личные данные маскируются, а детали хранения не раскрываются.',
                  'This showcase includes safe snippets: personal data is masked and storage details are not exposed.'
                )}
              </div>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-success mt-0.5"></i>
                  <span>
                    {t(
                      'Личные данные и токены не публикуются и не копируются “как есть”.',
                      'Personal data and tokens are never published or copied as-is.'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-success mt-0.5"></i>
                  <span>
                    {t(
                      'Фрагменты могут быть сокращены — цель секции: показать подходы (хранилище, экспорт, локализация).',
                      'Snippets may be shortened — the goal is to show approaches (storage, export, localization).'
                    )}
                  </span>
                </li>
              </ul>
            </Notice>
          </div>
        </div>
      </div>
    </section>
  )
}
