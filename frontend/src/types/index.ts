export interface FileItem {
  id: number;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  encrypted: boolean;
  ownerId: number;
  createdAt: string;
}

export interface SharedFile extends FileItem {
  updatedAt: string;
  shareId: number;
  accessLevel: string;
  sharedBy: string;
  owner: any;
}

export interface TrashedFile extends FileItem {
  deletedAt: string;
  expiresAt: string;
}
