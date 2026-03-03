export type PaginationType = {
  page?: number;
  limit?: number;
}

export type SortType = {
  sort?: 'asc' | 'desc';
  sortBy?: string;
}

export type SearchType = {
  search?: string;
}
