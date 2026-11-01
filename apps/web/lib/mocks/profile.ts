export type ProfileBadgeIcon = "upload" | "trending" | "downloads";

export type ProfileBadge = {
  id: string;
  label: string;
  icon: ProfileBadgeIcon;
};

/** Badges de démonstration : aucune API de gamification n'existe encore. */
export const PROFILE_BADGES: ProfileBadge[] = [
  { id: "premier-upload", label: "Premier upload", icon: "upload" },
  { id: "top-du-mois", label: "Top du mois", icon: "trending" },
  {
    id: "cent-telechargements",
    label: "100 téléchargements",
    icon: "downloads",
  },
];

/** Statistiques non exposées par l'API, mockées en attendant la V1.5. */
export const PROFILE_MOCK = {
  views: 24_000,
  rank: 12,
  totalContributors: 340,
} as const;
