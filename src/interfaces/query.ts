export interface QueryParams {
  page?: number;                // e.g. ?page=2
  limit?: number;               // e.g. ?limit=20
  sortBy?: string;              // e.g. ?sortBy=name
  sortOrder?: "ASC" | "DESC";   // e.g. ?sortOrder=DESC
  // // e.g. https://www.ay7aga.com/989898989?page=2&limit=20&sortBy=name&filter[price]=25
  filter?: Record<string, any>;
   // e.g. ?filter[role]=admin&filter[age]=25
  search?: string;              // optional: for keyword search
}



