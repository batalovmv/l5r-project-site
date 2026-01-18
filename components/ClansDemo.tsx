'use client'

import { useState } from 'react'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'react-chartjs-2'
import SectionLinkButton from '@/components/SectionLinkButton'
import { useLocale } from '@/contexts/LocaleContext'
import { useTheme } from '@/contexts/ThemeContext'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface ClanData {
  name: string
  kanji: string
  color: string
  desc: string
  stats: string[]
  rings: number[]
}

const clanDataByLocale: Record<'ru' | 'en', Record<string, ClanData>> = {
  ru: {
    crab: {
      name: 'Краб',
      kanji: '蟹',
      color: '#5D6D7E',
      desc: 'Стойкие защитники Империи на Стене Кайю. Ценят силу и прагматизм.',
      stats: ['+1 Земля', '+1 Физ. подготовка', 'Статус: 30'],
      rings: [2, 5, 2, 3, 2],
    },
    crane: {
      name: 'Журавль',
      kanji: '鶴',
      color: '#3498DB',
      desc: 'Мастера политики, искусства и дуэлей. Задают стандарты культуры.',
      stats: ['+1 Воздух', '+1 Культура', 'Статус: 35'],
      rings: [5, 2, 3, 3, 2],
    },
    dragon: {
      name: 'Дракон',
      kanji: '龍',
      color: '#27AE60',
      desc: 'Загадочные монахи, ищущие просветления в горах.',
      stats: ['+1 Огонь', '+1 Медитация', 'Статус: 30'],
      rings: [3, 3, 4, 3, 4],
    },
    lion: {
      name: 'Лев',
      kanji: '獅',
      color: '#F1C40F',
      desc: 'Правая рука Императора. Величайшая армия Рокугана.',
      stats: ['+1 Вода', '+1 Тактика', 'Статус: 35'],
      rings: [2, 3, 4, 4, 2],
    },
    phoenix: {
      name: 'Феникс',
      kanji: '鳳',
      color: '#E67E22',
      desc: 'Хранители души Империи. Могущественные маги и пацифисты.',
      stats: ['+1 Пустота', '+1 Теология', 'Статус: 30'],
      rings: [3, 2, 3, 2, 5],
    },
    scorpion: {
      name: 'Скорпион',
      kanji: '蠍',
      color: '#C0392B',
      desc: 'Злодейская маска Империи. Шпионы и манипуляторы.',
      stats: ['+1 Воздух', '+1 Скрытность', 'Статус: 30'],
      rings: [4, 2, 3, 3, 2],
    },
    unicorn: {
      name: 'Единорог',
      kanji: '麒',
      color: '#8E44AD',
      desc: 'Всадники с чужеземной магией и лучшей конницей.',
      stats: ['+1 Вода', '+1 Выживание', 'Статус: 30'],
      rings: [2, 2, 3, 5, 2],
    },
  },
  en: {
    crab: {
      name: 'Crab',
      kanji: '蟹',
      color: '#5D6D7E',
      desc: 'Stalwart defenders of the Empire at the Kaiu Wall. They value strength and pragmatism.',
      stats: ['+1 Earth', '+1 Fitness', 'Status: 30'],
      rings: [2, 5, 2, 3, 2],
    },
    crane: {
      name: 'Crane',
      kanji: '鶴',
      color: '#3498DB',
      desc: 'Masters of politics, art, and duels. They set the cultural standard.',
      stats: ['+1 Air', '+1 Culture', 'Status: 35'],
      rings: [5, 2, 3, 3, 2],
    },
    dragon: {
      name: 'Dragon',
      kanji: '龍',
      color: '#27AE60',
      desc: 'Mysterious monks seeking enlightenment in the mountains.',
      stats: ['+1 Fire', '+1 Meditation', 'Status: 30'],
      rings: [3, 3, 4, 3, 4],
    },
    lion: {
      name: 'Lion',
      kanji: '獅',
      color: '#F1C40F',
      desc: 'The Emperor’s right hand. The greatest army in Rokugan.',
      stats: ['+1 Water', '+1 Tactics', 'Status: 35'],
      rings: [2, 3, 4, 4, 2],
    },
    phoenix: {
      name: 'Phoenix',
      kanji: '鳳',
      color: '#E67E22',
      desc: 'Guardians of the Empire’s soul. Powerful shugenja and pacifists.',
      stats: ['+1 Void', '+1 Theology', 'Status: 30'],
      rings: [3, 2, 3, 2, 5],
    },
    scorpion: {
      name: 'Scorpion',
      kanji: '蠍',
      color: '#C0392B',
      desc: 'The Empire’s villainous mask. Spies and manipulators.',
      stats: ['+1 Air', '+1 Skulduggery', 'Status: 30'],
      rings: [4, 2, 3, 3, 2],
    },
    unicorn: {
      name: 'Unicorn',
      kanji: '麒',
      color: '#8E44AD',
      desc: 'Riders with foreign magic and the finest cavalry.',
      stats: ['+1 Water', '+1 Survival', 'Status: 30'],
      rings: [2, 2, 3, 5, 2],
    },
  },
}

export default function ClansDemo() {
  const { locale } = useLocale()
  const t = (ru: string, en: string) => (locale === 'ru' ? ru : en)
  const { theme } = useTheme()
  const [selectedClan, setSelectedClan] = useState('crab')
  const clanData = clanDataByLocale[locale]
  const clan = clanData[selectedClan]

  const labels = locale === 'ru' ? ['Воздух', 'Земля', 'Огонь', 'Вода', 'Пустота'] : ['Air', 'Earth', 'Fire', 'Water', 'Void']
  const isDark = theme === 'dark'

  const chartData = {
    labels,
    datasets: [
      {
        label: clan.name,
        data: clan.rings,
        backgroundColor: clan.color + '33',
        borderColor: clan.color,
        borderWidth: 2,
        pointBackgroundColor: clan.color,
        pointBorderColor: clan.color,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { display: false },
        pointLabels: {
          font: { family: 'Cinzel', size: 11 },
          color: isDark ? 'rgba(231, 231, 231, 0.9)' : '#2b2b2b',
        },
        grid: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' },
        angleLines: { color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' },
      },
    },
    plugins: { legend: { display: false } },
  }

  return (
    <section id="demo" className="py-20 bg-white border-y border-ink/10 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-reveal>
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="section-title mb-0">{t('Великие кланы', 'Great Clans')}</h3>
            <SectionLinkButton targetId="demo" />
          </div>
          <div className="section-divider mx-auto mb-4"></div>
          <p className="section-subtitle mx-auto">{t('Интерактивная демонстрация модели данных (пример)', 'Interactive data model demo (example)')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Clan Grid */}
          <div className="lg:col-span-4" data-reveal data-reveal-delay="0">
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(clanData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedClan(key)}
                  className="clan-card-btn group"
                  style={{
                    backgroundColor:
                      selectedClan === key ? (isDark ? 'rgba(15, 21, 32, 0.92)' : '#fff') : isDark ? 'rgba(255,255,255,0.03)' : '#f9f7f0',
                    borderColor: selectedClan === key ? data.color : isDark ? 'rgba(231, 231, 231, 0.18)' : 'rgba(43, 43, 43, 0.1)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold font-jp text-sm shadow-sm transition-transform group-hover:scale-110"
                    style={{ backgroundColor: data.color }}
                  >
                    {data.kanji}
                  </div>
                  <span className="font-header font-bold text-ink group-hover:text-l5r-red text-sm uppercase tracking-wide">
                    {data.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Clan Display */}
          <div className="lg:col-span-8">
            <div className="bg-paper p-8 rounded-sm shadow-xl border border-ink/10 relative overflow-hidden min-h-[500px]" data-reveal data-reveal-delay="120">
              {/* Watermark */}
              <div
                className="absolute -top-10 -right-10 text-[18rem] leading-none opacity-[0.07] font-jp font-bold pointer-events-none transition-all duration-500 select-none"
                style={{ color: clan.color }}
              >
                {clan.kanji}
              </div>

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center h-full">
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold font-jp text-xs shadow-md transition-colors"
                      style={{ backgroundColor: clan.color }}
                    >
                      {clan.kanji}
                    </div>
                    <h4 className="font-header text-4xl font-bold transition-colors" style={{ color: clan.color }}>
                      {clan.name}
                    </h4>
                  </div>
                  <p
                    className="font-body text-lg text-ink-light mb-6 leading-relaxed border-l-2 pl-4 italic"
                    style={{ borderColor: clan.color }}
                  >
                    {clan.desc}
                  </p>
                  <div className="bg-white/60 p-5 rounded border border-ink/5 shadow-sm">
                    <h5 className="font-bold text-xs uppercase text-gray-500 mb-3 tracking-widest">
                      {t('Бонусы создания', 'Character creation bonuses')}
                    </h5>
                    <ul className="space-y-3 text-sm font-bold text-ink">
                      {clan.stats.map((stat, i) => (
                        <li key={i} className="flex items-center">
                          <i className="fa-solid fa-diamond text-[8px] mr-2" style={{ color: clan.color }}></i>
                          {stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="h-[320px] w-full flex items-center justify-center relative">
                  <Radar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

