(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let running = false;
  let score = 0;

  function draw() {
    if (!ctx) return;
    ctx.fillStyle = '#071025';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#60a5fa';
    ctx.font = '18px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
  }

  function loop() {
    if (!running) return;
    score += 1;
    draw();
    requestAnimationFrame(loop);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const start = document.getElementById('startBtn');
    const submit = document.getElementById('submitBtn');
    const scoreEl = document.getElementById('score');
    if (start) start.addEventListener('click', () => { running = !running; if (running) loop(); });
    if (submit) submit.addEventListener('click', () => {
      if (scoreEl) scoreEl.textContent = String(score);
      // post result to parent window for server-authoritative handling
      const payload = { sessionId: window.AGIS_SESSION_ID || null, score, durationMs: 0, eventsHash: null };
      if (window.parent) {
        window.parent.postMessage({ type: 'GAME_RESULT', payload }, '*');
      }
    });
    draw();
  });
  // listen for session message from parent
  window.addEventListener('message', (e) => {
    try {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'SESSION') {
        const sid = e.data.payload?.sessionId;
        (window).AGIS_SESSION_ID = sid;
      }
    } catch (err) {}
  });
})();
