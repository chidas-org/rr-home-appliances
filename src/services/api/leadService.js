import mockLeads from "@/services/mockData/leads.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Load leads from localStorage or use mock data
const getLeadsFromStorage = () => {
  try {
    const stored = localStorage.getItem("quickfix_leads");
    return stored ? JSON.parse(stored) : [...mockLeads];
  } catch {
    return [...mockLeads];
  }
};

const saveLeadsToStorage = (leads) => {
  try {
    localStorage.setItem("quickfix_leads", JSON.stringify(leads));
  } catch (error) {
    console.error("Failed to save leads to storage:", error);
  }
};

let leadsData = getLeadsFromStorage();

export const leadService = {
  getAll: async () => {
    await delay(Math.random() * 300 + 200);
    leadsData = getLeadsFromStorage();
    return [...leadsData];
  },
  getById: async (id) => {
    await delay(Math.random() * 300 + 200);
    leadsData = getLeadsFromStorage();
    return leadsData.find(item => item.Id === parseInt(id)) || null;
  },
  create: async (data) => {
    await delay(Math.random() * 500 + 300); // Slightly longer for form submission
    leadsData = getLeadsFromStorage();
    const maxId = Math.max(...leadsData.map(i => i.Id), 0);
    const newItem = { 
      ...data, 
      Id: maxId + 1,
      submittedAt: new Date().toISOString(),
      status: "New"
    };
    leadsData.push(newItem);
    saveLeadsToStorage(leadsData);
    return { ...newItem };
  },
  update: async (id, data) => {
    await delay(Math.random() * 300 + 200);
    leadsData = getLeadsFromStorage();
    const idx = leadsData.findIndex(i => i.Id === parseInt(id));
    if (idx === -1) throw new Error("Not found");
    leadsData[idx] = { ...leadsData[idx], ...data };
    saveLeadsToStorage(leadsData);
    return { ...leadsData[idx] };
  },
  delete: async (id) => {
    await delay(Math.random() * 300 + 200);
    leadsData = getLeadsFromStorage();
    const idx = leadsData.findIndex(i => i.Id === parseInt(id));
    if (idx === -1) throw new Error("Not found");
    leadsData.splice(idx, 1);
    saveLeadsToStorage(leadsData);
    return true;
  },
  getStats: async () => {
    await delay(Math.random() * 200 + 100);
    leadsData = getLeadsFromStorage();
    const totalLeads = leadsData.length;
    const newLeads = leadsData.filter(lead => lead.status === "New").length;
    const inProgressLeads = leadsData.filter(lead => lead.status === "In Progress").length;
    const resolvedLeads = leadsData.filter(lead => lead.status === "Resolved").length;
    
    return {
      totalLeads,
      newLeads,
      inProgressLeads,
      resolvedLeads
    };
  }
};