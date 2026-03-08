�import { NextRequest, NextResponse } from "next/server";
import { loginSchema }  from "@/modules/users/users.schema";
import { loginUser }    from "@/modules/users/users.service";
import type { ErrorResponse } from "@/modules/users/users.types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      const response: ErrorResponse = {
        error: "Datos de inicio de sesión inválidos.",
        details: validation.error.errors[0].message,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const { user, accessToken } = await loginUser(validation.data);

    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso.",
        user,
        accessToken,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    const err = error as Error;

    if (err.message === "INVALID_CREDENTIALS") {
      const response: ErrorResponse = {
        error: "Credenciales incorrectas. Verifica tu email y contraseña.",
      };
      return NextResponse.json(response, { status: 401 });
    }

    if (err.message === "USER_NOT_FOUND") {
      const response: ErrorResponse = {
        error: "Credenciales incorrectas. Verifica tu email y contraseña.",
      };
      return NextResponse.json(response, { status: 401 });
    }

    console.error("[POST /api/users/login]", err.message);
    const response: ErrorResponse = { error: "Error interno del servidor." };
    return NextResponse.json(response, { status: 500 });
  }
}
�"(72bd7035e7a959ee4bbfe129beb12c2a2dd46bad2ufile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico/src/app/api/users/login/route.ts:Tfile:///Users/santiagovalencia/Documents/proyecto_informatico_1/Proyecto_Informatico