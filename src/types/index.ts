// src/types/index.ts

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'technician';
    avatar?: string;
  }
  
  export interface Site {
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline' | 'warning' | 'maintenance';
    lastUpdated: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    powerOutput: number;
    efficiency: number;
    alerts: number;
    assets: Asset[];
  }
  
  export interface Asset {
    id: string;
    name: string;
    type: string;
    status: 'operational' | 'maintenance' | 'offline';
    lastMaintenance: string;
    nextMaintenance: string;
    siteId: string;
    images?: string[];
  }
  
  export interface Ticket {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    siteId: string;
    siteName: string;
    createdAt: string;
    updatedAt: string;
    assignedTo?: string;
  }
  
  export interface Statistics {
    totalSites: number;
    activeSites: number;
    totalPowerOutput: number;
    averageEfficiency: number;
    openTickets: number;
    criticalAlerts: number;
    uptime: number;
  }
  
  export interface MaintenanceLog {
    id: string;
    assetId: string;
    assetName: string;
    date: string;
    technician: string;
    description: string;
    images: string[];
    status: 'completed' | 'scheduled';
  }
  
  export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    SiteDetails: { siteId: string };
    AssetDetails: { assetId: string };
    TicketDetails: { ticketId: string };
    CreateTicket: { siteId?: string };
    UploadMaintenance: { assetId: string };
  };
  
  export type TabParamList = {
    Dashboard: undefined;
    Sites: undefined;
    Tickets: undefined;
    Statistics: undefined;
    Profile: undefined;
  };