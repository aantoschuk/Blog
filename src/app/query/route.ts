import { fetchUsers } from "@/lib/actions/data";

export async function GET() {
  try {
    return Response.json(await fetchUsers());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
