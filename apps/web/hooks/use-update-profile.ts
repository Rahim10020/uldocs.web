"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProfilePayload } from "shared";
import { updateProfile } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query-keys";

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
		onSuccess: (user) => {
			queryClient.setQueryData(queryKeys.auth.me, user);
		},
	});
}
