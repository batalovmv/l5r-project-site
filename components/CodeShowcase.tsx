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
        id: 'openapi-sse',
        title: t('Контракт API: SSE stream', 'API contract: SSE stream'),
        caption: t('Realtime endpoint задокументирован в OpenAPI.', 'Realtime endpoint is documented in OpenAPI.'),
        icon: 'fa-file-code',
        iconColorClass: 'text-l5r-gold',
        sourceLabel: t('backend • OpenAPI', 'backend • OpenAPI'),
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
        id: 'health-ready',
        title: t('Операции: health / ready', 'Operations: health / ready'),
        caption: t(
          'Liveness/readiness для оркестратора: /health и /ready (DB/Redis проверяются по необходимости).',
          'Liveness/readiness for orchestrators: /health and /ready (DB/Redis checked when needed).'
        ),
        icon: 'fa-heart-pulse',
        iconColorClass: 'text-success',
        sourceLabel: t('backend • routes', 'backend • routes'),
        languageLabel: 'TypeScript',
        code: [
          'import { Router } from "express";',
          '',
          'export const healthRouter = Router();',
          '',
          'healthRouter.get("/api/v1/health", async (_req, res) => {',
          '  res.status(200).json({ ok: true });',
          '});',
          '',
          'export const readyRouter = Router();',
          '',
          'readyRouter.get("/api/v1/ready", async (_req, res) => {',
          '  // db.ping(); redis.ping(); (env-dependent)',
          '  res.status(200).json({ ok: true });',
          '});',
        ].join('\n'),
      },
      {
        id: 'rate-limit',
        title: t('Безопасность: rate limiting', 'Security: rate limiting'),
        caption: t('Лимиты на API защищают от brute-force и спайков; конфиг контролируемый и предсказуемый.', 'API limits protect against brute-force and spikes; the config is controlled and predictable.'),
        icon: 'fa-shield-halved',
        iconColorClass: 'text-l5r-red',
        sourceLabel: t('backend • middleware', 'backend • middleware'),
        languageLabel: 'TypeScript',
        code: [
          'import rateLimit from "express-rate-limit";',
          '',
          'export const apiRateLimit = rateLimit({',
          '  windowMs: 60_000,',
          '  max: MAX_REQUESTS_PER_WINDOW,',
          '  standardHeaders: true,',
          '  legacyHeaders: false,',
          '  keyGenerator: (req) => req.user?.id ?? req.ip,',
          '});',
        ].join('\n'),
      },
      {
        id: 'realtime-smoke',
        title: t('Realtime: smoke (2 instances)', 'Realtime: smoke (2 instances)'),
        caption: t(
          'Скрипт проверяет доставку событий через Redis Pub/Sub между двумя API инстансами.',
          'A script validates event delivery via Redis Pub/Sub across two API instances.'
        ),
        icon: 'fa-tower-broadcast',
        iconColorClass: 'text-tech',
        sourceLabel: t('backend • tools', 'backend • tools'),
        languageLabel: 'Node.js',
        code: [
          'async function openSse(baseUrl, path, token) {',
          '  const controller = new AbortController();',
          '  const res = await fetch(`${baseUrl}${path}`, {',
          '    headers: { Authorization: `Bearer ${token}` },',
          '    signal: controller.signal',
          '  });',
          '  if (!res.body) throw new Error("SSE response has no body");',
          '  const reader = new SseReader(res.body.getReader());',
          '  return { res, reader, close: () => controller.abort() };',
          '}',
          '',
          'console.log("Test 1: Cross-instance delivery (campaign)");',
          'const campaignChannel = `campaign:${campaign.id}`;',
          'const campaignStream = await openSse(',
          '  API_1_BASE_URL,',
          '  `/api/v1/campaigns/${campaign.id}/stream`,',
          '  player.token',
          ');',
          'await waitFor(() => getNumSub(redis, campaignChannel).then((c) => c === 1), 5000);',
          'await startScene(API_2_BASE_URL, gm.token, campaign.id, [characterId], `idem-${Date.now()}`);',
          'await waitForEvent(campaignStream.reader, "campaign.updated", 5000);',
        ].join('\n'),
      },
      {
        id: 'jest-oauth',
        title: t('Тесты: OAuth flow (Jest)', 'Tests: OAuth flow (Jest)'),
        caption: t('Интеграционный тест проверяет логику логина и повторного входа.', 'Integration test covers login and repeat login.'),
        icon: 'fa-flask',
        iconColorClass: 'text-success',
        sourceLabel: t('backend • tests', 'backend • tests'),
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
        title: t('DB: Prisma model', 'DB: Prisma model'),
        caption: t('Пример доменной модели: users + idempotency keys (96 таблиц в схеме).', 'Example domain model: users + idempotency keys (96 tables).'),
        icon: 'fa-database',
        iconColorClass: 'text-tech',
        sourceLabel: t('backend • schema', 'backend • schema'),
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
        id: 'metrics-prom',
        title: t('Observability: /metrics (Prometheus)', 'Observability: /metrics (Prometheus)'),
        caption: t(
          'Prometheus /metrics + realtime gauge по SSE каналам. Доступ в production ограничивается.',
          'Prometheus /metrics + realtime gauges for SSE channels. Access is restricted in production.'
        ),
        icon: 'fa-chart-line',
        iconColorClass: 'text-success',
        sourceLabel: t('backend • metrics', 'backend • metrics'),
        languageLabel: 'TypeScript',
        code: [
          'export const sseConnectionsByChannel = new Gauge({',
          '  name: "sse_connections_by_channel",',
          '  help: "Active SSE connections by channel",',
          '  labelNames: ["channel_type", "channel_id"]',
          '});',
          '',
          'export function createMetricsRouter(config: AppConfig) {',
          '  const router = Router();',
          '  router.get("/metrics", async (req, res) => {',
          '    res.set("Content-Type", register.contentType);',
          '    res.end(await register.metrics());',
          '  });',
          '  return router;',
          '}',
        ].join('\n'),
      },
      {
        id: 'otel-setup',
        title: t('Tracing: OpenTelemetry', 'Tracing: OpenTelemetry'),
        caption: t(
          'HTTP авто‑инструментация + Prisma, экспорт в Jaeger/Zipkin, исключены health/metrics.',
          'HTTP auto-instrumentation + Prisma, export to Jaeger/Zipkin, excluding health/metrics.'
        ),
        icon: 'fa-wave-square',
        iconColorClass: 'text-purple-600',
        sourceLabel: t('backend • tracing', 'backend • tracing'),
        languageLabel: 'TypeScript',
        code: [
          'function resolveExporter() {',
          '  const raw = (process.env.OTEL_TRACES_EXPORTER ?? "").toLowerCase();',
          '  if (raw === "jaeger") return new JaegerExporter(/* endpoint */);',
          '  if (raw === "zipkin") return new ZipkinExporter(/* url */);',
          '  return null;',
          '}',
          '',
          'const ignorePaths = new Set([',
          '  "/api/v1/health",',
          '  "/api/v1/ready",',
          '  "/api/v1/metrics"',
          ']);',
          '',
          'sdk = new NodeSDK({',
          '  resource,',
          '  traceExporter: exporter,',
          '  instrumentations: [',
          '    getNodeAutoInstrumentations({',
          '      "@opentelemetry/instrumentation-http": {',
          '        ignoreIncomingRequestHook: (req) => {',
          '          const url = typeof req.url === "string" ? req.url.split("?")[0] : "";',
          '          return ignorePaths.has(url);',
          '        }',
          '      }',
          '    }),',
          '    new PrismaInstrumentation()',
          '  ]',
          '});',
        ].join('\n'),
      },
      {
        id: 'k6-load',
        title: t('Perf: k6 load', 'Perf: k6 load'),
        caption: t('Ramping VUs + p95 guardrails по критичным эндпоинтам.', 'Ramping VUs + p95 guardrails for critical endpoints.'),
        icon: 'fa-gauge-high',
        iconColorClass: 'text-l5r-gold',
        sourceLabel: t('backend • perf', 'backend • perf'),
        languageLabel: 'k6 (JS)',
        code: [
          'export const options = {',
          '  scenarios: {',
          '    load: {',
          '      executor: "ramping-vus",',
          '      startVUs: 0,',
          '      stages: [',
          '        { duration: __ENV.WARMUP || "60s", target: Number(__ENV.VUS || 100) },',
          '        { duration: __ENV.STEADY || "180s", target: Number(__ENV.VUS || 100) }',
          '      ]',
          '    }',
          '  },',
          '  thresholds: {',
          '    errors: ["rate<0.005"],',
          '    "http_req_duration{endpoint:characters_list}": [`p(95)<${Number(__ENV.P95_CHAR_LIST_MS || 300)}`],',
          '    "http_req_duration{endpoint:items_list}": [`p(95)<${Number(__ENV.P95_ITEM_LIST_MS || 300)}`]',
          '  }',
          '};',
          '',
          'function authOncePerVu(state) {',
          '  if (state.accessToken) return;',
          '  const deviceId = `k6-load-${__VU}`;',
          '  const res = http.post(`${baseUrl}/api/v1/auth/anonymous`, JSON.stringify({ deviceId }), {',
          '    headers: jsonHeaders(),',
          '    tags: { endpoint: "auth_anonymous" }',
          '  });',
          '  state.accessToken = res.json("data.accessToken");',
          '}',
        ].join('\n'),
      },
      {
        id: 'github-actions',
        title: t('CI: quality gate', 'CI: quality gate'),
        caption: t('Форматирование, линт, OpenAPI checks, тесты с БД и coverage.', 'Formatting, lint, OpenAPI checks, DB tests and coverage.'),
        icon: 'fa-gears',
        iconColorClass: 'text-l5r-red',
        sourceLabel: t('backend • CI', 'backend • CI'),
        languageLabel: 'GitHub Actions',
        code: [
          'jobs:',
          '  backend:',
          '    runs-on: ubuntu-latest',
          '    services:',
          '      postgres:',
          '        image: postgres:16',
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
    [locale]
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
              <h3 className="section-title mb-0">{t('Видео кода (backend)', 'Code walkthrough (backend)')}</h3>
              <SectionLinkButton targetId="code" />
            </div>
            <div className="section-divider mx-auto mb-4"></div>
            <p className="section-subtitle mx-auto">
              {t(
                'Не скриншоты — а «видео кода»: живые фрагменты из backend репозитория (контракт API, realtime, тесты, CI, нагрузка и мониторинг).',
                'Not screenshots — a code walkthrough: curated snippets (API contract, realtime, tests, CI, load and observability).'
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
            <Notice variant="success" title="Security / Privacy" icon="fa-shield-halved">
              <div className="leading-relaxed">
                {t(
                  'Витрина показывает безопасные фрагменты: значения секретов маскируются, а детали инфраструктуры не раскрываются.',
                  'This showcase only includes safe snippets: secrets are masked and infrastructure details are not exposed.'
                )}
              </div>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-success mt-0.5"></i>
                  <span>
                    {t(
                      'Секреты (token/password/key) не публикуются и не копируются “как есть”.',
                      'Secrets (token/password/key) are never published or copied as-is.'
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-success mt-0.5"></i>
                  <span>
                    {t(
                      'Фрагменты могут быть сокращены — цель секции: показать подходы (контракт, тесты, CI, мониторинг).',
                      'Snippets may be shortened — the goal is to show approaches (contract, tests, CI, observability).'
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
