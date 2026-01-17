'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

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

export default function CodeShowcase() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const scenes = useMemo<CodeScene[]>(
    () => [
      {
        id: 'openapi-sse',
        title: 'OpenAPI: realtime stream',
        caption: 'SSE endpoint задокументирован в контракте API.',
        icon: 'fa-file-code',
        iconColorClass: 'text-l5r-gold',
        sourceLabel: 'docs/openapi.yaml',
        sourceUrl: 'https://github.com/batalovmv/l5r/blob/main/docs/openapi.yaml',
        languageLabel: 'YAML',
        code: [
          '  /api/v1/campaigns/{campaignId}/stream:',
          '    get:',
          '      tags: [Campaigns]',
          '      summary: Campaign SSE stream',
          '      operationId: campaignStream',
          '      security:',
          '        - bearerAuth: []',
          '      parameters:',
          '        - name: campaignId',
          '          in: path',
          '          required: true',
          '          schema:',
          '            type: string',
          '            format: uuid',
          '      responses:',
          '        "200":',
          '          description: SSE stream',
          '          content:',
          '            text/event-stream:',
          '              schema:',
          '                type: string',
        ].join('\n'),
      },
      {
        id: 'jest-oauth',
        title: 'Jest: OAuth flow',
        caption: 'Интеграционный тест проверяет логику логина и повторного входа.',
        icon: 'fa-flask',
        iconColorClass: 'text-success',
        sourceLabel: 'backend/test/auth.oauth.test.ts',
        sourceUrl: 'https://github.com/batalovmv/l5r/blob/main/backend/test/auth.oauth.test.ts',
        languageLabel: 'TypeScript',
        code: [
          'describe("POST /api/v1/auth/oauth/:provider", () => {',
          '  (RUN_DB_TESTS ? describe : describe.skip)("with DB", () => {',
          '    beforeEach(async () => {',
          '      await resetDb(DATABASE_URL);',
          '      // @ts-expect-error test-only mock',
          '      global.fetch = undefined;',
          '    });',
          '',
          '    it("creates user on first login and reuses it on subsequent login", async () => {',
          '      // @ts-expect-error test-only mock',
          '      global.fetch = jest.fn(() =>',
          '        Promise.resolve({',
          '          ok: true,',
          '          json: () => Promise.resolve({ id_token: fakeJwt({ sub: "google-sub-1" }) })',
          '        })',
          '      );',
          '',
          '      const app = createApp(baseConfig);',
          '',
          '      const first = await request(app)',
          '        .post("/api/v1/auth/oauth/google")',
          '        .send({ deviceId: "dev-1", code: "code-1", redirectUri: "app://cb" });',
          '      expect(first.status).toBe(200);',
          '',
          '      const second = await request(app)',
          '        .post("/api/v1/auth/oauth/google")',
          '        .send({ deviceId: "dev-1", code: "code-1", redirectUri: "app://cb" });',
          '      expect(second.status).toBe(200);',
          '    });',
          '  });',
          '});',
        ].join('\n'),
      },
      {
        id: 'prisma-models',
        title: 'Prisma: data model',
        caption: 'Реляционная модель: users, devices, oauth identities, идемпотентность.',
        icon: 'fa-database',
        iconColorClass: 'text-tech',
        sourceLabel: 'backend/prisma/schema.prisma',
        sourceUrl: 'https://github.com/batalovmv/l5r/blob/main/backend/prisma/schema.prisma',
        languageLabel: 'Prisma',
        code: [
          'model User {',
          '  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid',
          '  isGuest     Boolean  @default(true) @map("is_guest")',
          '  displayName String?  @map("display_name")',
          '  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz(6)',
          '  updatedAt   DateTime @updatedAt @map("updated_at") @db.Timestamptz(6)',
          '',
          '  devices         Device[]',
          '  oauthIdentities OAuthIdentity[]',
          '  refreshSessions RefreshSession[]',
          '  idempotencyKeys IdempotencyKey[]',
          '',
          '  @@map("users")',
          '}',
          '',
          'model IdempotencyKey {',
          '  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid',
          '  userId         String   @map("user_id") @db.Uuid',
          '  scope          String',
          '  key            String',
          '  requestHash    String   @map("request_hash")',
          '  responseStatus Int?     @map("response_status")',
          '  responseBody   Json?    @map("response_body") @db.JsonB',
          '  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz(6)',
          '  expiresAt      DateTime @map("expires_at") @db.Timestamptz(6)',
          '',
          '  user User @relation(fields: [userId], references: [id], onDelete: Cascade)',
          '',
          '  @@unique([userId, scope, key], map: "idempotency_keys_user_id_scope_key_key")',
          '  @@index([expiresAt], map: "idempotency_keys_expires_at_idx")',
          '  @@map("idempotency_keys")',
          '}',
        ].join('\n'),
      },
      {
        id: 'github-actions',
        title: 'CI: quality gate',
        caption: 'Форматирование, линт, OpenAPI checks, тесты с БД и coverage.',
        icon: 'fa-gears',
        iconColorClass: 'text-l5r-red',
        sourceLabel: '.github/workflows/backend-ci.yml',
        sourceUrl: 'https://github.com/batalovmv/l5r/blob/main/.github/workflows/backend-ci.yml',
        languageLabel: 'GitHub Actions',
        code: [
          'jobs:',
          '  backend:',
          '    runs-on: ubuntu-latest',
          '    services:',
          '      postgres:',
          '        image: postgres:16',
          '        env:',
          '          POSTGRES_USER: l5r',
          '          POSTGRES_PASSWORD: l5r',
          '          POSTGRES_DB: l5r',
          '        ports:',
          '          - 5432:5432',
          '    steps:',
          '      - uses: actions/checkout@v4',
          '      - name: Use Node.js',
          '        uses: actions/setup-node@v4',
          '        with:',
          '          node-version: "20"',
          '      - name: Format check',
          '        run: npm run format:check',
          '      - name: OpenAPI check',
          '        run: |',
          '          npm run openapi:types:check',
          '          npm run openapi:check',
          '      - name: Test with coverage (DB)',
          '        run: npm run test:db -- --coverage --coverageReporters=text-summary',
        ].join('\n'),
      },
    ],
    []
  )

  const [activeSceneId, setActiveSceneId] = useState(scenes[0]?.id ?? 'openapi-sse')
  const [autoplay, setAutoplay] = useState(true)
  const [pausedByHover, setPausedByHover] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const activeIndex = Math.max(
    0,
    scenes.findIndex((s) => s.id === activeSceneId)
  )
  const active = scenes[activeIndex] ?? scenes[0]

  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!prefersReducedMotion) return
    setAutoplay(false)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !autoplay || pausedByHover) return
    const intervalId = window.setInterval(() => {
      setActiveSceneId((current) => {
        const idx = scenes.findIndex((s) => s.id === current)
        const next = idx >= 0 ? (idx + 1) % scenes.length : 0
        return scenes[next]?.id ?? current
      })
    }, 9000)
    return () => window.clearInterval(intervalId)
  }, [autoplay, pausedByHover, prefersReducedMotion, scenes])

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

  const handleCopy = async () => {
    if (!active?.code) return
    try {
      await navigator.clipboard.writeText(active.code)
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
          <div className="text-center mb-12">
            <h3 className="section-title mb-2">Код (вместо скриншотов)</h3>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              Небольшое «видео кода»: реальные фрагменты из backend репозитория (контракт API, тесты, Prisma, CI).
            </p>
            <p className="hint-text max-w-2xl mx-auto mt-3">
              Автопрокрутка останавливается при наведении. Если включён reduced motion — autoplay выключается.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="card-soft p-4">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="text-xs font-code text-gray-600 uppercase tracking-wider">Сцены</div>
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
                    {autoplay ? 'Autoplay' : 'Manual'}
                  </button>
                </div>

                <div className="grid gap-2">
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

            <div className="lg:col-span-8">
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
                      <button
                        type="button"
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-ink/10 bg-white hover:bg-gray-50"
                        onClick={handleCopy}
                      >
                        <i className="fa-solid fa-copy mr-2"></i>
                        {copyState === 'copied' ? 'Скопировано' : copyState === 'error' ? 'Ошибка' : 'Копировать'}
                      </button>
                      <a
                        href="https://github.com/batalovmv/l5r"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-bold rounded-lg border border-ink/10 bg-white hover:bg-gray-50"
                      >
                        <i className="fa-brands fa-github mr-2"></i>Репозиторий
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative bg-ink text-paper">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-ink to-transparent pointer-events-none"></div>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink to-transparent pointer-events-none"></div>

                  <div ref={scrollRef} className="max-h-[380px] overflow-y-auto px-5 py-4">
                    <pre className="font-code text-[12px] md:text-sm leading-relaxed whitespace-pre">
                      <code>{active.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

