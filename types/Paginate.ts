export interface Paginate<T> {
  data: T[];
  page: number;
  pages: number;
  perPage: number;
  total: number;
}
