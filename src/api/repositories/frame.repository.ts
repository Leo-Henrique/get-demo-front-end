"use server";

import { FrameEntity } from "@/api/entities";
import { revalidateTag } from "next/cache";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import { MutationRoute } from "../helpers/mutation-route";

type FindManyResponse = {
  frames: FrameEntity[];
};

export async function findManyByDemoId(
  demoId: string,
): Promise<FindManyResponse> {
  const response = await fetchWrapper(`/demos/${demoId}/frames`, {
    next: { tags: ["frames"] },
  });

  return response.json();
}

type FindUniqueByIdResponse = {
  frame: FrameEntity;
};

export async function findUniqueById(
  id: string,
): Promise<FindUniqueByIdResponse> {
  const response = await fetchWrapper(`/frames/${id}`, {
    next: { tags: ["frames"] },
  });

  return response.json();
}

export async function updateUniqueHtml(
  frame: FrameEntity,
  html: string,
): Promise<MutationRoute> {
  const response = await fetchWrapper(`/frames/${frame.id}/html`, {
    next: { tags: ["frames"] },
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  if (response.ok) {
    revalidateTag("demos");
    revalidateTag("frames");

    return {
      isSuccess: true,
      message: `O frame ${frame.order + 1} foi atualizado!`,
    };
  }

  const data = await response.json();

  return { isSuccess: false, message: data.message };
}
