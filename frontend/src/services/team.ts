import { apiRequest } from '@/lib/queryClient';

export interface TeamMember {
  id: number;
  userId: number;
  username: string;
  accessLevel: 'read' | 'write' | 'admin';
  addedBy: number;
  addedAt: string;
  updatedAt: string;
}

export interface TeamFile {
  id: number;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  path: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  userId: string;
  username: string;
  resourceId: string;
  resourceType: string;
  timestamp: string;
  details: any;
}

export const teamService = {
  // Team members
  async getTeamMembers(): Promise<TeamMember[]> {
    const response = await apiRequest("GET", '/api/team/members');
    const data = await response.json();
    return data.members || [];
  },

  async addTeamMember(username: string, accessLevel: 'read' | 'write' | 'admin'): Promise<TeamMember> {
    const response = await apiRequest("POST", '/api/team/members', { username, accessLevel });
    const data = await response.json();
    return data.member;
  },

  async removeTeamMember(memberId: number): Promise<void> {
    await apiRequest("DELETE", `/api/team/members/${memberId}`);
  },

  // Team files
  async getTeamFiles(path: string = '/'): Promise<TeamFile[]> {
    const response = await apiRequest("GET", `/api/team/files?path=${encodeURIComponent(path)}`);
    const data = await response.json();
    return data.files || [];
  },

  async createFolder(path: string, name: string): Promise<TeamFile> {
    const response = await apiRequest("POST", '/api/team/files/folder', { path, name });
    const data = await response.json();
    return data.folder;
  },

  async shareFile(fileId: number, users: string[]): Promise<void> {
    await apiRequest("POST", `/api/team/files/${fileId}/share`, { users });
  },

  // Activity logs
  async getRecentActivity(): Promise<ActivityLog[]> {
    const response = await apiRequest("GET", '/api/team/activity');
    const data = await response.json();
    return data.activities || [];
  }
}; 