import type {
  DiagnosticAnswers,
  DiagnosticResult,
  FunnelEvent,
  Lead,
  Material,
} from "@/content/schemas";

export type MaterialsResponse = {
  items: Material[];
  facets: {
    themes: Record<string, number>;
    formats: Record<string, number>;
    levels: Record<string, number>;
    total: number;
  };
};

export type MaterialQuery = {
  theme?: string;
  format?: string;
  level?: string;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: init?.body ? { "content-type": "application/json" } : undefined,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(payload?.error ?? "Не удалось получить данные");
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export function fetchMaterials(query: MaterialQuery): Promise<MaterialsResponse> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value) params.set(key, value);
  }
  const search = params.toString();
  return request<MaterialsResponse>(`/api/materials${search ? `?${search}` : ""}`);
}

export function submitDiagnostic(
  answers: DiagnosticAnswers,
): Promise<{ result: DiagnosticResult }> {
  return request<{ result: DiagnosticResult }>(
    `/api/diagnostics/${answers.diagnosticSlug}/result`,
    { method: "POST", body: JSON.stringify(answers) },
  );
}

export function submitLead(lead: Lead): Promise<{ id: string }> {
  return request<{ id: string }>("/api/leads", {
    method: "POST",
    body: JSON.stringify(lead),
  });
}

export function sendFunnelEvent(event: FunnelEvent): Promise<void> {
  return request<void>("/api/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
}
