'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let id = localStorage.getItem('hr_player_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('hr_player_id', id);
    }
    setPlayerId(id);
    setLoading(false);
  }, []);

  return { playerId, loading };
}
