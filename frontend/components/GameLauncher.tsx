import { useEffect, useRef, useState } from 'react'
import apiClient from '../lib/apiClient'

export default function GameLauncher(){
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(()=>{
    function onMessage(e: MessageEvent) {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'GAME_RESULT') {
        const payload = e.data.payload;
        setStatus('Submitting result...');
        apiClient.submitGameResult(payload).then(r => {
          if (r?.queued) {
            setStatus(`Result queued (${r.jobId})`);
          } else if (r?.ok) {
            setStatus('Result accepted');
          } else {
            setStatus('Result rejected or error');
          }
        }).catch(()=> setStatus('Submission failed'));
      }
    }
    window.addEventListener('message', onMessage);
    return ()=> window.removeEventListener('message', onMessage);
  },[])

  async function startSession() {
    try {
      setStatus('Creating session...');
      const resp = await apiClient.createGameSession({ address: 'demo-user', clientInfo: { ua: navigator.userAgent } });
      const sid = resp?.sessionId || `sess-${Date.now()}`;
      setSessionId(sid);
      setStatus('Session ready');
      // send session to iframe
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({ type: 'SESSION', payload: { sessionId: sid } }, '*');
      }
    } catch (e) {
      setStatus('Session creation failed');
    }
  }

  return (
    <div>
      <h2 className="text-lg font-medium">AGIS Game</h2>
      <p className="text-sm mt-2">Play the mini-game and submit your score to the backend.</p>
      <div className="mt-3">
        <button className="px-3 py-1 bg-sky-500 rounded" onClick={async ()=>{
          if (!open) {
            setOpen(true);
            await startSession();
          } else {
            setOpen(false);
          }
        }}>{open ? 'Close' : 'Launch Game'}</button>
      </div>
      {open && (
        <div className="mt-3">
          <iframe ref={iframeRef} src="/agis-game/index.html" width="100%" height="360" className="border-0 rounded" title="agis-game" />
          <p className="text-sm mt-2">{status}</p>
        </div>
      )}
    </div>
  )
}
