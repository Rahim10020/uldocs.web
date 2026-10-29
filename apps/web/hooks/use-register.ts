"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RegisterPayload } from "shared";
import { register } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query-keys";

export function useRegister() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: RegisterPayload) => register(payload),
		onSuccess: (user) => {
			queryClient.setQueryData(queryKeys.auth.me, user);
			void queryClient.invalidateQueries({
				queryKey: queryKeys.documents.all,
			});
		},
	});
}
