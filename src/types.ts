export interface CreateWorkerRequest {
  first_name: string;
  last_name: string;
  position: string;
  phone: string;
  department_name?: string;
}
export interface UpdateWorkerRequest {
  first_name?: string;
  last_name?: string;
  position?: string;
  phone?: string;
  department_name?: string;
}

export interface Meta {
  total_items: number;
  total_pages: number;
  current_page: number;
  next_page?: string;
  prev_page?: string;
}
