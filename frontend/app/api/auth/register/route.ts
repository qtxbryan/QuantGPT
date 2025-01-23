import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    // Forward the request to the Flask backend
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return NextResponse.json({ message: "Registration successful" });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Registration failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Server error ${error}` },
      { status: 500 }
    );
  }
}
