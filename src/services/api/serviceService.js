import mockServices from "@/services/mockData/services.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const serviceService = {
  getAll: async () => {
    await delay(Math.random() * 300 + 200);
    return [...mockServices];
  },
  getById: async (id) => {
    await delay(Math.random() * 300 + 200);
    return mockServices.find(item => item.Id === parseInt(id)) || null;
  },
  create: async (data) => {
    await delay(Math.random() * 300 + 200);
    const maxId = Math.max(...mockServices.map(i => i.Id), 0);
    const newItem = { ...data, Id: maxId + 1 };
    mockServices.push(newItem);
    return { ...newItem };
  },
  update: async (id, data) => {
    await delay(Math.random() * 300 + 200);
    const idx = mockServices.findIndex(i => i.Id === parseInt(id));
    if (idx === -1) throw new Error("Not found");
    mockServices[idx] = { ...mockServices[idx], ...data };
    return { ...mockServices[idx] };
  },
  delete: async (id) => {
    await delay(Math.random() * 300 + 200);
    const idx = mockServices.findIndex(i => i.Id === parseInt(id));
    if (idx === -1) throw new Error("Not found");
    mockServices.splice(idx, 1);
    return true;
  }
};