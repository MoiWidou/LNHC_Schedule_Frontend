const BASE_URL = import.meta.env.VITE_API_URL;

// =====================
// MEMBERS
// =====================

export async function getMembers() {
  const res = await fetch(`${BASE_URL}/members`);
  return res.json();
}

export async function createMember(name: string) {
  const res = await fetch(`${BASE_URL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || 'Error creating member');
  }

  return res.json();
}

export async function deleteMember(id: string) {
  const res = await fetch(`${BASE_URL}/members/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Error deleting member');
  }

  return res.json();
}

// =====================
// SCHEDULES
// =====================

export async function createSchedule(location: string, payload: any) {
  const res = await fetch(`${BASE_URL}/${location.toLowerCase()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Error saving schedule');
  }

  return res.json();
}