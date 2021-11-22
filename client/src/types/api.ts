/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BasketDto {
  /** @format int32 */
  id?: number;
  buyerId?: string | null;
  items?: BasketItemDto[] | null;
}

export interface BasketItemDto {
  /** @format int32 */
  productId?: number;
  name?: string | null;

  /** @format int64 */
  price?: number;
  pictureUrl?: string | null;
  brand?: string | null;
  type?: string | null;

  /** @format int32 */
  quantity?: number;
}

export interface Product {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;

  /** @format int64 */
  price?: number;
  pictureUrl?: string | null;
  type?: string | null;
  brand?: string | null;

  /** @format int32 */
  quantityInStock?: number;
}

export interface WeatherForecast {
  /** @format date-time */
  date?: string;

  /** @format int32 */
  temperatureC?: number;

  /** @format int32 */
  temperatureF?: number;
  summary?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title WebAPIv5
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Basket
     * @name GetBasket
     * @request GET:/api/Basket
     */
    getBasket: (params: RequestParams = {}) =>
      this.request<BasketDto, any>({
        path: `/api/Basket`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Basket
     * @name BasketCreate
     * @request POST:/api/Basket
     */
    basketCreate: (query?: { productId?: number; quantity?: number }, params: RequestParams = {}) =>
      this.request<BasketDto, any>({
        path: `/api/Basket`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Basket
     * @name BasketDelete
     * @request DELETE:/api/Basket
     */
    basketDelete: (query?: { productId?: number; quantity?: number }, params: RequestParams = {}) =>
      this.request<BasketDto, any>({
        path: `/api/Basket`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Buggy
     * @name BuggyNotFoundList
     * @request GET:/api/Buggy/not-found
     */
    buggyNotFoundList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Buggy/not-found`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Buggy
     * @name BuggyBadRequestList
     * @request GET:/api/Buggy/bad-request
     */
    buggyBadRequestList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Buggy/bad-request`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Buggy
     * @name BuggyUnauthorizedList
     * @request GET:/api/Buggy/unauthorized
     */
    buggyUnauthorizedList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Buggy/unauthorized`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Buggy
     * @name BuggyValidationErrorList
     * @request GET:/api/Buggy/validation-error
     */
    buggyValidationErrorList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Buggy/validation-error`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Buggy
     * @name BuggyServerErrorList
     * @request GET:/api/Buggy/server-error
     */
    buggyServerErrorList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Buggy/server-error`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsList
     * @request GET:/api/Products
     */
    productsList: (
      query?: {
        OrderBy?: string;
        SearchTerm?: string;
        Brands?: string;
        Types?: string;
        PageNumber?: number;
        PageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Product[], any>({
        path: `/api/Products`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsDetail
     * @request GET:/api/Products/{id}
     */
    productsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Product, any>({
        path: `/api/Products/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Products
     * @name ProductsFiltersList
     * @request GET:/api/Products/filters
     */
    productsFiltersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Products/filters`,
        method: "GET",
        ...params,
      }),
  };
  weatherForecast = {
    /**
     * No description
     *
     * @tags WeatherForecast
     * @name GetWeatherForecast
     * @request GET:/WeatherForecast
     */
    getWeatherForecast: (params: RequestParams = {}) =>
      this.request<WeatherForecast[], any>({
        path: `/WeatherForecast`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
