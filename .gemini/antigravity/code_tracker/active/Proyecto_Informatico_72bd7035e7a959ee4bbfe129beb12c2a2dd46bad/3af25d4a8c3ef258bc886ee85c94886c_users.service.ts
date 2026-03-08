ºimport { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RegisterInput, LoginInput } from "./users.schema";
import type { UserProfile } from "./users.types";
export async function registerUser(data: RegisterInput): Promise<UserProfile> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("SUPABASE_NOT_INITIALIZED");

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    if (authError.message.toLowerCase().includes("already registered")) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error("No se pudo crear el usuario. Intenta de nuevo.");
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUsername) {
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw new Error("USERNAME_ALREADY_EXISTS");
  }

  const user = await prisma.user.create({
    data: {
      id: authData.user.id,
      email: data.email,
      username: data.username,
      role: data.role,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      avatarUrl: true,
      description: true,
      avgRating: true,
      totalRatings: true,
      createdAt: true,
    },
  });

  return user;
}

export async function loginUser(
  data: LoginInput
): Promise<{ user: UserProfile; accessToken: string }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("SUPABASE_NOT_INITIALIZED");

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

  if (authError) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (!authData.user || !authData.session) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = await prisma.user.findUnique({
    where: { id: authData.user.id },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      avatarUrl: true,
      description: true,
      avgRating: true,
      totalRatings: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    user,
    accessToken: authData.session.access_token,
  };
}


export async function logoutUser(accessToken?: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;

  if (accessToken) {
    await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: "",
    });
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("No se pudo cerrar la sesi√≥n. Intenta de nuevo.");
  }
}


export async function getAuthenticatedUser(): Promise<UserProfile | null> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return null;

    const { data: { user: authUser } } = await supabase.auth.getUser();

    if (!authUser) return null;

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        avatarUrl: true,
        description: true,
        avgRating: true,
        totalRatings: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("[getAuthenticatedUser] Error:", error);
    return null;
  }
}
Ÿ *cascade08Ÿª*cascade08ªº *cascade08"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2zfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico/src/modules/users/users.service.ts:Wfile:///Users/santiagovalencia/proyecto%20informatico_1%20frontend/Proyecto_Informatico