import { createClient } from "https://esm.sh/@supabase/supabase-js";

const url = new URL(window.location.href);
const hash = url.hash.substring(1);
const params = new URLSearchParams(hash);

const access_token = params.get("access_token");

if (access_token) {
  const supabase = createClient(
    "https://psiqetdjfafrqamnldey.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // PUBLIC ANON KEY
  );

  await supabase.auth.setSession({
    access_token,
    refresh_token: params.get("refresh_token")
  });

  const newPassword = prompt("New Password :");

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) alert(error.message);
  else alert("Password updated!");
}
