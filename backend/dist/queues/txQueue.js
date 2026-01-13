"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueTx = enqueueTx;
exports.onJob = onJob;
exports.requeue = requeue;
exports.getQueueLength = getQueueLength;
const events_1 = __importDefault(require("events"));
const uuid_1 = require("uuid");
const txJob_1 = require("../models/txJob");
const emitter = new events_1.default();
const queue = [];
async function enqueueTx(data) {
    // idempotency: if idempotencyKey provided, return existing job
    if (data.idempotencyKey) {
        const existing = (0, txJob_1.findJobByIdempotency)(data.idempotencyKey);
        if (existing)
            return { jobId: existing.id };
    }
    const id = (0, uuid_1.v4)();
    const now = new Date().toISOString();
    const job = (0, txJob_1.createJob)({
        id,
        type: (data.type || 'TRANSFER'),
        status: 'PENDING',
        chainId: data.chainId ?? 1,
        to: data.to,
        amount: data.amount,
        payload: data.payload,
        attempts: 0,
        maxAttempts: data.maxAttempts ?? 5,
        createdAt: now,
        updatedAt: now,
        idempotencyKey: data.idempotencyKey
    });
    queue.push(id);
    // notify worker
    process.nextTick(() => emitter.emit('job'));
    return { jobId: id };
}
function onJob(handler) {
    emitter.on('job', async () => {
        // simple FIFO
        while (queue.length > 0) {
            const id = queue.shift();
            if (id) {
                try {
                    await handler(id);
                }
                catch (e) {
                    // handler should manage job status
                    console.error('job handler error', e);
                }
            }
        }
    });
}
function requeue(jobId) {
    queue.push(jobId);
    process.nextTick(() => emitter.emit('job'));
}
function getQueueLength() {
    return queue.length;
}
