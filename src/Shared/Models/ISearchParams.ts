export interface IAllSearchQuery extends ISearchQuery {
  _address?: string;
  _searchLabel?: string;
}

export interface ISearchQuery {
  lat?: string;
  long?: string;
  q?: string;
  "startDate[$gte]"?: string
}


