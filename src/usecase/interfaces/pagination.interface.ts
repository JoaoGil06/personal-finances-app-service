export type Link = { self: string };
export type NavLinks = Link & { next?: string; prev?: string };
export type PageMeta = { total: number; limit: number; offset: number };

export interface PaginatedResponse<T, L extends Link = Link> {
  items: T[];
  _links?: NavLinks & L; // links comuns + específicos do recurso
  page?: PageMeta;
}
