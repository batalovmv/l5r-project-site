export type GlossaryKey = 'SSE' | 'IDOR' | 'Idempotency' | 'OpenTelemetry' | 'Runbook' | 'SLO'

export const GLOSSARY: Record<GlossaryKey, { ru: string; en: string }> = {
  SSE: {
    ru: 'Server‑Sent Events: поток событий поверх HTTP (односторонний realtime от сервера к клиенту).',
    en: 'Server‑Sent Events: a one-way realtime stream over HTTP (server → client).',
  },
  IDOR: {
    ru: 'Insecure Direct Object Reference: класс уязвимостей, когда можно получить доступ к чужим данным по ID.',
    en: 'Insecure Direct Object Reference: access to other users’ data by guessing/using IDs.',
  },
  Idempotency: {
    ru: 'Идемпотентность: повторный запрос не приводит к повторному эффекту (важно для платежей/действий/ретраев).',
    en: 'Idempotency: repeating the same request doesn’t repeat the effect (important for retries).',
  },
  OpenTelemetry: {
    ru: 'OpenTelemetry: стандарт для трассировки/метрик/логов, помогает видеть “где тормозит” и почему.',
    en: 'OpenTelemetry: a standard for traces/metrics/logs to understand where time is spent and why.',
  },
  Runbook: {
    ru: 'Runbook: пошаговые инструкции по эксплуатации/инцидентам (что делать и в каком порядке).',
    en: 'Runbook: step-by-step operational procedures (what to do and in what order).',
  },
  SLO: {
    ru: 'Service Level Objective: целевой уровень надёжности/латентности (метрики для контроля качества).',
    en: 'Service Level Objective: target reliability/latency goals (metrics to measure quality).',
  },
}

