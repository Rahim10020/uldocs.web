"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { ActionModeration } from "shared";
import {
	type ModerationDecisionFormOutput,
	type ModerationDecisionFormValues,
	moderationDecisionSchema,
} from "@/lib/reports";
import { useModerationDecision } from "./use-moderation-decision";

/** Formulaire de décision d'un signalement : action, raison et mutation. */
export function useModerationForm(reportId: number) {
	const mutation = useModerationDecision();
	const form = useForm<
		ModerationDecisionFormValues,
		unknown,
		ModerationDecisionFormOutput
	>({
		resolver: zodResolver(moderationDecisionSchema),
		defaultValues: {
			action: "",
			raison: "",
		},
	});
	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await mutation.mutateAsync({
				reportId,
				action: values.action as ActionModeration,
				raison: values.raison,
			});
		} catch {
			// L'erreur est exposée par `mutation.isError`.
		}
	});

	return {
		form,
		mutation,
		onSubmit,
	};
}
