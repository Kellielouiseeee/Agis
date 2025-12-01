import { Shield, AlertTriangle, Wrench, Activity } from "lucide-react";

export function SystemHealth() {
  const swarmStatus = {
    warning: 0,
    repairing: 1,
    isolated: 0,
    healthy: 15,
  };

  const showAlert = swarmStatus.warning > 0 || swarmStatus.repairing > 0 || swarmStatus.isolated > 0;

  return (
    <div className="border-b border-white/10 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white">System Status:</span>
              <span className="text-sm text-green-400">Optimal</span>
            </div>
            
            {/* Active Swarms */}
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/70">{swarmStatus.healthy} Swarms Active</span>
            </div>

            {/* Auto-Repairing */}
            {swarmStatus.repairing > 0 && (
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-sm text-yellow-400">{swarmStatus.repairing} Auto-Repairing</span>
              </div>
            )}

            {/* Warnings */}
            {swarmStatus.warning > 0 && (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 animate-pulse" />
                <span className="text-sm text-orange-400">{swarmStatus.warning} Warnings Detected</span>
              </div>
            )}

            {/* Isolated */}
            {swarmStatus.isolated > 0 && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">{swarmStatus.isolated} Threats Isolated</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>🛡️ Quantum Shield: Active</span>
            <span>🤖 AI Monitor: Online</span>
            <span>⚡ Uptime: 99.99%</span>
          </div>
        </div>

        {/* Auto-Repair Message */}
        {swarmStatus.repairing > 0 && (
          <div className="mt-2 p-2 bg-yellow-500/10 rounded border border-yellow-400/30 text-xs text-yellow-200">
            🔧 Auto-repair swarms detected minor anomaly and are resolving it. No action needed. Your funds are safe.
          </div>
        )}
      </div>
    </div>
  );
}
