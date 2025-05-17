import {
  PaginatedResponse,
  Link,
  NavLinks,
} from "../interfaces/pagination.interface";

export interface BuildPageParams<T, L extends Link = Link> {
  items: T[]; // lista bruta (sem _links)
  total: number;
  limit: number;
  offset: number;
  baseUrl: string; // ex.: "/accounts"  ou  "/accounts/user/123"
  itemLink: (item: T) => L; // gera os links por item
}

export function buildPaginatedResponse<T, L extends Link = Link>({
  items,
  total,
  limit,
  offset,
  baseUrl,
  itemLink,
}: BuildPageParams<T, L>): PaginatedResponse<T & { _links: L }> {
  const nextOffset = offset + limit;
  const prevOffset = Math.max(offset - limit, 0);

  return {
    items: items.map((item) => ({ ...item, _links: itemLink(item) })),

    _links: {
      self: `${baseUrl}?limit=${limit}&offset=${offset}`,
      next:
        nextOffset < total
          ? `${baseUrl}?limit=${limit}&offset=${nextOffset}`
          : undefined,
      prev:
        offset > 0
          ? `${baseUrl}?limit=${limit}&offset=${prevOffset}`
          : undefined,
    },

    page: { total, limit, offset },
  };
}
