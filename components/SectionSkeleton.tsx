'use client'

type Kind =
  | 'features'
  | 'achievements'
  | 'code'
  | 'docs'
  | 'tech'
  | 'demo'
  | 'roadmap'
  | 'footer'

function Lines({ count }: { count: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton rounded ${i === 0 ? 'h-4 w-2/3' : 'h-3 w-full'}`}></div>
      ))}
    </div>
  )
}

export default function SectionSkeleton({ kind }: { kind: Kind }) {
  const common = 'py-16 border-b border-ink/10'

  if (kind === 'footer') {
    return (
      <footer className="bg-ink py-12 text-center border-t-2 border-l5r-gold/40" aria-busy="true">
        <div className="container mx-auto px-4">
          <div className="skeleton h-7 w-56 mx-auto rounded mb-3"></div>
          <div className="skeleton h-4 w-80 mx-auto rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-2xl mx-auto mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-7 rounded"></div>
            ))}
          </div>
          <div className="skeleton h-3 w-[520px] max-w-full mx-auto rounded"></div>
        </div>
      </footer>
    )
  }

  return (
    <section className={`${common} ${kind === 'features' || kind === 'roadmap' ? 'bg-paper-dark' : 'bg-white'}`} aria-busy="true">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="skeleton h-9 w-80 mx-auto rounded mb-3"></div>
            <div className="skeleton h-2 w-24 mx-auto rounded mb-4"></div>
            <div className="skeleton h-4 w-[520px] max-w-full mx-auto rounded"></div>
          </div>

          {kind === 'features' && (
            <>
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="card p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="skeleton w-14 h-14 rounded-2xl"></div>
                      <div className="skeleton h-5 w-52 rounded"></div>
                    </div>
                    <Lines count={4} />
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="card p-6">
                    <div className="skeleton h-5 w-40 rounded mb-3"></div>
                    <Lines count={5} />
                  </div>
                ))}
              </div>
            </>
          )}

          {kind === 'achievements' && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="achievement-card p-6">
                    <div className="skeleton h-10 w-16 mx-auto rounded mb-3"></div>
                    <div className="skeleton h-4 w-28 mx-auto rounded mb-2"></div>
                    <div className="skeleton h-3 w-24 mx-auto rounded"></div>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="skeleton w-10 h-10 rounded-full"></div>
                      <div className="skeleton h-4 w-36 rounded"></div>
                    </div>
                    <Lines count={4} />
                  </div>
                ))}
              </div>
            </>
          )}

          {kind === 'code' && (
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4">
                <div className="card-soft p-4">
                  <div className="skeleton h-4 w-20 rounded mb-3"></div>
                  <div className="grid gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="skeleton h-12 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="card overflow-hidden">
                  <div className="px-5 py-4 border-b border-ink/10 bg-white/70">
                    <div className="skeleton h-5 w-72 rounded mb-2"></div>
                    <div className="skeleton h-3 w-64 rounded"></div>
                  </div>
                  <div className="p-5 bg-ink">
                    <div className="skeleton h-3 w-40 rounded mb-4"></div>
                    <div className="space-y-2">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="skeleton h-3 w-full rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {kind === 'docs' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="skeleton w-11 h-11 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="skeleton h-4 w-44 rounded mb-2"></div>
                      <Lines count={3} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {kind === 'tech' && (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="card p-8">
                    <div className="skeleton h-6 w-48 rounded mb-4"></div>
                    <div className="skeleton h-3 w-72 rounded mb-5"></div>
                    <div className="flex flex-wrap gap-3">
                      {Array.from({ length: 10 }).map((__, j) => (
                        <div key={j} className="skeleton h-9 w-28 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 card p-6">
                <div className="skeleton h-6 w-80 mx-auto rounded mb-4"></div>
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="skeleton h-10 w-40 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </>
          )}

          {kind === 'demo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4">
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="skeleton h-14 rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="bg-paper p-8 rounded-sm shadow-xl border border-ink/10 min-h-[500px]">
                  <div className="skeleton h-10 w-48 rounded mb-4"></div>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <Lines count={5} />
                      <div className="mt-6 card-soft p-5">
                        <div className="skeleton h-3 w-32 rounded mb-3"></div>
                        <div className="space-y-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="skeleton h-4 w-60 rounded"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="skeleton h-[320px] w-full rounded-xl"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {kind === 'roadmap' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="skeleton w-12 h-12 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="skeleton h-4 w-24 rounded mb-2"></div>
                      <div className="skeleton h-5 w-56 rounded"></div>
                    </div>
                  </div>
                  <Lines count={4} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

