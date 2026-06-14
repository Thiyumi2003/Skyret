const productionApiUrl = "https://skyret-backend.onrender.com/api";
const apiUrl = import.meta.env.VITE_API_URL || productionApiUrl;

const defaultProductPlaceholder =
	"data:image/svg+xml;charset=UTF-8," +
	encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="Skyret product placeholder">
	<defs>
		<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#111827" />
			<stop offset="100%" stop-color="#374151" />
		</linearGradient>
	</defs>
	<rect width="600" height="600" rx="40" fill="url(#bg)" />
	<circle cx="300" cy="235" r="92" fill="#ffffff" fill-opacity="0.12" />
	<rect x="135" y="348" width="330" height="78" rx="22" fill="#ffffff" fill-opacity="0.12" />
	<text x="300" y="372" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" text-anchor="middle">Skyret</text>
	<text x="300" y="412" fill="#d1d5db" font-family="Arial, Helvetica, sans-serif" font-size="18" text-anchor="middle">Product image coming soon</text>
</svg>
`);

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
		if (
			imagePath === "/images/default-product-01.png" ||
			imagePath === "images/default-product-01.png" ||
			imagePath === "/images/default-product-02.png" ||
			imagePath === "images/default-product-02.png"
		) {
			return defaultProductPlaceholder;
		}

		return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
	}

	if (imagePath.startsWith("/uploads/") || imagePath.startsWith("uploads/")) {
		const apiOrigin = getApiOrigin();
		const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
		return apiOrigin ? `${apiOrigin}${normalizedPath}` : normalizedPath;
	}

	return imagePath;
}