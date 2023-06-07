import { NextResponse } from "next/server";

const isBrowser = typeof window !== "undefined";

const token = isBrowser ? localStorage.getItem("token") || null : null;

export async function GET(request: string) {
  const req = new URL(request);
  //   const id = searchParams.get('id');
  const res = await fetch(req, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}

export async function POST(request: string, bodyData: any) {
  const req = new URL(request);
  const res = await fetch(req, {
    method: "POST",
    body: bodyData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}

export async function PATCH(request: string, bodyData: any) {
  const req = new URL(request);
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

export async function DELETE(request: string) {
  const req = new URL(request);
  const res = await fetch(req, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return NextResponse.json(await res.json());
}
