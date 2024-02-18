"use server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/utils/supabase";

export const getProfile = async (wallet?: string) => {
  if (!wallet) {
    return Promise.reject(new Error("Wallet address not provided!"));
  }
  if (wallet.startsWith("%40")) {
    wallet = wallet.slice(3);
  }
  const { data, error } = await supabaseServer
    .from("algopass")
    .select("*")
    .or(`wallet.eq.${wallet},name.eq.${wallet}`)
    .maybeSingle();

  if (error) {
    return Promise.reject(error);
  }
  return data;
};

export type ProfilePayload = {
  name: string;
  bio: string;
  urls: [string, string][];
};
export const updateProfile = async (
  wallet: string,
  payload: ProfilePayload
) => {
  for (const k in payload) {
    if (!payload[k as keyof ProfilePayload]) {
      delete payload[k as keyof ProfilePayload];
    }
  }
  try {
    const { error } = await supabaseServer
      .from("algopass")
      .upsert(
        {
          wallet,
          ...payload,
        },
        {
          onConflict: "wallet",
        }
      )
      .maybeSingle();
    if (error) {
      throw error;
    }

    revalidatePath(`/@${wallet}`);
    revalidatePath(`/@${payload.name}`);

    return getProfile(wallet);
  } catch (error) {
    console.log("Cached error", error);
    return Promise.reject(error);
  }
};

export const updateAvatar = async (wallet: string, avatar: File) => {
  if (!avatar) return Promise.reject(new Error("Avatar not provided!"));
  try {
    const { data, error } = await supabaseServer.storage
      .from("algopass")
      .upload(`${wallet}.png`, avatar, {
        upsert: true,
      });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log("Cached error", error);
    return Promise.reject(error);
  }
};
