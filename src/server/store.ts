import type { FunnelEvent, Lead } from "@/content/schemas";

/**
 * Прототипное хранилище в памяти процесса. Заменяется на реальную БД
 * или CRM без изменения вызывающего кода: интерфейс — эти функции.
 */
type StoredLead = Lead & { id: string; createdAt: string };
type StoredEvent = FunnelEvent & { id: string; createdAt: string };

const MAX_EVENTS = 200;

const globalStore = globalThis as unknown as {
  __lahLeads?: StoredLead[];
  __lahEvents?: StoredEvent[];
};

globalStore.__lahLeads ??= [];
globalStore.__lahEvents ??= [];

const leads = globalStore.__lahLeads;
const events = globalStore.__lahEvents;

export function saveLead(lead: Lead): StoredLead {
  const stored: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  leads.push(stored);
  return stored;
}

export function listLeads(): StoredLead[] {
  return [...leads].reverse();
}

export function saveEvent(event: FunnelEvent): StoredEvent {
  const stored: StoredEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  events.push(stored);
  if (events.length > MAX_EVENTS) events.splice(0, events.length - MAX_EVENTS);
  return stored;
}

export function listEvents(): StoredEvent[] {
  return [...events].reverse();
}
