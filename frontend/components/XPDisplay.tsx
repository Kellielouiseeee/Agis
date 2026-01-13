import { useEffect, useState } from 'react'
import apiClient from '../lib/apiClient'

export default function XPDisplay(){
  const [claimable, setClaimable] = useState<number | null>(null)

  useEffect(()=>{
    apiClient.getRewardsBalance('demo-user').then((r:any)=>{
      setClaimable(r?.claimable ?? 0)
    }).catch(()=>setClaimable(null))
  },[])

  return (
    <div>
      <h2 className="text-lg font-medium">XP & Rewards</h2>
      <div className="mt-3">
        <p className="text-sm">Claimable: <span className="font-mono">{claimable === null ? '—' : claimable}</span></p>
      </div>
    </div>
  )
}
