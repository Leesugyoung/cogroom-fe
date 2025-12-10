export interface ApiResponse {
  code: number;
  message: string;
}

export interface PaginationResult<T> {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  last: boolean;
  data: T[];
}

export interface CursorPaginationResult<T> {
  data: T[];
  nextCursor: number | null;
  isLast: boolean;
  totalElements?: number;
}

export interface CursorPaginationResultWithLast<T> {
  data: T[];
  nextCursor: number | null;
  last: boolean;
  totalElements: number;
}

export interface AxiosMeta {
  prefetch?: boolean;
}
