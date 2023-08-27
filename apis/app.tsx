import { ListResponse } from "./common";

export interface CreateRequest {
  name: string;
}

export interface CreateResponse {
  id: string;
  name: string;
  secret: string;
}

export const create = async (req: CreateRequest) => {
  const resp = await fetch("/api/v1/apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (resp.status !== 200) {
    throw new Error(`创建app失败: ${await resp.text()}`);
  }
  const data = await resp.json();
  return data as CreateResponse;
};

export interface App {
  id: string;
  name: string;
  secret: string;
  created_at: string;
  updated_at: string;
}

export const list = async (page: number, size: number) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  const resp = await fetch(`/api/v1/apps?${params}`);
  if (resp.status !== 200) {
    throw new Error(`获取app列表失败: ${await resp.text()}`);
  }
  const data = await resp.json();
  return data as ListResponse<App>;
};

export const del = async (id: string) => {
  const resp = await fetch(`/api/v1/apps/${id}`, { method: "DELETE" });
  if (resp.status !== 200) {
    throw new Error(`删除app失败: ${await resp.text()}`);
  }
  const data = await resp.json();
};
