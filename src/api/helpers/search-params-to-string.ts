import { NextSearchParams } from "@/@types/next";

export function searchParamsToString(searchParams: NextSearchParams) {
  const keys = Object.keys(searchParams);
  const eachParam = keys.map(key => `${key}=${searchParams[key]}`);

  return `?${eachParam.join("&")}`;
}
