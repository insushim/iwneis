interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const userId = url.searchParams.get("userId") || "default";

  const result = await context.env.DB.prepare(
    "SELECT data FROM checklists WHERE user_id = ?",
  )
    .bind(userId)
    .first<{ data: string }>();

  return new Response(JSON.stringify({ data: result?.data || null }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { userId = "default", data } = await context.request.json<{
    userId?: string;
    data: string;
  }>();

  await context.env.DB.prepare(
    "INSERT OR REPLACE INTO checklists (user_id, data, updated_at) VALUES (?, ?, datetime('now'))",
  )
    .bind(userId, data)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
