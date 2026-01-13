import Head from 'next/head'
import { useEffect, useState } from 'react'
import WalletConnect from '../components/WalletConnect'
import XPDisplay from '../components/XPDisplay'
import GameLauncher from '../components/GameLauncher'
import axios from 'axios'

export default function Home() {
  const [health, setHealth] = useState<string>('unknown')

  useEffect(() => {
    axios.get('http://localhost:3000/status/ping')
      .then(r => setHealth('ok'))
      .catch(() => setHealth('down'))
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <Head>
        <title>AGIS Dashboard</title>
      </Head>
      <header className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold">AGIS Dashboard</h1>
        <p className="text-sm text-slate-400">Backend: {health}</p>
      </header>

      <main className="max-w-4xl mx-auto mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 md:col-span-1 bg-slate-800 p-4 rounded">
          <WalletConnect />
        </div>

        <div className="col-span-1 md:col-span-1 bg-slate-800 p-4 rounded">
          <XPDisplay />
        </div>

        <div className="col-span-1 md:col-span-1 bg-slate-800 p-4 rounded">
          <GameLauncher />
        </div>
      </main>
    </div>
  )
}
