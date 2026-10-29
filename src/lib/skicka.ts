import { supabase } from "@/integrations/supabase/client";

// Both the appointment and contact forms store into the existing `kontaktmeddelanden`
// table, so no database migration is needed. Appointment requests are tagged in the message.
export async function skickaMeddelande(data: {
  namn: string;
  epost: string;
  telefon: string;
  meddelande: string;
}) {
  const { error } = await supabase.from("kontaktmeddelanden").insert(data);
  if (error) throw error;
}
