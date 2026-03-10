const API_URL = `${import.meta.env.VITE_API_URL}/api/leads`;

/**
 * Helper to get the token and build the Authorization header
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

export const leadService = {
  // GET all leads (Protected)
  getAll: async () => {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch leads");
    return await response.json();
  },

  // GET lead by ID (Protected)
  getById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  },

  // CREATE lead (Public - used by Contact Form)
  create: async (data) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit lead");
    return await response.json();
  },

  // UPDATE lead (Protected)
  update: async (id, data) => {
    console.log("data",data)
    console.log("id",id)
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update lead");
    return await response.json();
  },

  // DELETE lead (Protected)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete lead");
    return true;
  },

  // GET stats (Protected)
  getStats: async () => {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch stats");
    
    const leads = await response.json();
    
    // We calculate stats on the frontend to avoid creating a separate backend endpoint
    return {
      totalLeads: leads.length,
      newLeads: leads.filter(lead => lead.status === "New").length,
      inProgressLeads: leads.filter(lead => lead.status === "In Progress").length,
      resolvedLeads: leads.filter(lead => lead.status === "Resolved").length
    };
  }
};