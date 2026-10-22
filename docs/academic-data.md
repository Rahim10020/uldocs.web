# Données Académiques de l'Université de Lomé (UL)

## 🎯 Objectif de ce fichier

Ce fichier sert de **source de vérité unique** pour la structure académique de l'UL.

- **Frontend** : Utiliser ces données pour générer les fichiers de `mocks` (ex: `lib/mocks/facultes.ts`).
- **Backend** : Ce fichier servira de base pour le script de "seeding" Prisma.
- **Règle** : Ne jamais inventer une faculté ou une filière qui ne figure pas ici.

---

## 🏛️ Structure des Données (Format JSON de référence)

Voici la structure exacte attendue. Chaque Faculté/École/Institut contient ses filières, et chaque filière définit ses niveaux (L1 à M2).

### 1. Facultés (6)

- **FDD** : Faculté de Droit
- **FLLA** : Faculté des Lettres, Langues et Arts
- **FASEG** : Faculté des Sciences Économiques et de Gestion
- **FSHS** : Faculté des Sciences de l'Homme et de la Société
- **FSS** : Faculté des Sciences de la Santé
- **FDS** : Faculté des Sciences

### 2. Écoles (5)

- **EAM** : École des Assistants Médicaux
- **ENP** : École Nationale Polytechnique
- **ESA** : École Supérieure d'Agronomie
- **ESAAd** : École Supérieure des Assistants Administratifs
- **ESTBA** : École Supérieure des Techniques Biologiques et Alimentaires

### 3. Instituts (4)

- **INSE** : Institut National des Sciences de l'Éducation
- **IUT de Gestion** : Institut Universitaire de Technologie de Gestion
- **ISICA** : Institut des Sciences de l'Information, de la Communication et des Arts
- **INJS** : Institut National de la Jeunesse et des Sports

---

## 📚 Détails des Filières et Niveaux

Voici les données à utiliser pour générer les mocks. Le format indique la Faculté, puis la Filière, puis les Niveaux disponibles.

```json
[
  {
    "faculte_code": "FDD",
    "faculte_nom": "Faculté de Droit",
    "filieres": [
      {
        "code": "MDP",
        "nom": "Master Droit Privé",
        "niveaux": ["M1", "M2"],
        "specialites": ["Droit de la Propriété Intellectuelle et du Numérique"]
      }
    ]
  },
  {
    "faculte_code": "FDS",
    "faculte_nom": "Faculté des Sciences",
    "filieres": [
      {
        "code": "MRPFA",
        "nom": "Master Recherche en Physique Fondamentale et Applications",
        "niveaux": ["M1", "M2"],
        "specialites": ["Optoélectronique et Photonique (OPHO)"]
      }
    ]
  },
  {
    "faculte_code": "FASEG",
    "faculte_nom": "Faculté des Sciences Économiques et de Gestion",
    "filieres": [
      {
        "code": "EA",
        "nom": "Économie Appliquée",
        "niveaux": ["L1", "L2", "L3", "M1", "M2", "Doctorat"]
      },
      {
        "code": "CCA",
        "nom": "Comptabilité Contrôle Audit",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "GES",
        "nom": "Gestion",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      }
    ]
  },
  {
    "faculte_code": "IUT",
    "faculte_nom": "Institut Universitaire de Technologie de Gestion",
    "filieres": [
      {
        "code": "FC",
        "nom": "Finance-Comptabilité",
        "niveaux": ["L1", "L2", "L3"]
      },
      {
        "code": "GC",
        "nom": "Gestion Commerciale",
        "niveaux": ["L1", "L2", "L3"]
      }
    ]
  },
  {
    "faculte_code": "ESA",
    "faculte_nom": "École Supérieure d'Agronomie",
    "filieres": [
      {
        "code": "PV",
        "nom": "Production Végétale",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "PA",
        "nom": "Production Animale",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "ESR",
        "nom": "Économie et Sociologie Rurales",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      }
    ]
  },
  {
    "faculte_code": "ENP",
    "faculte_nom": "École Nationale Polytechnique",
    "filieres": [
      {
        "code": "GC",
        "nom": "Génie Civil",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "GE",
        "nom": "Génie Électrique",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "GM",
        "nom": "Génie Mécanique",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "IS",
        "nom": "Informatique et Systèmes",
        "niveaux": ["L1", "L2", "L3", "M1", "M2"]
      },
      {
        "code": "IABD",
        "nom": "Intelligence Artificielle et Big Data",
        "niveaux": ["M1", "M2"]
      },
      {
        "code": "LT",
        "nom": "Logistique et Transport",
        "niveaux": ["L1", "L2", "L3"]
      }
    ]
  },
  {
    "faculte_code": "ESTBA",
    "faculte_nom": "École Supérieure des Techniques Biologiques et Alimentaires",
    "filieres": [
      {
        "code": "AMB",
        "nom": "Analyses Médicales et Biologiques",
        "niveaux": ["L1", "L2", "L3"]
      },
      {
        "code": "IA",
        "nom": "Industries Alimentaires",
        "niveaux": ["L1", "L2", "L3"]
      }
    ]
  },
  {
    "faculte_code": "EAM",
    "faculte_nom": "École des Assistants Médicaux",
    "filieres": [
      {
        "code": "AM",
        "nom": "Assistance Médicale",
        "niveaux": ["L1", "L2", "L3"]
      },
      {
        "code": "AR",
        "nom": "Anesthésie et Réanimation",
        "niveaux": ["L1", "L2", "L3"]
      },
      {
        "code": "RIM",
        "nom": "Radiologie et Imagerie Médicale",
        "niveaux": ["L1", "L2", "L3"]
      }
    ]
  }
]
```
