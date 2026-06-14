const apiUrl = import.meta.env.VITE_API_URL || "/api";

function getApiOrigin() {
	if (apiUrl.startsWith("http://") || apiUrl.startsWith("https://")) {
		return apiUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");
	}

	return "";
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