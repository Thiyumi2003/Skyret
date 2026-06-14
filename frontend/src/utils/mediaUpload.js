import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function uploadMedia(file) {
	if (file == null || supabase == null) {
		return null;
	}

	try {
		const timeStamp = new Date().getTime();
		const fileName = timeStamp + "_" + file.name;

		const { error } = await supabase.storage.from("images").upload(fileName, file, {
			upsert: false,
			cacheControl: "3600",
		});

		if (error) {
			return null;
		}

		return supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
	} catch (error) {
		return null;
	}
}
