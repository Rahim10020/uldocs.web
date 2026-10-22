import type { CategorieFaculte } from "../enums.js";

/**
 * Données académiques officielles de l'Université de Lomé.
 *
 * Source : docs/academic-data.md — ne rien inventer.
 * Ce module est la source unique du seed frontend (mocks) et backend (Prisma).
 */

/** Libellés de niveaux, dans l'ordre LMD. */
export const NIVEAUX_SCOLARITE = [
	"L1",
	"L2",
	"L3",
	"M1",
	"M2",
	"Doctorat",
] as const;
export type NiveauScolarite = (typeof NIVEAUX_SCOLARITE)[number];

/** Ordre numérique d'un niveau (colonne NIVEAU.ordre). */
export const ORDRE_NIVEAU: Record<NiveauScolarite, number> = {
	L1: 1,
	L2: 2,
	L3: 3,
	M1: 4,
	M2: 5,
	Doctorat: 6,
};

/** Semestres rattachés à chaque niveau (colonne SEMESTRE.nom). */
export const SEMESTRES_PAR_NIVEAU: Record<NiveauScolarite, [string, string]> = {
	L1: ["S1", "S2"],
	L2: ["S3", "S4"],
	L3: ["S5", "S6"],
	M1: ["S7", "S8"],
	M2: ["S9", "S10"],
	Doctorat: ["S11", "S12"],
};

export type AcademicFiliereSeed = {
	nom: string;
	niveaux: NiveauScolarite[];
	/** UE listées par filière. Le semestre est résolu par le seed. */
	ues: string[];
};

export type AcademicStructureSeed = {
	categorie: CategorieFaculte;
	code: string;
	nom: string;
	filieres: AcademicFiliereSeed[];
};

export const ACADEMIC_DATA: AcademicStructureSeed[] = [
	{
		categorie: "faculte",
		code: "FDD",
		nom: "Faculté de Droit",
		filieres: [
			{
				nom: "Droit Privé",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Droit Civil",
					"Droit Pénal",
					"Procédure Civile",
					"Droit des Obligations",
				],
			},
			{
				nom: "Droit Public",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Droit Constitutionnel",
					"Droit Administratif",
					"Droit International Public",
				],
			},
		],
	},
	{
		categorie: "faculte",
		code: "FDS",
		nom: "Faculté des Sciences",
		filieres: [
			{
				nom: "Physique",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Physique Fondamentale",
					"Optoélectronique",
					"Mécanique Quantique",
				],
			},
			{
				nom: "Informatique",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Algorithmique",
					"Bases de Données",
					"Réseaux",
					"Développement Web",
				],
			},
		],
	},
	{
		categorie: "faculte",
		code: "FASEG",
		nom: "Faculté des Sciences Économiques et de Gestion",
		filieres: [
			{
				nom: "Économie Appliquée",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: ["Microéconomie", "Macroéconomie", "Statistiques", "Économétrie"],
			},
			{
				nom: "Comptabilité Contrôle Audit",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Comptabilité Générale",
					"Audit Financier",
					"Fiscalité",
					"Contrôle de Gestion",
				],
			},
		],
	},
	{
		categorie: "ecole",
		code: "ENP",
		nom: "École Nationale Polytechnique",
		filieres: [
			{
				nom: "Génie Logiciel",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Génie Logiciel",
					"Architecture Logicielle",
					"Programmation Orientée Objet",
					"Gestion de Projet",
				],
			},
			{
				nom: "Génie Civil",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Résistance des Matériaux",
					"Béton Armé",
					"Topographie",
					"Hydraulique",
				],
			},
			{
				nom: "Intelligence Artificielle et Big Data",
				niveaux: ["M1", "M2"],
				ues: [
					"Machine Learning",
					"Deep Learning",
					"Big Data Architecture",
					"Data Mining",
				],
			},
		],
	},
	{
		categorie: "institut",
		code: "IUT",
		nom: "Institut Universitaire de Technologie de Gestion",
		filieres: [
			{
				nom: "Finance-Comptabilité",
				niveaux: ["L1", "L2", "L3"],
				ues: [
					"Comptabilité Analytique",
					"Mathématiques Financières",
					"Droit des Affaires",
				],
			},
		],
	},
	{
		categorie: "faculte",
		code: "FLLA",
		nom: "Faculté des Lettres, Langues et Arts",
		filieres: [
			{
				nom: "Anglais",
				niveaux: ["L1", "L2", "L3", "M1", "M2"],
				ues: [
					"Grammaire Anglaise",
					"Littérature Anglaise",
					"Traduction",
					"Civilisation",
				],
			},
			{
				nom: "Lettres Modernes",
				niveaux: ["L1", "L2", "L3"],
				ues: [
					"Littérature Africaine",
					"Littérature Française",
					"Linguistique",
					"Analyse Littéraire",
				],
			},
		],
	},
	{
		categorie: "faculte",
		code: "FSHS",
		nom: "Faculté des Sciences de l'Homme et de la Société",
		filieres: [
			{
				nom: "Sociologie",
				niveaux: ["L1", "L2", "L3"],
				ues: ["Sociologie Générale", "Méthodes d'Enquête", "Anthropologie"],
			},
		],
	},
	{
		categorie: "ecole",
		code: "ESTBA",
		nom: "École Supérieure des Techniques Biologiques et Alimentaires",
		filieres: [
			{
				nom: "Analyses Médicales et Biologiques",
				niveaux: ["L1", "L2", "L3"],
				ues: ["Biochimie", "Hématologie", "Microbiologie", "Immunologie"],
			},
		],
	},
	// Structures officielles sans filières documentées : insérées vides.
	{
		categorie: "faculte",
		code: "FSS",
		nom: "Faculté des Sciences de la Santé",
		filieres: [],
	},
	{
		categorie: "ecole",
		code: "EAM",
		nom: "École des Assistants Médicaux",
		filieres: [],
	},
	{
		categorie: "ecole",
		code: "ESA",
		nom: "École Supérieure d'Agronomie",
		filieres: [],
	},
	{
		categorie: "ecole",
		code: "ESAAd",
		nom: "École Supérieure des Assistants Administratifs",
		filieres: [],
	},
	{
		categorie: "institut",
		code: "INSE",
		nom: "Institut National des Sciences de l'Éducation",
		filieres: [],
	},
	{
		categorie: "institut",
		code: "ISICA",
		nom: "Institut des Sciences de l'Information, de la Communication et des Arts",
		filieres: [],
	},
	{
		categorie: "institut",
		code: "INJS",
		nom: "Institut National de la Jeunesse et des Sports",
		filieres: [],
	},
];
