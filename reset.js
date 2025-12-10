import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://psiqetdjfafrqamnldey.supabase.co",
  "PUBLIC_ANON_KEY"
);

const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);

const access_token = params.get("access_token");
const refresh_token = params.get("refresh_token");
const type = params.get("type");

if (type !== "recovery" || !access_token) {
  document.body.innerHTML = "<h3>Invalid or expired reset link.</h3>";
  throw new Error("Not a valid recovery URL");
}

await supabase.auth.setSession({ access_token, refresh_token });

// Assumer que le HTML contient un input #pwd et un bouton #submitBtn
document.getElementById("submitBtn").onclick = async () => {
  const newPassword = document.getElementById("pwd").value.trim();
  if (!newPassword) return alert("Enter a password.");

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) alert("Error: " + error.message);
  else alert("Password updated!");
};
