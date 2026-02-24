import React, { useState } from "react";
import ServiceNowRenderer from "../components/ServiceNowRegistry";
import { sampleUITrees } from "../lib/sample-ui-tree";
import { mockServiceNowAPI } from "../lib/mock-servicenow-data";
import type { UIComponent } from "../components/ServiceNowRegistry";

// Demo page component
export function ServiceNowDemo() {
  const [selectedView, setSelectedView] =
    useState<keyof typeof sampleUITrees>("incidentList");
  const [customUI, setCustomUI] = useState<string>("");
  const [showCustom, setShowCustom] = useState(false);

  const views = [
    { key: "incidentList", label: "Incident List" },
    { key: "createIncidentForm", label: "Create Incident" },
    { key: "userProfileDashboard", label: "User Dashboard" },
    { key: "serviceCatalog", label: "Service Catalog" },
    { key: "incidentDetails", label: "Incident Details" },
  ] as const;

  const handleRenderCustomUI = () => {
    try {
      const parsed = JSON.parse(customUI);
      setShowCustom(true);
    } catch (error) {
      alert("Invalid JSON format. Please check your input.");
    }
  };

  const currentUI =
    showCustom && customUI ? JSON.parse(customUI) : sampleUITrees[selectedView];

  return (
    <div className="servicenow-demo">
      <header className="demo-header">
        <h1>ServiceNow MCP Dynamic UI Generator</h1>
        <p className="subtitle">
          Generate ServiceNow UIs dynamically from JSON responses
        </p>
      </header>

      <div className="demo-controls">
        <div className="view-selector">
          <h3>Select Predefined View:</h3>
          <div className="button-group">
            {views.map(({ key, label }) => (
              <button
                key={key}
                className={`view-button ${selectedView === key && !showCustom ? "active" : ""}`}
                onClick={() => {
                  setSelectedView(key);
                  setShowCustom(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="custom-ui-section">
          <h3>Or Try Custom JSON:</h3>
          <textarea
            className="custom-ui-input"
            value={customUI}
            onChange={(e) => setCustomUI(e.target.value)}
            placeholder={`Enter your ServiceNow MCP JSON response here...

Example:
{
  "type": "container",
  "children": [
    {
      "type": "heading",
      "props": { "level": 1 },
      "children": ["Hello ServiceNow"]
    },
    {
      "type": "text",
      "children": ["This is dynamically generated!"]
    }
  ]
}`}
            rows={10}
          />
          <button className="render-button" onClick={handleRenderCustomUI}>
            Render Custom UI
          </button>
        </div>
      </div>

      <div className="demo-output">
        <div className="output-header">
          <h3>Generated UI Output:</h3>
          <button
            className="json-toggle"
            onClick={() => {
              const jsonView = document.querySelector(".json-view");
              if (jsonView) {
                jsonView.classList.toggle("visible");
              }
            }}
          >
            Toggle JSON
          </button>
        </div>

        <div className="json-view">
          <pre>{JSON.stringify(currentUI, null, 2)}</pre>
        </div>

        <div className="rendered-output">
          <ServiceNowRenderer uiTree={currentUI} />
        </div>
      </div>

      <div className="demo-info">
        <h3>How It Works:</h3>
        <ol>
          <li>
            ServiceNow MCP server returns a JSON response with UI structure
          </li>
          <li>The JSON defines component types, props, and nested children</li>
          <li>Our component registry maps types to React components</li>
          <li>The renderer recursively builds the UI from the JSON tree</li>
        </ol>

        <h3>Supported Components:</h3>
        <div className="component-list">
          <span className="component-tag">container</span>
          <span className="component-tag">form</span>
          <span className="component-tag">input</span>
          <span className="component-tag">select</span>
          <span className="component-tag">button</span>
          <span className="component-tag">table</span>
          <span className="component-tag">card</span>
          <span className="component-tag">list</span>
          <span className="component-tag">text</span>
          <span className="component-tag">heading</span>
          <span className="component-tag">divider</span>
          <span className="component-tag">alert</span>
          <span className="component-tag">badge</span>
          <span className="component-tag">tabs</span>
          <span className="component-tag">modal</span>
        </div>

        <h3>Example JSON Structure:</h3>
        <pre className="example-json">{`{
  "type": "container",
  "props": {
    "className": "my-container"
  },
  "children": [
    {
      "type": "heading",
      "props": { "level": 1 },
      "children": ["My Heading"]
    },
    {
      "type": "button",
      "props": {
        "variant": "primary",
        "onClick": "handleClick"
      },
      "children": ["Click Me"]
    }
  ]
}`}</pre>
      </div>
    </div>
  );
}

export default ServiceNowDemo;
