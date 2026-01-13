"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = createJob;
exports.updateJob = updateJob;
exports.getJob = getJob;
exports.findJobByIdempotency = findJobByIdempotency;
exports.listJobs = listJobs;
// In-memory store for tx jobs (for dev). Replace with persistent DB in production.
const jobs = new Map();
function createJob(job) {
    jobs.set(job.id, job);
    return job;
}
function updateJob(id, patch) {
    const j = jobs.get(id);
    if (!j)
        return null;
    const updated = { ...j, ...patch, updatedAt: new Date().toISOString() };
    jobs.set(id, updated);
    return updated;
}
function getJob(id) {
    return jobs.get(id) ?? null;
}
function findJobByIdempotency(key) {
    for (const j of jobs.values()) {
        if (j.idempotencyKey === key)
            return j;
    }
    return null;
}
function listJobs() {
    return Array.from(jobs.values());
}
