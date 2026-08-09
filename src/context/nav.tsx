import { createContext, useContext, useState, type ReactNode } from 'react'

export type Page = 'home' | 'services' | 'portfolio' | 'store' | 'about' | 'contact'

interface NavCtx {
  page: Page
  navigate: (p: Page) => void
}

const Ctx = createContext<NavCtx>({ page: 'home', navigate: () => {} })

export function NavProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <Ctx.Provider value={{ page, navigate }}>{children}</Ctx.Provider>
}

export const useNav = () => useContext(Ctx)
