'use client'

import Link from 'next/link'
import { useLocale } from '@/contexts/LocaleContext'
import { ACCESS_REQUEST_URL, SITE_REPO_URL } from '@/lib/links'

export default function Hero() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const badges = [
    {
      href: 'https://github.com/batalovmv/l5r-project-site/actions/workflows/deploy.yml',
      src: 'https://github.com/batalovmv/l5r-project-site/actions/workflows/deploy.yml/badge.svg?branch=main',
      alt: 'Project site deploy status',
    },
  ]

  return (
    <section className="hero-surface relative py-20 px-4 overflow-hidden flex flex-col items-center text-center border-b border-ink/5 bg-gradient-to-b from-paper to-white/70">
      <div className="kanji-watermark text-[20rem] top-0 text-ink select-none">道</div>
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-code font-bold text-amber-600 mb-6 shadow-sm">
          <i className="fa-solid fa-code"></i>
          {t('FULL-STACK ПРОЕКТ • PROJECT HUB', 'FULL-STACK PROJECT • PROJECT HUB')}
        </div>
        <h2 className="font-header text-4xl md:text-6xl font-bold text-ink mb-6">
          {t('Легенда Пяти Колец', 'Legend of the Five Rings')}
          <br />
          <span className="text-l5r-red">{t('Цифровой Компаньон', 'Digital Companion')}</span>
        </h2>
        <p className="font-body text-xl text-ink-light mb-6 max-w-2xl mx-auto leading-relaxed">
          {t(
            'Цель проекта — мобильное приложение для онлайн‑сессий по настольной ролевой игре ',
            'The goal is a mobile app for online sessions of the tabletop RPG '
          )}
          <strong>Legend of the Five Rings 5th Edition</strong>
          {t(
            '. Вместо книг и листов персонажей — игра со смартфона с синхронизацией в реальном времени.',
            '. Instead of books and paper sheets: play from your phone with real-time sync.'
          )}
        </p>
        <div className="card-soft p-4 max-w-2xl mx-auto mb-6">
          <div className="text-sm text-ink">
            <span className="font-bold">{t('Статус:', 'Status:')}</span>{' '}
            {t(
              'backend готов → UI/UX дизайн в подготовке → frontend стартует по макетам.',
              'backend ready → UI/UX design in progress → frontend starts from the designs.'
            )}
          </div>
        </div>
        <p className="hint-text max-w-xl mx-auto mb-6">
          {t(
            'Технический фокус: REST API, PostgreSQL, TypeScript, React Native, Docker, CI/CD, real-time системы',
            'Tech focus: REST API, PostgreSQL, TypeScript, React Native, Docker, CI/CD, real-time systems'
          )}
        </p>
        <div className="gh-badges justify-center mb-6" aria-label={t('Статусы CI и деплоя', 'CI and deploy status')}>
          {badges.map((badge) => (
            <a
              key={badge.href}
              href={badge.href}
              target="_blank"
              rel="noreferrer"
              className="gh-badge"
              aria-label={badge.alt}
              title={badge.alt}
            >
              <img src={badge.src} alt={badge.alt} loading="lazy" decoding="async" />
            </a>
          ))}
          <div className="gh-badge" aria-label={t('Backend репозиторий приватный', 'Backend repository is private')} title={t('Backend репозиторий приватный', 'Backend repository is private')}>
            <i className="fa-solid fa-lock text-gray-600 mr-2"></i>
            <span className="text-xs font-code text-gray-600">{t('backend: private', 'backend: private')}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="#features"
            className="btn btn-primary"
          >
            <i className="fa-solid fa-mobile-screen mr-2"></i>
            {t('Возможности', 'Features')}
          </a>
          <Link href="/docs/" className="btn btn-secondary">
            <i className="fa-solid fa-book mr-2"></i>
            {t('Публичные доки', 'Public docs')}
          </Link>
          <a href="#achievements" className="btn btn-secondary">
            <i className="fa-solid fa-trophy mr-2"></i>
            {t('Что сделано', 'Done')}
          </a>
          <a
            href={ACCESS_REQUEST_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            <i className="fa-solid fa-lock"></i>
            {t('Доступ к backend', 'Backend access')}
          </a>
          <a href={SITE_REPO_URL} target="_blank" rel="noreferrer" className="btn btn-ghost">
            <i className="fa-brands fa-github"></i>
            {t('Репозиторий сайта', 'Site repo')}
          </a>
        </div>
        {/* Target audience */}
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-user-ninja text-l5r-red mr-1"></i>
            {t('Мастера (GM)', 'Game Masters (GM)')}
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-user text-tech mr-1"></i>
            {t('Игроки', 'Players')}
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-graduation-cap text-success mr-1"></i>
            {t('Новички в L5R', 'New to L5R')}
          </span>
          <span className="px-3 py-1 bg-white/80 rounded-full border border-ink/10">
            <i className="fa-solid fa-star text-l5r-gold mr-1"></i>
            {t('Ветераны', 'Veterans')}
          </span>
        </div>
      </div>
    </section>
  )
}

