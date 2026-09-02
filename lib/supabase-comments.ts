export type CommentRecord = {
  id: number | string;
  created_at: string;
  level: number;
  nickname: string;
  content: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getConfig() {
  if (!supabaseUrl || !publishableKey) {
    throw new Error("评论功能缺少 Supabase 环境配置");
  }
  return { supabaseUrl, publishableKey };
}

function headers(includeBody = false) {
  const { publishableKey } = getConfig();
  return {
    apikey: publishableKey,
    Authorization: `Bearer ${publishableKey}`,
    ...(includeBody ? { "Content-Type": "application/json", Prefer: "return=representation" } : {}),
  };
}

export async function getComments(level: number): Promise<CommentRecord[]> {
  const { supabaseUrl } = getConfig();
  const query = new URLSearchParams({
    select: "id,created_at,level,nickname,content",
    level: `eq.${level}`,
    order: "created_at.desc",
  });
  const response = await fetch(`${supabaseUrl}/rest/v1/comments?${query}`, {
    headers: headers(),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("评论读取失败");
  return response.json();
}

export async function addComment(level: number, nickname: string, content: string): Promise<CommentRecord> {
  const { supabaseUrl } = getConfig();
  const response = await fetch(`${supabaseUrl}/rest/v1/comments`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify({ level, nickname, content }),
  });
  if (!response.ok) throw new Error("评论发布失败");
  const rows = (await response.json()) as CommentRecord[];
  if (!rows[0]) throw new Error("评论已提交，但未能读取返回结果");
  return rows[0];
}
