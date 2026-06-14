const productionApiUrl = "https://skyret-backend.onrender.com/api";
const apiUrl = import.meta.env.VITE_API_URL || productionApiUrl;

function getApiOrigin() {
	if (apiUrl.startsWith("http://") || apiUrl.startsWith("https://")) {
		return apiUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
	}

	return "";
}

function isLocalBackendUrl(imagePath) {
	try {
		const url = new URL(imagePath);
		return url.hostname === "localhost" || url.hostname === "127.0.0.1";
	} catch {
		return false;
	}
}

export function resolveImageUrl(imagePath) {
	if (!imagePath) {
		return "";
	}

	if (
		imagePath.startsWith("http://") ||
		imagePath.startsWith("https://") ||
		imagePath.startsWith("data:") ||
		imagePath.startsWith("blob:")
	) {
		if (isLocalBackendUrl(imagePath)) {
			const apiOrigin = getApiOrigin();
			if (apiOrigin) {
				try {
					const url = new URL(imagePath);
					return `${apiOrigin}${url.pathname}${url.search}${url.hash}`;
				} catch {
					return imagePath;
				}
			}
		}

		return imagePath;
	}

	if (imagePath.startsWith("/images/") || imagePath.startsWith("images/")) {
		return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
	}

	if (imagePath.startsWith("/uploads/") || imagePath.startsWith("uploads/")) {
		const apiOrigin = getApiOrigin();
		const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
		return apiOrigin ? `${apiOrigin}${normalizedPath}` : normalizedPath;
	}

	return imagePath;
}