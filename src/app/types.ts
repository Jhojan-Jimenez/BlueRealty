export interface Ticket {
  id: string;
  user_email: string;
  title: string;
  description: string;
  status: string;
  created_at: any;
}
export interface Response {
  id: string;
  ticket_id: string;
  response: string;
  created_at: any;
}
