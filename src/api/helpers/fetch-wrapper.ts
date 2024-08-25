import { NextSearchParams } from "@/@types/next";
import { env } from "@/env";
import { searchParamsToString } from "./search-params-to-string";

interface FetchWrapperOptions extends RequestInit {
  queryParams?: NextSearchParams;
}

export function fetchWrapper(path: string, options?: FetchWrapperOptions) {
  const baseURL = env.API_BASE_URL;
  const queryParams = options?.queryParams
    ? searchParamsToString(options.queryParams)
    : "";
  const URL = `${baseURL}${path}${queryParams}`;

  return fetch(URL, options);
}
