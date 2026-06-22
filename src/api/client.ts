const BASE_URL = import.meta.env.VITE_API_URL;

export async function getMembers() {
  const res = await fetch(`${BASE_URL}/members`);
  return res.json();
}