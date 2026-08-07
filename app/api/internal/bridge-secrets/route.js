const SUPABASE_URL = 'https://dzlmtvodpyhetvektfuo.supabase.co';

function first(...values) {
  return values.find((value) => typeof value === 'string' && value.trim())?.trim() || '';
}

export async function GET(request) {
  if (process.env.VERCEL_ENV !== 'preview') {
    return Response.json({ error: 'Not available' }, { status: 404 });
  }

  const requestId = new URL(request.url).searchParams.get('request_id') || '';
  if (!/^[0-9a-f-]{36}$/i.test(requestId)) {
    return Response.json({ error: 'Invalid bridge request' }, { status: 400 });
  }

  const payload = {
    request_id: requestId,
    stripe_secret_key: first(process.env.STRIPE_SECRET_KEY),
    aws_access_key_id: first(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SES_ACCESS_KEY_ID),
    aws_secret_access_key: first(process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_SES_SECRET_ACCESS_KEY),
    aws_region: first(process.env.AWS_REGION, process.env.AWS_DEFAULT_REGION, process.env.AWS_SES_REGION),
    ses_from_email: first(process.env.SES_FROM_EMAIL, process.env.AWS_SES_FROM_EMAIL, process.env.EMAIL_FROM),
    ses_from_name: first(process.env.SES_FROM_NAME, process.env.AWS_SES_FROM_NAME),
  };

  const response = await fetch(`${SUPABASE_URL}/functions/v1/tlu-secret-bridge`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({}));

  return Response.json({
    ok: response.ok,
    status: response.status,
    bridged: data?.bridged || {},
    bridged_count: data?.bridged_count || 0,
  }, { status: response.ok ? 200 : 502 });
}
