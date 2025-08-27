// app/api/power/route.ts
export async function GET() {
  const res = await fetch("http://192.168.0.125/power");
  const data = await res.text();
  return new Response(data, { status: 200 });
}
