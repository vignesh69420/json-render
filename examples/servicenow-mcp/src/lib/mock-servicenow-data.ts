// Mock ServiceNow MCP API responses

export const mockIncidentResponse = {
  success: true,
  data: {
    incidents: [
      {
        sys_id: "INC0010001",
        number: "INC0010001",
        short_description: "Unable to access email",
        priority: "3 - Moderate",
        state: "In Progress",
        assigned_to: "John Smith",
        created_on: "2026-02-11 10:30:00",
      },
      {
        sys_id: "INC0010002",
        number: "INC0010002",
        short_description: "Laptop not turning on",
        priority: "2 - High",
        state: "New",
        assigned_to: "Jane Doe",
        created_on: "2026-02-11 11:15:00",
      },
      {
        sys_id: "INC0010003",
        number: "INC0010003",
        short_description: "VPN connection issues",
        priority: "3 - Moderate",
        state: "Resolved",
        assigned_to: "Bob Johnson",
        created_on: "2026-02-10 09:00:00",
      },
    ],
  },
};

export const mockUserProfileResponse = {
  success: true,
  data: {
    user: {
      sys_id: "user_123",
      name: "Demo User",
      email: "demo.user@company.com",
      department: "IT Operations",
      title: "System Administrator",
      phone: "+1 555-0123",
      location: "San Francisco Office",
      manager: "Sarah Williams",
    },
  },
};

export const mockCatalogItemsResponse = {
  success: true,
  data: {
    items: [
      {
        sys_id: "cat_001",
        name: "Request a new laptop",
        description: "Submit a request for a new laptop for work",
        category: "Hardware",
        price: "$1,200",
      },
      {
        sys_id: "cat_002",
        name: "Software access request",
        description: "Request access to software applications",
        category: "Software",
        price: "Free",
      },
      {
        sys_id: "cat_003",
        name: "Conference room booking",
        description: "Book a conference room for meetings",
        category: "Facilities",
        price: "Free",
      },
    ],
  },
};

// Utility function to simulate API delay
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Mock API client
export const mockServiceNowAPI = {
  async getIncidents() {
    await delay(500);
    return mockIncidentResponse;
  },

  async getUserProfile() {
    await delay(300);
    return mockUserProfileResponse;
  },

  async getCatalogItems() {
    await delay(400);
    return mockCatalogItemsResponse;
  },

  async createIncident(data: any) {
    await delay(600);
    return {
      success: true,
      data: {
        incident: {
          sys_id: "INC" + Math.floor(Math.random() * 1000000),
          number: "INC" + Math.floor(Math.random() * 1000000),
          ...data,
          state: "New",
          created_on: new Date().toISOString(),
        },
      },
    };
  },

  async updateIncident(sysId: string, data: any) {
    await delay(500);
    return {
      success: true,
      data: {
        incident: {
          sys_id: sysId,
          ...data,
          updated_on: new Date().toISOString(),
        },
      },
    };
  },
};

// Priority badge color mapping
export function getPriorityColor(priority: string): string {
  if (priority.includes("1") || priority.includes("Critical")) return "red";
  if (priority.includes("2") || priority.includes("High")) return "orange";
  if (priority.includes("3") || priority.includes("Moderate")) return "yellow";
  if (priority.includes("4") || priority.includes("Low")) return "green";
  return "blue";
}

// State badge color mapping
export function getStateColor(state: string): string {
  const stateMap: Record<string, string> = {
    New: "blue",
    "In Progress": "yellow",
    Pending: "orange",
    Resolved: "green",
    Closed: "gray",
    Cancelled: "red",
  };
  return stateMap[state] || "blue";
}
