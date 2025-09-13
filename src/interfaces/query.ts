export interface QueryParams {
  page?: number;                // e.g. ?page=2
  limit?: number;               // e.g. ?limit=20
  sortBy?: string;              // e.g. ?sortBy=name
  sortOrder?: "ASC" | "DESC";   // e.g. ?sortOrder=DESC
  filter?: Record<string, any>; // e.g. ?filter[role]=admin&filter[age]=25
  search?: string;              // optional: for keyword search
}
