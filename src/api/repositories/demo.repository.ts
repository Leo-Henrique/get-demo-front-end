"use server";

import { DemoWithDetails, DemoWithFrameDetails } from "@/api/entities";
import { fetchWrapper } from "../helpers/fetch-wrapper";

type FindManyDetailsResponse = {
  demos: DemoWithDetails[];
};

export async function findManyDetails(): Promise<FindManyDetailsResponse> {
  const response = await fetchWrapper("/demos", {
    next: { tags: ["demos"] },
  });

  return response.json();
}

type FindUniqueBySlugResponse = {
  demo: DemoWithFrameDetails;
};

export async function findUniqueBySlug(
  slug: string,
): Promise<FindUniqueBySlugResponse> {
  const response = await fetchWrapper(`/demos/${slug}`, {
    next: { tags: ["demos"] },
  });

  return response.json();
}
