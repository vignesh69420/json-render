# ServiceNow MCP Dynamic UI Example

This example demonstrates how to generate UI dynamically from ServiceNow MCP JSON responses. The implementation includes a component registry that maps JSON structures to React components, enabling fully dynamic UI rendering.

## Features

- **Dynamic UI Generation**: Render complex UIs from JSON tree structures
- **Component Registry**: Maps ServiceNow component types to React components
- **15+ Components**: Includes forms, tables, cards, tabs, modals, and more
- **Sample UIs**: Pre-built examples for common ServiceNow workflows
- **Custom JSON Input**: Test your own JSON structures in real-time
- **Mock Data**: Simulated ServiceNow API responses for demonstration

## Architecture

### Core Components

1. **ServiceNowRegistry.tsx** - Component registry and renderer
   - Maps JSON component types to React components
   - Recursive rendering engine
   - Type-safe component definitions

2. **sample-ui-tree.ts** - Pre-built UI examples
   - Incident list view
   - Create incident form
   - User dashboard
   - Service catalog
   - Incident details

3. **mock-servicenow-data.ts** - Mock data utilities
   - Simulated API responses
   - Helper functions for data transformation
   - Color mapping for badges and states

4. **ServiceNowDemo.tsx** - Main demo application
   - View selector interface
   - Custom JSON input
   - Live UI rendering
   - JSON/UI toggle view

## Supported Components

| Component | Description | Example Usage |
|-----------|-------------|---------------|
| `container` | Layout container | Grouping elements |
| `form` | Form wrapper | Data input forms |
| `input` | Text input field | User input |
| `select` | Dropdown selector | Option selection |
| `button` | Action button | Form submission, actions |
| `table` | Data table | List views |
| `card` | Content card | Information blocks |
| `list` | Ordered/unordered list | Item lists |
| `text` | Text paragraph | Content display |
| `heading` | Section heading | Titles (h1-h6) |
| `divider` | Horizontal separator | Visual separation |
| `alert` | Alert message | Notifications |
| `badge` | Status badge | Status indicators |
| `tabs` | Tabbed interface | Multi-view content |
| `modal` | Modal dialog | Overlays |

## JSON Structure Format

```json
{
  "type": "container",
  "props": {
    "className": "my-custom-class"
  },
  "children": [
    {
      "type": "heading",
      "props": { "level": 1 },
      "children": ["My Title"]
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
}
```

### JSON Schema

- **type** (string, required): Component type from registry
- **props** (object, optional): Component properties
- **children** (array, optional): Nested components or text
- **id** (string, optional): Unique identifier

## Usage Examples

### Example 1: Simple Form

```json
{
  "type": "form",
  "children": [
    {
      "type": "input",
      "props": {
        "label": "Email",
        "type": "email",
        "required": true
      }
    },
    {
      "type": "button",
      "props": { "variant": "primary" },
      "children": ["Submit"]
    }
  ]
}
```

### Example 2: Data Table

```json
{
  "type": "table",
  "props": {
    "headers": ["ID", "Name", "Status"],
    "rows": [
      ["001", "John Doe", "Active"],
      ["002", "Jane Smith", "Pending"]
    ]
  }
}
```

### Example 3: Card Layout

```json
{
  "type": "card",
  "props": {
    "title": "User Profile"
  },
  "children": [
    {
      "type": "text",
      "children": ["Name: John Doe"]
    },
    {
      "type": "badge",
      "props": { "color": "green" },
      "children": ["Active"]
    }
  ]
}
```

## Integration with ServiceNow MCP

### MCP Server Response Format

Your ServiceNow MCP server should return responses in this format:

```json
{
  "success": true,
  "data": {
    "ui": {
      "type": "container",
      "children": [
        // UI components here
      ]
    }
  }
}
```

### Example MCP Implementation

```typescript
import { ServiceNowRenderer } from './components/ServiceNowRegistry';

// Fetch from MCP server
const response = await fetch('http://localhost:3000/mcp/incidents');
const data = await response.json();

// Render the UI
<ServiceNowRenderer uiTree={data.ui} />
```

## Running the Demo

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Import Components**
   ```typescript
   import ServiceNowDemo from './examples/servicenow-mcp/src/app/ServiceNowDemo';
   import './examples/servicenow-mcp/src/app/styles.css';
   ```

3. **Use in Your App**
   ```tsx
   function App() {
     return <ServiceNowDemo />;
   }
   ```

## Extending the Registry

To add new components:

1. Create the component function:
   ```typescript
   function MyCustomComponent({ children, ...props }: any) {
     return <div className="my-component" {...props}>{children}</div>;
   }
   ```

2. Register in componentMap:
   ```typescript
   const componentMap: Record<string, React.ComponentType<any>> = {
     // ... existing components
     'my-custom': MyCustomComponent,
   };
   ```

3. Use in JSON:
   ```json
   {
     "type": "my-custom",
     "children": ["Custom content"]
   }
   ```

## Best Practices

1. **Component Naming**: Use lowercase, hyphenated names (`kebab-case`)
2. **Props Validation**: Add prop validation for production use
3. **Error Handling**: Wrap components in error boundaries
4. **Type Safety**: Define TypeScript interfaces for complex props
5. **Performance**: Use React.memo for frequently re-rendered components
6. **Security**: Sanitize user input and avoid dangerouslySetInnerHTML

## Security Considerations

- Validate all JSON input before rendering
- Sanitize text content to prevent XSS
- Implement CSP (Content Security Policy)
- Avoid executing arbitrary code from JSON
- Use allow-lists for component types and props

## Future Enhancements

- [ ] Add data binding and state management
- [ ] Implement event handler serialization
- [ ] Add validation schemas
- [ ] Support for custom component plugins
- [ ] Real-time preview mode
- [ ] Export/import UI templates
- [ ] Accessibility improvements
- [ ] Performance optimizations

## License

This example is part of the json-render project and follows the same license.

## Contributing

Contributions are welcome! Please submit issues and pull requests to the main repository.
