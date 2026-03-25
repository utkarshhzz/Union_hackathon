const API_URL = "http://localhost:8000/api/v1";

export type Upload = any;
export type Report = any;
export type Pattern = any;
export type SuspiciousAddress = any;
export type GraphData = any;
export type User = any;

const fetchApi = async (path: string, options: RequestInit = {}) => {
  const url = `${API_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};

export const dashboardApi = {
  getStats: () => fetchApi("/dashboard/stats"),
};

export const uploadApi = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  },
  getHistory: (page = 1, limit = 50, status?: string) => 
    fetchApi(`/upload/history?page=${page}&limit=${limit}${status ? `&status=${status}` : ''}`),
};

export const analysisApi = {
  getPatterns: (uploadId?: string) => fetchApi(`/analysis/patterns${uploadId ? `?uploadId=${uploadId}` : ''}`),
  getSuspiciousAddresses: (uploadId?: string, page = 1, limit = 100) => 
    fetchApi(`/analysis/addresses?page=${page}&limit=${limit}${uploadId ? `&uploadId=${uploadId}` : ''}`),
};

export const graphApi = {
  getSuspiciousSubgraph: (uploadId: string, topK: number, hop: number) => 
    fetchApi(`/graph/subgraph?uploadId=${uploadId}&topK=${topK}&hop=${hop}`),
};

export const reportsApi = {
  getHistory: (userId?: string, page = 1, limit = 20) => fetchApi(`/reports?page=${page}&limit=${limit}`),
  generate: (data: any) => fetchApi("/reports/generate", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  downloadReport: async (reportId: string) => {
    const response = await fetch(`${API_URL}/reports/${reportId}/download`);
    return response.blob();
  },
};

export const settingsApi = {
  getApiKeys: async () => [],
  createApiKey: async (name: string) => ({ id: "1", name, key: "mock-key", created_at: new Date().toISOString() }),
  deleteApiKey: async (id: string) => {},
  updateSettings: async (settings: any) => {},
};

export const authApi = {
  getGoogleAuthUrl: async () => ({ authorization_url: "http://localhost:5173/cryptoflow/auth/callback?code=mock" }),
  handleCallback: async (code: string, provider: string) => ({ user: { name: "Demo User", email: "demo@smurfpakad.ai" }, access_token: "mock_token" }),
  logout: async () => {},
};
