import { Component, createSignal, Show } from "solid-js";
import { BRANDING } from "../../lib/branding";
import "./AdminLayout.css";

interface AdminLayoutProps {
  children: any;
}

export const AdminLayout: Component<AdminLayoutProps> = (props) => {
  const [sidebarOpen, setSidebarOpen] = createSignal(true);
  const [currentSection, setCurrentSection] = createSignal("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "servers", label: "Server Management", icon: "🏠" },
    { id: "moderation", label: "Content Moderation", icon: "🛡️" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "System Settings", icon: "⚙️" },
  ];

  return (
    <div class="admin-layout">
      {/* Sidebar */}
      <div class={`admin-sidebar ${sidebarOpen() ? 'open' : 'closed'}`}>
        <div class="sidebar-header">
          <h2>{BRANDING.name} Admin</h2>
          <button 
            class="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen())}
          >
            {sidebarOpen() ? '◀' : '▶'}
          </button>
        </div>
        
        <nav class="sidebar-nav">
          {menuItems.map(item => (
            <button
              class={`nav-item ${currentSection() === item.id ? 'active' : ''}`}
              onClick={() => setCurrentSection(item.id)}
            >
              <span class="nav-icon">{item.icon}</span>
              <Show when={sidebarOpen()}>
                <span class="nav-label">{item.label}</span>
              </Show>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div class="admin-main">
        <header class="admin-header">
          <div class="header-left">
            <h1>{menuItems.find(item => item.id === currentSection())?.label}</h1>
          </div>
          <div class="header-right">
            <span class="admin-user">Admin User</span>
            <button class="logout-btn">Logout</button>
          </div>
        </header>
        
        <main class="admin-content">
          {props.children}
        </main>
      </div>
    </div>
  );
}; 