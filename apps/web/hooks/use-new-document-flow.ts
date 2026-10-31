"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { DocumentDetail, TypeDocument, Utilisateur } from "shared";
import { useAcademicTree } from "@/hooks/use-academic-tree";
import { useCreateDocuments } from "@/hooks/use-create-documents";
import { resolveAcademicSelection } from "@/lib/academic-selection";
import {
	addFilesToSelection,
	currentAcademicYear,
	getDocumentFormat,
	getFileKey,
	titleFromFileName,
} from "@/lib/document-upload";
import {
	type DocumentMetadataValues,
	documentMetadataSchema,
} from "@/lib/document-upload-schema";
import { readPdfPageCount } from "@/lib/pdf-page-count";
import { routes } from "@/lib/routes";
import type {
	NewDocumentStep,
	UploadFailure,
	UploadFileItem,
} from "@/types/document-upload";

function createDefaultValues(): DocumentMetadataValues {
	return {
		type: "",
		faculteId: "",
		filiereId: "",
		niveauId: "",
		semestreId: "",
		ueId: "",
		anneeAcademique: currentAcademicYear(),
		certification: false,
	};
}

function mergeCreated(
	current: DocumentDetail[],
	next: DocumentDetail[],
): DocumentDetail[] {
	const byId = new Map(current.map((document) => [document.id, document]));

	for (const document of next) {
		byId.set(document.id, document);
	}

	return [...byId.values()];
}

/** État et règles du parcours d'import multi-fichiers. */
export function useNewDocumentFlow({ user }: { user: Utilisateur }) {
	const router = useRouter();
	const treeQuery = useAcademicTree();
	const createDocuments = useCreateDocuments();
	const form = useForm<DocumentMetadataValues>({
		resolver: zodResolver(documentMetadataSchema),
		defaultValues: createDefaultValues(),
		mode: "onSubmit",
	});

	const [step, setStep] = useState<NewDocumentStep>(1);
	const [files, setFiles] = useState<UploadFileItem[]>([]);
	const [titles, setTitles] = useState<Record<string, string>>({});
	const [titleErrors, setTitleErrors] = useState<Record<string, string>>({});
	const [fileErrors, setFileErrors] = useState<string[]>([]);
	const [createdDocs, setCreatedDocs] = useState<DocumentDetail[]>([]);
	const [failed, setFailed] = useState<UploadFailure[]>([]);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [progress, setProgress] = useState({ completed: 0, total: 0 });
	const [cancelOpen, setCancelOpen] = useState(false);
	const prefilledRef = useRef(false);

	const facultes = treeQuery.data ?? [];
	const faculteId = form.watch("faculteId");
	const filiereId = form.watch("filiereId");
	const niveauId = form.watch("niveauId");
	const semestreId = form.watch("semestreId");

	const selectedFaculte = facultes.find(
		(faculte) => String(faculte.id) === faculteId,
	);
	const selectedFiliere = selectedFaculte?.filieres.find(
		(filiere) => String(filiere.id) === filiereId,
	);
	const selectedNiveau = selectedFiliere?.niveaux.find(
		(niveau) => String(niveau.id) === niveauId,
	);
	const selectedSemestre = selectedNiveau?.semestres.find(
		(semestre) => String(semestre.id) === semestreId,
	);

	const faculteOptions = facultes.map((faculte) => ({
		value: String(faculte.id),
		label: `${faculte.nom} (${faculte.code})`,
	}));
	const filiereOptions =
		selectedFaculte?.filieres.map((filiere) => ({
			value: String(filiere.id),
			label: filiere.nom,
		})) ?? [];
	const niveauOptions =
		selectedFiliere?.niveaux.map((niveau) => ({
			value: String(niveau.id),
			label: niveau.nom,
		})) ?? [];
	const semestreOptions =
		selectedNiveau?.semestres.map((semestre) => ({
			value: String(semestre.id),
			label: semestre.nom,
		})) ?? [];
	const ueOptions =
		selectedSemestre?.ues.map((ue) => ({
			value: String(ue.id),
			label: ue.nom,
		})) ?? [];

	function applyProfileSelection() {
		const selection = resolveAcademicSelection(facultes, user);

		if (!selection) {
			return;
		}

		form.setValue("faculteId", selection.faculteId);
		form.setValue("filiereId", selection.filiereId);
		form.setValue("niveauId", selection.niveauId);
	}

	useEffect(() => {
		if (prefilledRef.current) {
			return;
		}

		const selection = resolveAcademicSelection(facultes, user);

		if (!selection) {
			return;
		}

		prefilledRef.current = true;
		form.setValue("faculteId", selection.faculteId);
		form.setValue("filiereId", selection.filiereId);
		form.setValue("niveauId", selection.niveauId);
	}, [facultes, form, user]);

	function handleFaculteChange(value: string) {
		form.setValue("faculteId", value, { shouldValidate: true });
		form.setValue("filiereId", "");
		form.setValue("niveauId", "");
		form.setValue("semestreId", "");
		form.setValue("ueId", "");
		form.clearErrors(["filiereId", "niveauId", "semestreId", "ueId"]);
	}

	function handleFiliereChange(value: string) {
		form.setValue("filiereId", value, { shouldValidate: true });
		form.setValue("niveauId", "");
		form.setValue("semestreId", "");
		form.setValue("ueId", "");
		form.clearErrors(["niveauId", "semestreId", "ueId"]);
	}

	function handleNiveauChange(value: string) {
		form.setValue("niveauId", value, { shouldValidate: true });
		form.setValue("semestreId", "");
		form.setValue("ueId", "");
		form.clearErrors(["semestreId", "ueId"]);
	}

	function handleSemestreChange(value: string) {
		form.setValue("semestreId", value, { shouldValidate: true });
		form.setValue("ueId", "");
		form.clearErrors("ueId");
	}

	function handleFilesContinue() {
		if (files.length === 0) {
			setFileErrors(["Sélectionne au moins un fichier."]);
			return;
		}

		setFileErrors([]);
		setStep(2);
	}

	function handleFilesAdd(incoming: File[]) {
		const { accepted, errors } = addFilesToSelection(
			files.map((item) => item.file),
			incoming,
		);

		setFileErrors(errors);

		const nextItems: UploadFileItem[] = [];

		for (const file of accepted) {
			const format = getDocumentFormat(file);

			if (!format) {
				continue;
			}

			nextItems.push({
				id: getFileKey(file),
				file,
				format,
				nbPages: format === "image" ? 1 : null,
			});
		}

		if (nextItems.length === 0) {
			return;
		}

		setFiles((current) => [...current, ...nextItems]);
		setTitles((current) => {
			const next = { ...current };

			for (const item of nextItems) {
				next[item.id] = titleFromFileName(item.file.name);
			}

			return next;
		});
		setTitleErrors((current) => {
			const next = { ...current };

			for (const item of nextItems) {
				delete next[item.id];
			}

			return next;
		});

		for (const item of nextItems) {
			if (item.format !== "pdf") {
				continue;
			}

			void readPdfPageCount(item.file).then((pageCount) => {
				if (pageCount === null) {
					return;
				}

				setFiles((current) =>
					current.map((file) =>
						file.id === item.id ? { ...file, nbPages: pageCount } : file,
					),
				);
			});
		}
	}

	function handleFileRemove(id: string) {
		setFiles((current) => current.filter((item) => item.id !== id));
		setTitles((current) => {
			const next = { ...current };
			delete next[id];
			return next;
		});
		setTitleErrors((current) => {
			const next = { ...current };
			delete next[id];
			return next;
		});
	}

	function handleTitleChange(id: string, value: string) {
		setTitles((current) => ({ ...current, [id]: value }));
		setTitleErrors((current) => {
			if (!current[id]) {
				return current;
			}

			const next = { ...current };
			delete next[id];
			return next;
		});
	}

	function validateTitles(): boolean {
		const nextErrors: Record<string, string> = {};

		for (const item of files) {
			if (!titles[item.id]?.trim()) {
				nextErrors[item.id] = "Le titre est requis.";
			}
		}

		setTitleErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	}

	async function handleDetailsContinue() {
		const metadataValid = await form.trigger([
			"type",
			"faculteId",
			"filiereId",
		]);
		const titlesValid = validateTitles();

		if (metadataValid && titlesValid) {
			setStep(3);
		}
	}

	function handleBack() {
		if (step === 3) {
			setStep(2);
		} else if (step === 2) {
			setStep(1);
		}
	}

	async function submitFiles(items: UploadFileItem[]) {
		if (items.length === 0) {
			return;
		}

		const values = form.getValues();

		setSubmitError(null);
		setProgress({ completed: 0, total: items.length });

		try {
			const result = await createDocuments.mutateAsync({
				files: items,
				titles,
				metadata: {
					type: values.type as TypeDocument,
					ueId: Number(values.ueId),
					anneeAcademique: values.anneeAcademique,
				},
				onProgress: (completed, total) => {
					setProgress({ completed, total });
				},
			});

			setCreatedDocs((current) => mergeCreated(current, result.created));
			setFailed(result.failed);

			if (result.created.length > 0) {
				setStep(4);
				return;
			}

			setSubmitError(
				"Aucun fichier n'a pu être envoyé. Vérifie ta connexion et réessaie.",
			);
		} catch {
			setSubmitError("L'envoi a échoué. Vérifie ta connexion et réessaie.");
		}
	}

	async function handleClassificationContinue() {
		const valid = await form.trigger([
			"niveauId",
			"semestreId",
			"ueId",
			"anneeAcademique",
			"certification",
		]);

		if (!valid) {
			return;
		}

		await submitFiles(files);
	}

	async function handleRetryFailed() {
		await submitFiles(failed.map((item) => item.file));
	}

	function handleStartOver() {
		setFiles([]);
		setTitles({});
		setTitleErrors({});
		setFileErrors([]);
		setCreatedDocs([]);
		setFailed([]);
		setSubmitError(null);
		setProgress({ completed: 0, total: 0 });
		setStep(1);
		form.reset(createDefaultValues());
		prefilledRef.current = true;
		applyProfileSelection();
	}

	function handleCancelRequest() {
		setCancelOpen(true);
	}

	function handleCancelConfirm() {
		setCancelOpen(false);
		router.push(routes.documents);
	}

	return {
		step,
		files,
		titles,
		titleErrors,
		fileErrors,
		createdDocs,
		failed,
		submitError,
		progress,
		cancelOpen,
		isSubmitting: createDocuments.isPending,
		form,
		treeQuery,
		faculteOptions,
		filiereOptions,
		niveauOptions,
		semestreOptions,
		ueOptions,
		handleFilesAdd,
		handleFileRemove,
		handleTitleChange,
		handleFilesContinue,
		handleDetailsContinue,
		handleClassificationContinue,
		handleBack,
		handleRetryFailed,
		handleStartOver,
		handleCancelRequest,
		handleCancelConfirm,
		setCancelOpen,
		handleFaculteChange,
		handleFiliereChange,
		handleNiveauChange,
		handleSemestreChange,
	};
}

export type NewDocumentFlowController = ReturnType<typeof useNewDocumentFlow>;
