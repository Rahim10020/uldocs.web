import {
  ACADEMIC_DATA,
  type Faculte,
  type FaculteTree,
  type Filiere,
  type Niveau,
  type NiveauScolarite,
  ORDRE_NIVEAU,
  SEMESTRES_PAR_NIVEAU,
  type Semestre,
  type UE,
} from "shared";

/**
 * Arbre académique mocké, construit à partir de docs/academic-data.md.
 * Les ids sont déterministes : la même donnée produit toujours le même id.
 */

const CREATED_AT = "2025-09-01T08:00:00.000Z";

type MockSemestre = Semestre & { ues: UE[] };
type MockNiveau = Niveau & { semestres: MockSemestre[] };
type MockFiliere = Filiere & { niveaux: MockNiveau[] };

export type UeContext = {
  ue: UE;
  semestre: Semestre & { ues: UE[] };
  niveau: Niveau;
  filiere: Filiere;
  faculte: Faculte;
};

type AcademicBuild = {
  facultes: FaculteTree[];
  contexts: Map<number, UeContext>;
};

function createSemestres(
  niveauId: number,
  niveau: NiveauScolarite,
  nextId: () => number,
): MockSemestre[] {
  return SEMESTRES_PAR_NIVEAU[niveau].map((nom) => {
    const id = nextId();

    return {
      id,
      nom,
      ordre: Number(nom.slice(1)),
      niveauId,
      ues: [],
    };
  });
}

function buildAcademicData(): AcademicBuild {
  let faculteSeq = 0;
  let filiereSeq = 0;
  let niveauSeq = 0;
  let semestreSeq = 0;
  let ueSeq = 0;

  const facultes: FaculteTree[] = [];

  for (const structure of ACADEMIC_DATA) {
    const faculteId = ++faculteSeq;

    const filieres: MockFiliere[] = structure.filieres.map((filiereSeed) => {
      const filiereId = ++filiereSeq;

      const niveaux: MockNiveau[] = filiereSeed.niveaux.map((nom) => {
        const niveauId = ++niveauSeq;

        return {
          id: niveauId,
          nom,
          ordre: ORDRE_NIVEAU[nom],
          filiereId,
          semestres: createSemestres(niveauId, nom, () => ++semestreSeq),
        };
      });

      // Rattachement provisoire des UE : répartition uniforme sur les
      // semestres de la filière. À remplacer dès que le rattachement
      // officiel est fourni.
      const semestres = niveaux.flatMap((niveau) => niveau.semestres);
      const ueCount = filiereSeed.ues.length;

      for (const [index, ueNom] of filiereSeed.ues.entries()) {
        const semestreIndex = Math.floor((index * semestres.length) / ueCount);
        const semestre = semestres[semestreIndex];

        if (!semestre) {
          continue;
        }

        semestre.ues.push({
          id: ++ueSeq,
          nom: ueNom,
          code: null,
          aliases: null,
          semestreId: semestre.id,
          createdAt: CREATED_AT,
        });
      }

      return {
        id: filiereId,
        nom: filiereSeed.nom,
        code: null,
        faculteId,
        createdAt: CREATED_AT,
        niveaux,
      };
    });

    facultes.push({
      id: faculteId,
      nom: structure.nom,
      code: structure.code,
      categorie: structure.categorie,
      description: null,
      createdAt: CREATED_AT,
      filieres,
    });
  }

  const contexts = new Map<number, UeContext>();

  for (const faculte of facultes) {
    for (const filiere of faculte.filieres) {
      for (const niveau of filiere.niveaux) {
        for (const semestre of niveau.semestres) {
          for (const ue of semestre.ues) {
            contexts.set(ue.id, {
              ue,
              semestre,
              niveau,
              filiere,
              faculte,
            });
          }
        }
      }
    }
  }

  return { facultes, contexts };
}

const built = buildAcademicData();

const contextsByUeName = new Map<string, UeContext>(
  [...built.contexts.values()].map((context) => [context.ue.nom, context]),
);

export const mockAcademic = {
  facultes: built.facultes,
  ues: [...built.contexts.values()].map((context) => context.ue),
};

/** Retrouve l'UE et toute sa hiérarchie à partir de son id. */
export function getUeContext(ueId: number): UeContext | undefined {
  return built.contexts.get(ueId);
}

/** Retrouve l'UE et toute sa hiérarchie à partir de son nom. */
export function getUeContextByName(nom: string): UeContext | undefined {
  return contextsByUeName.get(nom);
}
