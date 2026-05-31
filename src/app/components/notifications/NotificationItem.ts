export interface NotificationItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}
