"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdminUserUpdatePayload } from "shared";
import { updateAdminUser } from "@/lib/api/admin";
import { queryKeys } from "@/lib/query-keys";

type UpdateAdminUserVariables = {
	id: number;
	payload: AdminUserUpdatePayload;
};

/** Mutation de rôle ou de statut d'un compte depuis le dashboard admin. */
export function useAdminUserUpdate() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, payload }: UpdateAdminUserVariables) =>
			updateAdminUser(id, payload),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKeys.admin.usersRoot,
				}),
				queryClient.invalidateQueries({
					queryKey: queryKeys.admin.auditRoot,
				}),
				queryClient.invalidateQueries({
					queryKey: queryKeys.admin.statsRoot,
				}),
			]);
		},
	});
}
