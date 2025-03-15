// //アクセス制限のロジックを一括管理（認可）
// "use client";
// import { useEffect } from "react";
// import { useSupabaseSssion } from "./useSupabaseSssion";
// import { useRouter } from "next/router";

// export const useRouteGuard = () => {
//   const { session, isLoading } = useSupabaseSssion();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoading) return;
//     if (!session) router.replace("/login");
//   }, [isLoading, router, session]);
// };
