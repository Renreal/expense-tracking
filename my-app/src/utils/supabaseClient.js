import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://garwzkzqfnrquaimcrrj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhcnd6a3pxZm5ycXVhaW1jcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NzU1MzIsImV4cCI6MjA4NjQ1MTUzMn0.3vfPKRe-sfaiCTT_quGmKspf5cP9iju2gF6iFONFQoI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
