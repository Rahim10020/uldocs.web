import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	partialPrefetching: true,
	typedRoutes: true,
	turbopack: {
		// `shared` expose ses sources (avec des imports `.js`), que Turbopack ne
		// résout pas. On pointe vers le build (`pnpm --filter shared build`).
		resolveAlias: {
			shared: "../../packages/shared/dist/index.js",
		},
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
};

export default nextConfig;
