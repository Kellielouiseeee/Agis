export function calculateRewardForScore(score: number) {
  // Simple linear reward for demo: 10 AGIS per 100 points
  const reward = Math.floor(score / 1) * 1; // 1 token per point for demo
  return { amount: reward, symbol: 'AGISX' };
}
