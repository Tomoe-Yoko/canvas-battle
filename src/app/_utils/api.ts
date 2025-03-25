import { supabase } from "./supabase";

const getAccessToken = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || "";
};

export const api = {
  get: async <ResponseType>(endpoint: string) => {
    try {
      const res = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAccessToken(),
        },
      });
      if (res.status !== 200) {
        const errorData = await res.json(); // エラーレスポンスを取得
        console.error("Error fetching data:", errorData); // エラーログを出力
        // throw new Error("データの取得に失敗しました。");
      }

      const data: ResponseType = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  },

  post: async <ResponseType, RequestType = undefined>(
    endpoint: string,
    payload: RequestType
  ) => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAccessToken(),
        },
        body: JSON.stringify(payload),
      });
      if (res.status !== 200) {
        const errorData = await res.json();
        const errorMessage = errorData.message || "登録に失敗しました。";
        throw new Error(errorMessage);
      }
      const data: ResponseType = await res.json();
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  put: async <RequestType, ResponseType>(
    endpoint: string,
    payload: RequestType //更新データ
  ) => {
    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAccessToken(),
        },
        body: JSON.stringify(payload),
      });
      if (res.status !== 200) throw new Error("更新に失敗しました。");
      const data: ResponseType = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  },

  del: async <ResponseType>(endpoint: string) => {
    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: await getAccessToken(),
        },
      });
      if (res.status !== 200) throw new Error("削除に失敗しました。");
      const data: ResponseType = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  },
};
