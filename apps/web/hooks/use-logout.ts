"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/api/auth";
import { queryKeys } from "@/lib/query-keys";

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(queryKeys.auth.me, null);
			void queryClient.invalidateQueries({
				queryKey: queryKeys.documents.all,
			});
		},
	});
}
