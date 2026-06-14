import { createClient } from "@supabase/supabase-js";
import api from "./api";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

async function uploadWithBackend(file) {
	const formData = new FormData();
	formData.append("file", file);

	const response = await api.post("/media/upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		skipAuth: true,
	});

	return response.data?.url || null;
}

export default async function uploadMedia(file) {
	if (file == null) {
		return null;
	}

	try {
		if (supabase != null) {
		const timeStamp = new Date().getTime();
		const fileName = timeStamp + "_" + file.name;

		const { error } = await supabase.storage.from("images").upload(fileName, file, {
			upsert: false,
			cacheControl: "3600",
		});

		if (error) {
			return await uploadWithBackend(file);
		}

		return supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
		}

		return await uploadWithBackend(file);
	} catch (error) {
		try {
			return await uploadWithBackend(file);
		} catch {
			return null;
		}
	}
}
