import { UIComponent } from "../components/ServiceNowRegistry";

// Sample UI Tree 1: Incident List View
export const incidentListUI: UIComponent = {
  type: "container",
  props: {
    className: "incident-list-container",
  },
  children: [
    {
      type: "heading",
      props: { level: 1 },
      children: ["ServiceNow Incidents"],
    },
    {
      type: "divider",
    },
    {
      type: "alert",
      props: { type: "info" },
      children: ["You have 2 active incidents assigned to you"],
    },
    {
      type: "table",
      props: {
        headers: [
          "Number",
          "Description",
          "Priority",
          "State",
          "Assigned To",
          "Created",
        ],
        rows: [
          [
            "INC0010001",
            "Unable to access email",
            "3 - Moderate",
            "In Progress",
            "John Smith",
            "2026-02-11 10:30",
          ],
          [
            "INC0010002",
            "Laptop not turning on",
            "2 - High",
            "New",
            "Jane Doe",
            "2026-02-11 11:15",
          ],
          [
            "INC0010003",
            "VPN connection issues",
            "3 - Moderate",
            "Resolved",
            "Bob Johnson",
            "2026-02-10 09:00",
          ],
        ],
      },
    },
  ],
};

// Sample UI Tree 2: Create Incident Form
export const createIncidentFormUI: UIComponent = {
  type: "container",
  props: {
    className: "create-incident-container",
  },
  children: [
    {
      type: "card",
      props: {
        title: "Create New Incident",
      },
      children: [
        {
          type: "form",
          props: {
            onSubmit: (e: any) => {
              console.log("Form submitted:", new FormData(e.target));
            },
          },
          children: [
            {
              type: "input",
              props: {
                label: "Short Description",
                type: "text",
                name: "short_description",
                placeholder: "Brief description of the issue",
                required: true,
              },
            },
            {
              type: "select",
              props: {
                label: "Priority",
                name: "priority",
                options: [
                  { label: "1 - Critical", value: "1" },
                  { label: "2 - High", value: "2" },
                  { label: "3 - Moderate", value: "3" },
                  { label: "4 - Low", value: "4" },
                ],
              },
            },
            {
              type: "select",
              props: {
                label: "Category",
                name: "category",
                options: [
                  { label: "Hardware", value: "hardware" },
                  { label: "Software", value: "software" },
                  { label: "Network", value: "network" },
                  { label: "Service", value: "service" },
                ],
              },
            },
            {
              type: "input",
              props: {
                label: "Description",
                type: "text",
                name: "description",
                placeholder: "Detailed description of the issue",
              },
            },
            {
              type: "button",
              props: {
                variant: "primary",
                type: "submit",
              },
              children: ["Create Incident"],
            },
          ],
        },
      ],
    },
  ],
};

// Sample UI Tree 3: User Profile Dashboard
export const userProfileDashboardUI: UIComponent = {
  type: "container",
  props: {
    className: "user-dashboard-container",
  },
  children: [
    {
      type: "heading",
      props: { level: 1 },
      children: ["User Dashboard"],
    },
    {
      type: "divider",
    },
    {
      type: "container",
      props: {
        className: "dashboard-grid",
      },
      children: [
        {
          type: "card",
          props: {
            title: "Profile Information",
          },
          children: [
            {
              type: "text",
              children: ["Name: Demo User"],
            },
            {
              type: "text",
              children: ["Email: demo.user@company.com"],
            },
            {
              type: "text",
              children: ["Department: IT Operations"],
            },
            {
              type: "text",
              children: ["Title: System Administrator"],
            },
            {
              type: "badge",
              props: { color: "green" },
              children: ["Active"],
            },
          ],
        },
        {
          type: "card",
          props: {
            title: "Quick Stats",
          },
          children: [
            {
              type: "list",
              props: {
                items: [
                  "Open Incidents: 5",
                  "Resolved This Month: 23",
                  "Pending Approvals: 2",
                  "Catalog Requests: 3",
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};

// Sample UI Tree 4: Service Catalog
export const serviceCatalogUI: UIComponent = {
  type: "container",
  props: {
    className: "service-catalog-container",
  },
  children: [
    {
      type: "heading",
      props: { level: 1 },
      children: ["Service Catalog"],
    },
    {
      type: "divider",
    },
    {
      type: "tabs",
      props: {
        tabs: [
          {
            label: "Hardware",
            content: {
              type: "card",
              children: [
                {
                  type: "heading",
                  props: { level: 3 },
                  children: ["Request a new laptop"],
                },
                {
                  type: "text",
                  children: ["Submit a request for a new laptop for work"],
                },
                {
                  type: "badge",
                  props: { color: "blue" },
                  children: ["$1,200"],
                },
                {
                  type: "button",
                  props: { variant: "primary" },
                  children: ["Request Now"],
                },
              ],
            },
          },
          {
            label: "Software",
            content: {
              type: "card",
              children: [
                {
                  type: "heading",
                  props: { level: 3 },
                  children: ["Software access request"],
                },
                {
                  type: "text",
                  children: ["Request access to software applications"],
                },
                {
                  type: "badge",
                  props: { color: "green" },
                  children: ["Free"],
                },
                {
                  type: "button",
                  props: { variant: "primary" },
                  children: ["Request Access"],
                },
              ],
            },
          },
          {
            label: "Facilities",
            content: {
              type: "card",
              children: [
                {
                  type: "heading",
                  props: { level: 3 },
                  children: ["Conference room booking"],
                },
                {
                  type: "text",
                  children: ["Book a conference room for meetings"],
                },
                {
                  type: "badge",
                  props: { color: "green" },
                  children: ["Free"],
                },
                {
                  type: "button",
                  props: { variant: "primary" },
                  children: ["Book Now"],
                },
              ],
            },
          },
        ],
      },
    },
  ],
};

// Sample UI Tree 5: Incident Details with Actions
export const incidentDetailsUI: UIComponent = {
  type: "container",
  props: {
    className: "incident-details-container",
  },
  children: [
    {
      type: "container",
      props: {
        className: "incident-header",
      },
      children: [
        {
          type: "heading",
          props: { level: 1 },
          children: ["Incident INC0010001"],
        },
        {
          type: "badge",
          props: { color: "yellow" },
          children: ["In Progress"],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      type: "card",
      props: {
        title: "Incident Information",
      },
      children: [
        {
          type: "text",
          children: ["Short Description: Unable to access email"],
        },
        {
          type: "text",
          children: ["Priority: 3 - Moderate"],
        },
        {
          type: "text",
          children: ["Assigned To: John Smith"],
        },
        {
          type: "text",
          children: ["Created: 2026-02-11 10:30:00"],
        },
        {
          type: "divider",
        },
        {
          type: "heading",
          props: { level: 3 },
          children: ["Actions"],
        },
        {
          type: "container",
          props: {
            className: "action-buttons",
          },
          children: [
            {
              type: "button",
              props: { variant: "primary" },
              children: ["Resolve"],
            },
            {
              type: "button",
              props: { variant: "secondary" },
              children: ["Reassign"],
            },
            {
              type: "button",
              props: { variant: "secondary" },
              children: ["Add Comment"],
            },
          ],
        },
      ],
    },
  ],
};

// Combined export with all sample UIs
export const sampleUITrees = {
  incidentList: incidentListUI,
  createIncidentForm: createIncidentFormUI,
  userProfileDashboard: userProfileDashboardUI,
  serviceCatalog: serviceCatalogUI,
  incidentDetails: incidentDetailsUI,
};
