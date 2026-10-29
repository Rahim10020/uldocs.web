"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginPayload } from "shared";
import { login } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query-keys";

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: LoginPayload) => login(payload),
		onSuccess: (user) => {
			queryClient.setQueryData(queryKeys.auth.me, user);
			void queryClient.invalidateQueries({
				queryKey: queryKeys.documents.all,
			});
		},
	});
}
