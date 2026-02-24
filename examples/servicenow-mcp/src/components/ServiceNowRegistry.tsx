import React from "react";

// Type definitions for ServiceNow MCP JSON response
export interface UIComponent {
  type: string;
  props?: Record<string, any>;
  children?: (UIComponent | string)[];
  id?: string;
}

// Component Registry - Maps ServiceNow component types to React components
const componentMap: Record<string, React.ComponentType<any>> = {
  container: Container,
  form: Form,
  input: Input,
  select: Select,
  button: Button,
  table: Table,
  card: Card,
  list: List,
  text: Text,
  heading: Heading,
  divider: Divider,
  alert: Alert,
  badge: Badge,
  tabs: Tabs,
  modal: Modal,
};

// Container Component
function Container({ children, className, ...props }: any) {
  return (
    <div className={`container ${className || ""}`} {...props}>
      {children}
    </div>
  );
}

// Form Component
function Form({ children, onSubmit, className, ...props }: any) {
  return (
    <form
      className={`form ${className || ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      {...props}
    >
      {children}
    </form>
  );
}

// Input Component
function Input({
  label,
  type = "text",
  placeholder,
  name,
  required,
  ...props
}: any) {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        className="input"
        {...props}
      />
    </div>
  );
}

// Select Component
function Select({ label, options = [], name, placeholder, ...props }: any) {
  return (
    <div className="select-wrapper">
      {label && <label className="select-label">{label}</label>}
      <select name={name} className="select" {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt: any, idx: number) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Button Component
function Button({ children, variant = "primary", onClick, ...props }: any) {
  return (
    <button className={`button button-${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

// Table Component
function Table({ headers = [], rows = [], ...props }: any) {
  return (
    <div className="table-wrapper">
      <table className="table" {...props}>
        <thead>
          <tr>
            {headers.map((header: string, idx: number) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any[], rowIdx: number) => (
            <tr key={rowIdx}>
              {row.map((cell: any, cellIdx: number) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Card Component
function Card({ title, children, footer, ...props }: any) {
  return (
    <div className="card" {...props}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// List Component
function List({ items = [], ordered = false, ...props }: any) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className="list" {...props}>
      {items.map((item: any, idx: number) => (
        <li key={idx}>{item}</li>
      ))}
    </ListTag>
  );
}

// Text Component
function Text({ children, className, ...props }: any) {
  return (
    <p className={`text ${className || ""}`} {...props}>
      {children}
    </p>
  );
}

// Heading Component
function Heading({ level = 1, children, ...props }: any) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return React.createElement(Tag, { className: "heading", ...props }, children);
}

// Divider Component
function Divider(props: any) {
  return <hr className="divider" {...props} />;
}

// Alert Component
function Alert({ type = "info", children, ...props }: any) {
  return (
    <div className={`alert alert-${type}`} {...props}>
      {children}
    </div>
  );
}

// Badge Component
function Badge({ children, color = "blue", ...props }: any) {
  return (
    <span className={`badge badge-${color}`} {...props}>
      {children}
    </span>
  );
}

// Tabs Component
function Tabs({ tabs = [], activeTab = 0, ...props }: any) {
  const [active, setActive] = React.useState(activeTab);

  return (
    <div className="tabs" {...props}>
      <div className="tabs-header">
        {tabs.map((tab: any, idx: number) => (
          <button
            key={idx}
            className={`tab-button ${active === idx ? "active" : ""}`}
            onClick={() => setActive(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">{tabs[active]?.content}</div>
    </div>
  );
}

// Modal Component
function Modal({ isOpen, onClose, title, children, ...props }: any) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} {...props}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

// Main renderer function
export function renderComponent(
  component: UIComponent,
  key?: number,
): React.ReactNode {
  if (typeof component === "string") {
    return component;
  }

  const Component = componentMap[component.type];

  if (!Component) {
    console.warn(`Unknown component type: ${component.type}`);
    return null;
  }

  const children = component.children?.map((child, idx) =>
    renderComponent(child, idx),
  );

  return (
    <Component key={key || component.id} {...component.props}>
      {children}
    </Component>
  );
}

// Main ServiceNow Dynamic UI Renderer
export function ServiceNowRenderer({ uiTree }: { uiTree: UIComponent }) {
  return <>{renderComponent(uiTree)}</>;
}

export default ServiceNowRenderer;
