/** Chemins des endpoints de l'API (sans l'URL de base). */
export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  academic: {
    tree: "/academic/tree",
  },
  documents: {
    list: "/documents",
    mine: "/documents/mine",
    favorites: "/documents/favorites",
    create: "/documents",
    byId: (id: number) => `/documents/${id}`,
    favorite: (id: number) => `/documents/${id}/favorite`,
    download: (id: number) => `/documents/${id}/download`,
    reaction: (id: number) => `/documents/${id}/reaction`,
  },
} as const;
