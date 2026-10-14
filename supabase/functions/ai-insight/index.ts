const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { quizTitle, resultTitle, resultDescription } = await req.json();

    if (!quizTitle || !resultTitle) {
      return new Response(
        JSON.stringify({ error: "Missing quizTitle or resultTitle" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const prompt = `You are a fun, warm psychology quiz companion. A user just completed the quiz "${quizTitle}" and got the result "${resultTitle}" — ${resultDescription}. Write a short, personalized insight (2-3 sentences, max 60 words) that expands on their result with a positive, encouraging tone. Use casual Gen Z language. Do not diagnose anything or give medical advice. Do not use emojis.`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text();
      let errDetail = `OpenAI error (${openaiRes.status})`;
      try {
        const parsed = JSON.parse(errBody);
        if (parsed?.error?.message) errDetail = parsed.error.message;
      } catch { /* use generic */ }
      return new Response(
        JSON.stringify({ error: errDetail }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await openaiRes.json();
    const insight = data?.choices?.[0]?.message?.content?.trim();

    if (!insight) {
      return new Response(
        JSON.stringify({ error: "No insight generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ insight }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
