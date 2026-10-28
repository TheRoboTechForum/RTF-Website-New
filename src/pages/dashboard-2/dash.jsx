import React from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Cpu,
  FolderKanban,
  Gauge,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Package,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

import "../../styles/dashboard.css";

const stats = [
  {
    title: "Active Members",
    value: "248",
    change: "+12%",
    icon: Users,
  },
  {
    title: "Active Projects",
    value: "18",
    change: "+4",
    icon: FolderKanban,
  },
  {
    title: "Upcoming Events",
    value: "07",
    change: "+2",
    icon: CalendarDays,
  },
  {
    title: "Pending Requests",
    value: "14",
    change: "+6",
    icon: Bell,
  },
];

const events = [
  {
    date: "24",
    month: "SEP",
    title: "Robotics Workshop",
    time: "10:00 AM",
    location: "RTF Lab",
    type: "Workshop",
  },
  {
    date: "28",
    month: "SEP",
    title: "Project Showcase",
    time: "02:00 PM",
    location: "Innovation Hall",
    type: "Showcase",
  },
  {
    date: "04",
    month: "OCT",
    title: "Tech Talk 2026",
    time: "11:30 AM",
    location: "Seminar Hall",
    type: "Talk",
  },
];

const projects = [
  {
    name: "Autonomous Rover",
    team: "Rover Team",
    progress: 78,
    status: "In Progress",
  },
  {
    name: "Line Following Bot",
    team: "Embedded Team",
    progress: 62,
    status: "In Progress",
  },
  {
    name: "Smart Agriculture Robot",
    team: "AI & Robotics",
    progress: 45,
    status: "Development",
  },
  {
    name: "Vision-Based Sorting Bot",
    team: "Computer Vision",
    progress: 91,
    status: "Testing",
  },
];

const requests = [
  {
    name: "Aarav Patil",
    role: "New Member",
    time: "10 min ago",
    initials: "AP",
  },
  {
    name: "Riya Sharma",
    role: "Project Access",
    time: "32 min ago",
    initials: "RS",
  },
  {
    name: "Aditya Joshi",
    role: "Workshop Request",
    time: "1 hr ago",
    initials: "AJ",
  },
];

const resources = [
  {
    name: "Arduino Kits",
    available: "18 / 25",
    icon: Cpu,
  },
  {
    name: "Robotic Arms",
    available: "04 / 06",
    icon: Bot,
  },
  {
    name: "3D Printers",
    available: "02 / 03",
    icon: Package,
  },
];

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <div className="rtf-stat-card">
      <div className="rtf-stat-top">
        <div className="rtf-stat-icon">
          <Icon size={21} />
        </div>

        <span className="rtf-stat-change">
          {change}
          <ArrowUpRight size={14} />
        </span>
      </div>

      <div className="rtf-stat-value">{value}</div>
      <div className="rtf-stat-title">{title}</div>
    </div>
  );
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Gauge },
    { name: "Members", icon: Users },
    { name: "Projects", icon: FolderKanban },
    { name: "Events", icon: CalendarDays },
    { name: "Competitions", icon: ShieldCheck },
    { name: "Resources", icon: Package },
    { name: "Blogs", icon: Lightbulb },
  ];

  return (
    <div className="rtf-dashboard">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="rtf-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`rtf-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="rtf-logo-section">
          <div className="rtf-logo">
            <Bot size={27} />
          </div>

          <div>
            <h2>RTF</h2>
            <span>Robo Tech Forum</span>
          </div>

          <button
            className="rtf-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="rtf-menu-label">MAIN MENU</div>

        <nav className="rtf-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <button
                key={item.name}
                className={`rtf-nav-item ${isActive ? "active" : ""}`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === "Events" && (
                  <span className="rtf-nav-count">7</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="rtf-menu-label rtf-secondary-label">SYSTEM</div>

        <nav className="rtf-navigation">
          <button className="rtf-nav-item">
            <Bell size={19} />
            <span>Notifications</span>
            <span className="rtf-notification-dot" />
          </button>

          <button className="rtf-nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="rtf-sidebar-bottom">
          <div className="rtf-admin-card">
            <div className="rtf-admin-avatar">
              <CircleUserRound size={25} />
            </div>

            <div className="rtf-admin-info">
              <strong>RTF Admin</strong>
              <span>Administrator</span>
            </div>

            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="rtf-main">
        {/* HEADER */}
        <header className="rtf-header">
          <div className="rtf-header-left">
            <button
              className="rtf-mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <div className="rtf-breadcrumb">RTF / Dashboard</div>
              <h1>Dashboard</h1>
            </div>
          </div>

          <div className="rtf-header-right">
            <button className="rtf-header-icon">
              <Bell size={20} />
              <span />
            </button>

            <div className="rtf-profile">
              <div className="rtf-profile-avatar">
                <CircleUserRound size={23} />
              </div>

              <div className="rtf-profile-text">
                <strong>RTF Admin</strong>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="rtf-content">
          {/* WELCOME */}
          <section className="rtf-welcome">
            <div>
              <span className="rtf-small-label">ROBO TECH FORUM</span>

              <h2>
                Welcome back,
                <br />
                <span>RTF Admin</span>
              </h2>

              <p>
                Monitor your forum, projects, events and robotics activities
                from one place.
              </p>
            </div>

            <div className="rtf-welcome-robot">
              <div className="rtf-orbit orbit-one" />
              <div className="rtf-orbit orbit-two" />
              <Bot size={82} strokeWidth={1.2} />
            </div>
          </section>

          {/* STATS */}
          <section className="rtf-stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </section>

          {/* MAIN GRID */}
          <section className="rtf-dashboard-grid">
            {/* EVENTS */}
            <div className="rtf-panel rtf-events-panel">
              <div className="rtf-panel-header">
                <div>
                  <span className="rtf-panel-label">SCHEDULE</span>
                  <h3>Upcoming Events</h3>
                </div>

                <button className="rtf-view-button">
                  View all <ChevronRight size={16} />
                </button>
              </div>

              <div className="rtf-events-list">
                {events.map((event) => (
                  <div className="rtf-event-row" key={event.title}>
                    <div className="rtf-event-date">
                      <strong>{event.date}</strong>
                      <span>{event.month}</span>
                    </div>

                    <div className="rtf-event-info">
                      <strong>{event.title}</strong>
                      <span>
                        {event.time} • {event.location}
                      </span>
                    </div>

                    <span className="rtf-event-type">{event.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LAB STATUS */}
            <div className="rtf-panel">
              <div className="rtf-panel-header">
                <div>
                  <span className="rtf-panel-label">RESOURCES</span>
                  <h3>Lab Status</h3>
                </div>

                <Activity size={19} className="rtf-panel-icon" />
              </div>

              <div className="rtf-lab-status">
                <div className="rtf-lab-circle">
                  <span>86%</span>
                  <small>Available</small>
                </div>

                <div className="rtf-lab-details">
                  <div>
                    <span>Lab Capacity</span>
                    <strong>24 / 28</strong>
                  </div>

                  <div className="rtf-progress">
                    <span style={{ width: "86%" }} />
                  </div>

                  <p>
                    <span className="rtf-status-dot green" />
                    Lab is currently operational
                  </p>
                </div>
              </div>

              <div className="rtf-resource-list">
                {resources.map((resource) => {
                  const Icon = resource.icon;

                  return (
                    <div className="rtf-resource-row" key={resource.name}>
                      <div className="rtf-resource-icon">
                        <Icon size={17} />
                      </div>

                      <span>{resource.name}</span>

                      <strong>{resource.available}</strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PROJECTS */}
            <div className="rtf-panel rtf-projects-panel">
              <div className="rtf-panel-header">
                <div>
                  <span className="rtf-panel-label">DEVELOPMENT</span>
                  <h3>Active Projects</h3>
                </div>

                <button className="rtf-view-button">
                  View all <ChevronRight size={16} />
                </button>
              </div>

              <div className="rtf-project-table">
                <div className="rtf-project-heading">
                  <span>PROJECT</span>
                  <span>TEAM</span>
                  <span>PROGRESS</span>
                  <span>STATUS</span>
                </div>

                {projects.map((project) => (
                  <div className="rtf-project-row" key={project.name}>
                    <div className="rtf-project-name">
                      <div className="rtf-project-icon">
                        <Bot size={17} />
                      </div>

                      <strong>{project.name}</strong>
                    </div>

                    <span className="rtf-team-name">{project.team}</span>

                    <div className="rtf-project-progress">
                      <div className="rtf-progress">
                        <span
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                      <strong>{project.progress}%</strong>
                    </div>

                    <span className="rtf-project-status">
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* REQUESTS */}
            <div className="rtf-panel">
              <div className="rtf-panel-header">
                <div>
                  <span className="rtf-panel-label">ACTION REQUIRED</span>
                  <h3>Pending Requests</h3>
                </div>

                <span className="rtf-request-count">14</span>
              </div>

              <div className="rtf-request-list">
                {requests.map((request) => (
                  <div className="rtf-request-row" key={request.name}>
                    <div className="rtf-request-avatar">
                      {request.initials}
                    </div>

                    <div className="rtf-request-info">
                      <strong>{request.name}</strong>
                      <span>
                        {request.role} • {request.time}
                      </span>
                    </div>

                    <div className="rtf-request-actions">
                      <button className="rtf-approve">
                        <CheckCircle2 size={16} />
                      </button>

                      <button className="rtf-more">
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="rtf-full-button">
                Manage all requests
                <ArrowUpRight size={16} />
              </button>
            </div>
          </section>

          {/* BOTTOM INFO */}
          <section className="rtf-bottom-grid">
            <div className="rtf-mini-card">
              <div className="rtf-mini-icon">
                <Wrench size={20} />
              </div>

              <div>
                <span>Equipment Maintenance</span>
                <strong>3 items need attention</strong>
              </div>

              <ChevronRight size={18} />
            </div>

            <div className="rtf-mini-card">
              <div className="rtf-mini-icon">
                <Lightbulb size={20} />
              </div>

              <div>
                <span>Latest Announcement</span>
                <strong>Project submissions open now</strong>
              </div>

              <ChevronRight size={18} />
            </div>

            <div className="rtf-mini-card">
              <div className="rtf-mini-icon">
                <Activity size={20} />
              </div>

              <div>
                <span>Forum Activity</span>
                <strong>42 new activities today</strong>
              </div>

              <ChevronRight size={18} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;