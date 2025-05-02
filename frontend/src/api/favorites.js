const API_BASE = 'http://localhost:8000/api';

export async function getFavorites(userId) {
    const res = await fetch(`${API_BASE}/users/${userId}/favorites/`);
    return res.json();
}

export async function saveFavorite(
    userId,
    { origin, destination, transport_mode = '', capacity_type = '',
        min_loaded_rpm = 0, min_weight = 0 }
    ) {
    const body = {
        origin,
        destination,
        transport_mode,
        capacity_type,
        min_loaded_rpm: Number(min_loaded_rpm) || 0,
        min_weight:     Number(min_weight)     || 0
    };

    const res = await fetch(`${API_BASE}/users/${userId}/favorites/`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Failed to save favourite');
        return res.json();
}

export async function deleteFavorite(userId, favId) {
    const res = await fetch(`${API_BASE}/users/${userId}/favorites/${favId}/`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete favourite');
    return true;
}
