import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("=== MIDDLEWARE START ===");
  console.log("Path:", request.nextUrl.pathname);
  console.log(
    "All cookies:",
    request.cookies.getAll().map((c) => ({ name: c.name, hasValue: !!c.value }))
  );

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          console.log(
            "Setting cookies:",
            cookiesToSet.map((c) => c.name)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    // Check if user is authenticated
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log("Auth result:", {
      userId: user?.id,
      userEmail: user?.email,
      error: error?.message,
    });

    // Redirect to login if not authenticated and trying to access protected route
    if (!user && request.nextUrl.pathname.startsWith("/addCoffee")) {
      console.log("Redirecting to login - no user found");
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    console.log("=== MIDDLEWARE END - ALLOWING ===");
    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    return supabaseResponse;
  }
}

export const config = {
  matcher: ["/addCoffee/:path*"], // Let's make this more specific for now
};
