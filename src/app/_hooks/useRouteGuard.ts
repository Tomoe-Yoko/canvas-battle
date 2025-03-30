// //アクセス制限のロジックを一括管理（認可）
// "use client";
// import { useEffect } from "react";
// import { useSupabaseSession } from "./useSupabaseSession";
// import { useRouter } from "next/router";

// export const useRouteGuard = () => {
//   const { session, isLoading } = useSupabaseSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoading) return;
//     if (!session) router.replace("/login");
//   }, [isLoading, router, session]);
// };
