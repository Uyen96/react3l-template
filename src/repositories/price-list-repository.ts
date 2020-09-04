import { Repository } from "react3l/core";
import { httpConfig } from "config/http";
import { url, kebabCase } from "react3l/helpers";
import { BASE_API_URL } from "config/consts";
import { API_PRICELIST_PREFIX } from "config/api-consts";
import { Observable } from "rxjs";
import { PriceList, PriceListFilter } from "models/PriceList";
import { map } from "rxjs/operators";
import { AxiosResponse } from "axios";
import nameof from "ts-nameof.macro";
import { PriceListStatusFilter } from "models/PriceList/PriceListStatusFilter";
import { PriceListStatus } from "models/PriceList/PriceListStatus";

export class PriceListRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PRICELIST_PREFIX);
  }

  list = (filter: PriceListFilter): Observable<PriceList[]> => {
    return this.httpObservable
      .post<PriceList[]>("list", filter)
      .pipe(map((response: AxiosResponse<PriceList[]>) => response.data));
  };

  count = (filter: PriceListFilter): Observable<number> => {
    return this.httpObservable
      .post<number>("count", filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  get = (id: number): Observable<PriceList> => {
    return this.httpObservable
      .post<PriceList>(kebabCase(nameof(this.get)), { id })
      .pipe(map((response: AxiosResponse<PriceList>) => response.data));
  };

  delete = (priceList: PriceList): Observable<PriceList> => {
    return this.httpObservable
      .post<PriceList>("delete", priceList)
      .pipe(map((response: AxiosResponse<PriceList>) => response.data));
  };

  bulkDelete = (idList: number[]): Observable<void> => {
    return this.httpObservable
      .post<void>("bulk-delete", idList)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };

  filterListStatus = (
    filter: PriceListStatusFilter,
  ): Observable<PriceListStatus[]> => {
    return this.httpObservable
      .post<PriceListStatus[]>(kebabCase(nameof(this.filterListStatus)), filter)
      .pipe(map((response: AxiosResponse<PriceListStatus[]>) => response.data));
  };

  filterListSalesOrderType = (
    filter: PriceListStatusFilter,
  ): Observable<PriceListStatus[]> => {
    return this.httpObservable
      .post<PriceListStatus[]>(
        kebabCase(nameof(this.filterListSalesOrderType)),
        filter,
      )
      .pipe(map((response: AxiosResponse<PriceListStatus[]>) => response.data));
  };
}

export const priceListRepository: PriceListRepository = new PriceListRepository();