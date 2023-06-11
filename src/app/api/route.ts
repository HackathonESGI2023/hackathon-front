import { NextRequest, NextResponse } from "next/server";

const isBrowser = typeof window !== "undefined";

const token = isBrowser ? localStorage.getItem("token") || null : null;

const base_url = "http://localhost:3000";

export async function GET(request: NextRequest) {
  const req = new URL(`${base_url}/${request}`);

  const res = await fetch(req, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}

export async function POST(request: NextRequest, bodyData: any) {
  const req = new URL(`${base_url}/${request}`);
  const res = await fetch(req, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}

export async function PATCH(request: NextRequest, bodyData: any) {
  const req = new URL(`${base_url}/${request}`);
  const res = await fetch(req, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bodyData),
  });

  return NextResponse.json(await res.json());
}

export async function DELETE(request: NextRequest) {
  const req = new URL(`${base_url}/${request}`);
  const res = await fetch(req, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}
