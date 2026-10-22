# Données Académiques de l'Université de Lomé (UL)

## 🎯 Objectif

Source de vérité pour les mocks (frontend) et le seeding (backend).

## 1. Structure de la Base

### Liste des entités (15)

**Facultés (6)** : FDD (Droit), FLLA (Lettres), FASEG (Éco), FSHS (Sciences Humaines), FSS (Santé), FDS (Sciences).
**Écoles (5)** : EAM (Assistants Médicaux), ENP (Polytechnique - ex ENSI), ESA (Agronomie), ESAAd (Assistants Admin), ESTBA (Techniques Bio).
**Instituts (4)** : INSE (Sciences Éducation), IUT (Technologie Gestion), ISICA (Info/Com), INJS (Jeunesse/Sports).

## 2. Données détaillées (Filières & UE)

Voici le JSON complet avec les niveaux corrigés et des exemples d'UE pour générer les mocks.

```json
[
  {
    "categorie": "Faculté",
    "code": "FDD",
    "nom": "Faculté de Droit",
    "filieres": [
      {
        "nom": "Droit Privé",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Droit Civil",
          "Droit Pénal",
          "Procédure Civile",
          "Droit des Obligations"
        ]
      },
      {
        "nom": "Droit Public",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Droit Constitutionnel",
          "Droit Administratif",
          "Droit International Public"
        ]
      }
    ]
  },
  {
    "categorie": "Faculté",
    "code": "FDS",
    "nom": "Faculté des Sciences",
    "filieres": [
      {
        "nom": "Physique",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Physique Fondamentale",
          "Optoélectronique",
          "Mécanique Quantique"
        ]
      },
      {
        "nom": "Informatique",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Algorithmique",
          "Bases de Données",
          "Réseaux",
          "Développement Web"
        ]
      }
    ]
  },
  {
    "categorie": "Faculté",
    "code": "FASEG",
    "nom": "Faculté des Sciences Économiques et de Gestion",
    "filieres": [
      {
        "nom": "Économie Appliquée",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": ["Microéconomie", "Macroéconomie", "Statistiques", "Économétrie"]
      },
      {
        "nom": "Comptabilité Contrôle Audit",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Comptabilité Générale",
          "Audit Financier",
          "Fiscalité",
          "Contrôle de Gestion"
        ]
      }
    ]
  },
  {
    "categorie": "École",
    "code": "ENP",
    "nom": "École Nationale Polytechnique",
    "filieres": [
      {
        "nom": "Génie Logiciel",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Génie Logiciel",
          "Architecture Logicielle",
          "Programmation Orientée Objet",
          "Gestion de Projet"
        ]
      },
      {
        "nom": "Génie Civil",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Résistance des Matériaux",
          "Béton Armé",
          "Topographie",
          "Hydraulique"
        ]
      },
      {
        "nom": "Intelligence Artificielle et Big Data",
        "niveaux": ["M1", "M2"],
        "ues": [
          "Machine Learning",
          "Deep Learning",
          "Big Data Architecture",
          "Data Mining"
        ]
      }
    ]
  },
  {
    "categorie": "Institut",
    "code": "IUT",
    "nom": "Institut Universitaire de Technologie de Gestion",
    "filieres": [
      {
        "nom": "Finance-Comptabilité",
        "niveaux": ["L1", "L2", "L3"],
        "ues": [
          "Comptabilité Analytique",
          "Mathématiques Financières",
          "Droit des Affaires"
        ]
      }
    ]
  },
  {
    "categorie": "Faculté",
    "code": "FLLA",
    "nom": "Faculté des Lettres, Langues et Arts",
    "filieres": [
      {
        "nom": "Anglais",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"],
        "ues": [
          "Grammaire Anglaise",
          "Littérature Anglaise",
          "Traduction",
          "Civilisation"
        ]
      },
      {
        "nom": "Lettres Modernes",
        "niveaux": ["L1", "L2", "L3"],
        "ues": [
          "Littérature Africaine",
          "Littérature Française",
          "Linguistique",
          "Analyse Littéraire"
        ]
      }
    ]
  },
  {
    "categorie": "Faculté",
    "code": "FSHS",
    "nom": "Faculté des Sciences de l'Homme et de la Société",
    "filieres": [
      {
        "nom": "Sociologie",
        "niveaux": ["L1", "L2", "L3"],
        "ues": ["Sociologie Générale", "Méthodes d'Enquête", "Anthropologie"]
      }
    ]
  },
  {
    "categorie": "École",
    "code": "ESTBA",
    "nom": "École Supérieure des Techniques Biologiques et Alimentaires",
    "filieres": [
      {
        "nom": "Analyses Médicales et Biologiques",
        "niveaux": ["L1", "L2", "L3"],
        "ues": ["Biochimie", "Hématologie", "Microbiologie", "Immunologie"]
      }
    ]
  }
]
```
