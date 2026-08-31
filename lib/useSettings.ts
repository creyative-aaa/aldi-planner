"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export interface UserSettings {
  geminiApiKey: string;
}

export function useSettings(uid: string | null) {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!uid || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    const supabase = getSupabase();
    const { data, error: err } = await supabase
      .from("user_settings")
      .select("gemini_api_key")
      .eq("user_id", uid)
      .maybeSingle();

    if (err) {
      const missingTable = err.code === "42P01" || /user_settings/i.test(err.message);
      if (missingTable) {
        setSettings({ geminiApiKey: "" });
        console.warn(
          "user_settings table is missing. Run the SQL from supabase/schema.sql or supabase/byok.sql."
        );
      } else {
        setError(err.message);
      }
    } else {
      setSettings({ geminiApiKey: data?.gemini_api_key ?? "" });
    }
    setLoading(false);
  }, [uid]);

  useEffect(() => {
    load();
  }, [load]);

  const saveGeminiKey = useCallback(
    async (key: string): Promise<boolean> => {
      if (!uid || !isSupabaseConfigured) return false;
      setError(null);
      const supabase = getSupabase();
      const { error: err } = await supabase
        .from("user_settings")
        .upsert(
          { user_id: uid, gemini_api_key: key },
          { onConflict: "user_id" }
        );
      if (err) {
        const missingTable = err.code === "42P01" || /user_settings/i.test(err.message);
        if (missingTable) {
          setError(
            "Database setup is incomplete: create public.user_settings by running the SQL in supabase/schema.sql or supabase/byok.sql."
          );
        } else {
          setError(err.message);
        }
        return false;
      }
      setSettings({ geminiApiKey: key });
      return true;
    },
    [uid]
  );

  return { settings, loading, error, saveGeminiKey, reload: load };
}
