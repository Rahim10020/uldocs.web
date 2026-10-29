/**
 * Descriptions éditoriales de démonstration.
 *
 * Ce contenu est volontairement local au frontend : les tables FILIERE et UE
 * n'exposent pas de champ `description` dans le contrat API. Il sert uniquement
 * à alimenter les maquettes et devra être remplacé par les descriptions
 * officielles fournies par le backend.
 */
export const FALLBACK_DESCRIPTION =
	"Les informations détaillées sur cette entité seront bientôt disponibles.";

export const FACULTE_DESCRIPTIONS: Record<string, string> = {
	FDD: "La Faculté de Droit forme les juristes autour des grandes branches du droit privé et public, de la procédure et des enjeux juridiques contemporains.",
	FDS: "La Faculté des Sciences réunit les disciplines fondamentales et appliquées, de la physique et de la chimie à l'informatique et aux sciences de la vie.",
	FASEG:
		"La Faculté des Sciences Économiques et de Gestion prépare aux métiers de l'analyse économique, de la finance, de la comptabilité et du management.",
	ENP: "L'École Nationale Polytechnique forme des ingénieurs et des cadres techniques dans les domaines du génie logiciel, du génie civil et des sciences de l'ingénieur.",
	IUT: "L'Institut Universitaire de Technologie de Gestion propose des formations professionnalisantes en finance, comptabilité et gestion des organisations.",
	FLLA: "La Faculté des Lettres, Langues et Arts développe les compétences linguistiques, littéraires et culturelles dans un esprit d'ouverture aux humanités.",
	FSHS: "La Faculté des Sciences de l'Homme et de la Société forme aux métiers de l'analyse sociale, de l'enquête et de la compréhension des dynamiques humaines.",
	ESTBA:
		"L'École Supérieure des Techniques Biologiques et Alimentaires prépare aux analyses biomédicales, à la biologie appliquée et au contrôle de qualité.",
	FSS: "La Faculté des Sciences de la Santé forme les futurs professionnels de santé et développe la recherche en sciences médicales et paramédicales.",
	EAM: "L'École des Assistants Médicaux prépare aux métiers d'assistance médicale et d'accompagnement des équipes de soins.",
	ESA: "L'École Supérieure d'Agronomie forme aux sciences du vivant, à la production agricole et à la gestion durable des ressources naturelles.",
	ESAAd:
		"L'École Supérieure des Assistants Administratifs prépare aux fonctions de gestion, d'organisation et d'appui administratif.",
	INSE: "L'Institut National des Sciences de l'Éducation accompagne la formation des enseignants et la recherche sur les pratiques éducatives.",
	ISICA:
		"L'Institut des Sciences de l'Information, de la Communication et des Arts forme aux métiers des médias, de la communication et de la création.",
	INJS: "L'Institut National de la Jeunesse et des Sports prépare aux métiers de l'animation, de l'éducation physique et du sport.",
};

export const FILIERE_DESCRIPTIONS: Record<string, string> = {
	"Droit Privé":
		"Étude des relations juridiques entre particuliers : personnes, biens, obligations, responsabilité et procédures civiles.",
	"Droit Public":
		"Analyse de l'organisation de l'État, des collectivités publiques et des relations entre l'administration et les citoyens.",
	Physique:
		"Formation aux lois fondamentales de la matière, de l'optique et de la mécanique, avec une ouverture vers les applications technologiques.",
	Informatique:
		"Formation aux fondements de l'informatique : algorithmique, programmation, bases de données, réseaux et développement logiciel.",
	"Économie Appliquée":
		"Analyse des mécanismes économiques, des politiques publiques et des outils statistiques et économétriques.",
	"Comptabilité Contrôle Audit":
		"Formation aux métiers de la comptabilité, de l'audit, du contrôle de gestion et de la fiscalité.",
	"Génie Logiciel":
		"Conception, développement et maintenance de logiciels robustes, avec une attention particulière à l'architecture et à la qualité du code.",
	"Génie Civil":
		"Étude des ouvrages et infrastructures : matériaux, structures, topographie, hydraulique et construction.",
	"Intelligence Artificielle et Big Data":
		"Formation aux méthodes d'apprentissage automatique, de traitement massif de données et d'architecture des systèmes de données.",
	"Finance-Comptabilité":
		"Formation professionnalisante en comptabilité, finance, gestion et droit des affaires.",
	Anglais:
		"Développement des compétences en langue anglaise, littérature, civilisation et traduction.",
	"Lettres Modernes":
		"Étude des littératures francophone et africaine, de la linguistique et des méthodes d'analyse littéraire.",
	Sociologie:
		"Analyse des sociétés, des institutions et des pratiques sociales à travers les méthodes d'enquête et l'anthropologie.",
	"Analyses Médicales et Biologiques":
		"Formation aux techniques d'analyse biologique et médicale : biochimie, hématologie, microbiologie et immunologie.",
};

export const UE_DESCRIPTIONS: Record<string, string> = {
	"Droit Civil":
		"Introduction aux règles qui organisent les relations entre particuliers, notamment les personnes, les biens et les obligations.",
	"Droit Pénal":
		"Étude des infractions, des responsabilités pénales et des sanctions dans le cadre du système juridique.",
	"Procédure Civile":
		"Présentation des étapes et des règles qui encadrent le déroulement d'un procès civil.",
	"Droit des Obligations":
		"Analyse des sources et des effets des obligations contractuelles et extracontractuelles.",
	"Droit Constitutionnel":
		"Étude de l'organisation des pouvoirs publics et des principes fondamentaux de l'État de droit.",
	"Droit Administratif":
		"Analyse de l'action de l'administration, des actes administratifs et du contentieux administratif.",
	"Droit International Public":
		"Introduction aux règles qui régissent les relations entre États et organisations internationales.",
	"Physique Fondamentale":
		"Bases de la physique : mécanique, thermodynamique, électricité et phénomènes fondamentaux de la matière.",
	Optoélectronique:
		"Étude des interactions entre la lumière et les dispositifs électroniques, des lasers aux capteurs optiques.",
	"Mécanique Quantique":
		"Introduction aux principes de la mécanique quantique et à leurs applications en physique moderne.",
	Algorithmique:
		"Conception et analyse des algorithmes, structures de données et résolution de problèmes.",
	"Bases de Données":
		"Modélisation, conception et interrogation de bases de données relationnelles.",
	Réseaux:
		"Fondements des réseaux informatiques, protocoles de communication et architecture Internet.",
	"Développement Web":
		"Conception et réalisation d'applications web, du frontend aux interactions avec les services backend.",
	Microéconomie:
		"Analyse des comportements des consommateurs et des entreprises sur les marchés.",
	Macroéconomie:
		"Étude des grands agrégats économiques, de la croissance, de l'inflation et des politiques publiques.",
	Statistiques:
		"Méthodes de collecte, de description et d'analyse des données appliquées aux sciences économiques.",
	Économétrie:
		"Application des outils statistiques à l'estimation et à la validation des modèles économiques.",
	"Comptabilité Générale":
		"Principes et techniques de l'enregistrement comptable des opérations de l'entreprise.",
	"Audit Financier":
		"Démarche de contrôle et de certification des états financiers d'une organisation.",
	Fiscalité:
		"Étude des règles fiscales applicables aux entreprises et aux particuliers.",
	"Contrôle de Gestion":
		"Outils de pilotage et d'évaluation de la performance des organisations.",
	"Génie Logiciel":
		"Méthodes et pratiques pour concevoir, développer et maintenir des logiciels de qualité.",
	"Architecture Logicielle":
		"Conception de structures logicielles modulaires, évolutives et adaptées aux besoins métier.",
	"Programmation Orientée Objet":
		"Principes de la programmation orientée objet et mise en pratique à travers des projets.",
	"Gestion de Projet":
		"Planification, organisation et suivi des projets, avec une attention aux délais, aux risques et aux équipes.",
	"Résistance des Matériaux":
		"Étude du comportement des matériaux et des structures soumis à différents efforts.",
	"Béton Armé":
		"Conception et dimensionnement des éléments en béton armé dans les ouvrages de génie civil.",
	Topographie:
		"Techniques de mesure et de représentation du terrain pour la conception et l'exécution des projets.",
	Hydraulique:
		"Étude des écoulements, des ouvrages hydrauliques et de la gestion de l'eau.",
	"Machine Learning":
		"Méthodes d'apprentissage automatique supervisé et non supervisé appliquées à des données réelles.",
	"Deep Learning":
		"Architectures de réseaux de neurones profonds et applications à la vision, au texte et aux données complexes.",
	"Big Data Architecture":
		"Conception de systèmes distribués capables de stocker et de traiter de grands volumes de données.",
	"Data Mining":
		"Techniques d'exploration de données pour découvrir des motifs et des connaissances utiles.",
	"Comptabilité Analytique":
		"Analyse des coûts et des performances par activité pour éclairer les décisions de gestion.",
	"Mathématiques Financières":
		"Outils mathématiques appliqués aux calculs financiers, aux placements et aux emprunts.",
	"Droit des Affaires":
		"Étude des règles juridiques encadrant l'activité des entreprises et les relations commerciales.",
	"Grammaire Anglaise":
		"Révision et approfondissement des structures grammaticales de l'anglais.",
	"Littérature Anglaise":
		"Découverte des grandes œuvres et courants de la littérature anglaise.",
	Traduction:
		"Pratique de la traduction et de la version entre le français et l'anglais.",
	Civilisation:
		"Étude des contextes historiques, culturels et sociaux des pays anglophones.",
	"Littérature Africaine":
		"Lecture et analyse des œuvres majeures de la littérature africaine.",
	"Littérature Française":
		"Parcours à travers les grandes périodes et les auteurs de la littérature française.",
	Linguistique:
		"Étude scientifique du langage, des langues et de leurs structures.",
	"Analyse Littéraire":
		"Méthodes de lecture, d'interprétation et de commentaire des textes littéraires.",
	"Sociologie Générale":
		"Introduction aux concepts, aux théories et aux méthodes de la sociologie.",
	"Méthodes d'Enquête":
		"Conception et réalisation d'enquêtes de terrain, du questionnaire à l'analyse des données.",
	Anthropologie:
		"Étude des cultures, des pratiques sociales et des organisations humaines.",
	Biochimie:
		"Étude des molécules du vivant et des réactions chimiques qui soutiennent les processus biologiques.",
	Hématologie:
		"Analyse du sang, des cellules sanguines et des principales pathologies hématologiques.",
	Microbiologie:
		"Étude des micro-organismes, de leur identification et de leur rôle en santé et en environnement.",
	Immunologie:
		"Fonctionnement du système immunitaire et mécanismes de défense de l'organisme.",
};

export function getFaculteDescription(code: string): string {
	return FACULTE_DESCRIPTIONS[code] ?? FALLBACK_DESCRIPTION;
}

export function getFiliereDescription(nom: string): string {
	return FILIERE_DESCRIPTIONS[nom] ?? FALLBACK_DESCRIPTION;
}

export function getUeDescription(nom: string): string {
	return UE_DESCRIPTIONS[nom] ?? FALLBACK_DESCRIPTION;
}
