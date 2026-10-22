/** Chemins des endpoints de l'API (sans l'URL de base). */
export const endpoints = {
	auth: {
		login: "/auth/login",
		register: "/auth/register",
		logout: "/auth/logout",
		me: "/auth/me",
	},
	documents: {
		list: "/documents",
		create: "/documents",
		byId: (id: number) => `/documents/${id}`,
	},
} as const;
