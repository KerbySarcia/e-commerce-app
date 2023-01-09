import { NextResponse } from "next/server";

export default function middleware(request) {
  const url = request.url;
  const cookie = request.cookies.get("token")?.value;
  if (url.includes("/login") && cookie) {
    return NextResponse.redirect("localhost:3000/");
  }
  return NextResponse.next();
}
