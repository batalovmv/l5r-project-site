'use client'

import { useLocale } from '@/contexts/LocaleContext'

export default function PlayerFAQ() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)

  const faqs = [
    {
      q: t('Это бесплатно?', 'Is it free?'),
      a: t(
        'Планируется бесплатная версия с базовым функционалом. Детали монетизации определятся ближе к релизу.',
        'A free version with basic functionality is planned. Monetization details will be finalized closer to release.'
      ),
    },
    {
      q: t('Можно играть за одним столом?', 'Can I play at one table?'),
      a: t(
        'Да! Приложение идеально подходит для классической игры за столом. Каждый игрок ведёт своего персонажа на своём телефоне.',
        'Yes! The app is perfect for classic tabletop play. Each player manages their character on their own phone.'
      ),
    },
    {
      q: t('Приложение работает без интернета?', 'Does the app work offline?'),
      a: t(
        'Да! Приложение полностью автономное. Никаких серверов, аккаунтов или подписок. Все данные хранятся на устройстве.',
        'Yes! The app is fully standalone. No servers, accounts, or subscriptions. All data is stored on your device.'
      ),
    },
    {
      q: t('Какие книги поддерживаются?', 'Which books are supported?'),
      a: t(
        'Core Rulebook, Emerald Empire, Shadowlands, Courts of Stone, Path of Waves — все 5 основных книг.',
        'Core Rulebook, Emerald Empire, Shadowlands, Courts of Stone, Path of Waves — all 5 core books.'
      ),
    },
    {
      q: t('Можно использовать физические кубики?', 'Can I use physical dice?'),
      a: t(
        'Конечно! Приложение не заставляет отказываться от кубиков. Бросай как хочешь — в приложении или вживую.',
        "Of course! The app doesn't force you to give up dice. Roll however you want — in the app or physically."
      ),
    },
    {
      q: t('Как перенести персонажа на другой телефон?', 'How to transfer a character to another phone?'),
      a: t(
        'Экспортируй персонажа в JSON или PDF, отправь файл на новый телефон и импортируй.',
        'Export your character to JSON or PDF, send the file to your new phone, and import it.'
      ),
    },
    {
      q: t('Когда выйдет приложение?', 'When will the app be released?'),
      a: t(
        'Сейчас идёт этап дизайна. После него — разработка и тестирование. Следи за обновлениями!',
        'Currently in the design phase. After that — development and testing. Stay tuned for updates!'
      ),
    },
  ]

  return (
    <section id="faq" className="py-20 bg-paper-dark border-b border-ink/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-reveal>
          <h3 className="section-title mb-4">{t('Частые вопросы', 'Frequently Asked Questions')}</h3>
          <div className="section-divider mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="card p-4 group" data-reveal data-reveal-delay={String(i * 80)}>
              <summary className="font-header font-bold cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <i className="fa-solid fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-3 text-sm text-ink-light">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
