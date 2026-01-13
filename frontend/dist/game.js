const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');

const state = {
  running: false,
  lastTime: 0,
  player: { x: 320, y: 180, r: 12, speed: 160 },
  keys: {},
  score: 0,
  targets: []
};

function spawnTarget(){
  const r = 8;
  state.targets.push({
    x: Math.random()*(canvas.width-40)+20,
    y: Math.random()*(canvas.height-40)+20,
    r
  });
}

function step(ts){
  if(!state.running) { state.lastTime = ts; requestAnimationFrame(step); return; }
  const dt = Math.min((ts - state.lastTime)/1000, 0.05);
  state.lastTime = ts;
  update(dt);
  render();
  requestAnimationFrame(step);
}

function update(dt){
  const p = state.player;
  const v = p.speed * dt;
  if(state.keys['ArrowLeft']) p.x -= v;
  if(state.keys['ArrowRight']) p.x += v;
  if(state.keys['ArrowUp']) p.y -= v;
  if(state.keys['ArrowDown']) p.y += v;
  p.x = Math.max(p.r, Math.min(canvas.width - p.r, p.x));
  p.y = Math.max(p.r, Math.min(canvas.height - p.r, p.y));

  // collision
  state.targets = state.targets.filter(t => {
    const dx = p.x - t.x, dy = p.y - t.y;
    if(Math.hypot(dx,dy) < p.r + t.r){
      state.score += 1;
      scoreEl.textContent = state.score;
      // spawn a new one
      setTimeout(spawnTarget, 250);
      return false; // remove
    }
    return true;
  });
  if(state.targets.length < 3 && Math.random() < 0.02) spawnTarget();
}

function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // targets
  state.targets.forEach(t => {
    ctx.beginPath(); ctx.fillStyle = '#f59e0b'; ctx.arc(t.x,t.y,t.r,0,Math.PI*2); ctx.fill();
  });
  // player
  ctx.beginPath(); ctx.fillStyle = '#60a5fa'; ctx.arc(state.player.x, state.player.y, state.player.r,0,Math.PI*2); ctx.fill();
}

window.addEventListener('keydown', e=>{ state.keys[e.key] = true });
window.addEventListener('keyup', e=>{ state.keys[e.key] = false });

startBtn.onclick = ()=>{ if(!state.running){ state.running = true; state.lastTime = performance.now(); requestAnimationFrame(step); }};
pauseBtn.onclick = ()=>{ state.running = false };
resetBtn.onclick = ()=>{ state.score = 0; scoreEl.textContent = 0; state.player.x = canvas.width/2; state.player.y = canvas.height/2; state.targets = []; spawnTarget(); }

// initial spawn
for(let i=0;i<3;i++) spawnTarget();
render();
