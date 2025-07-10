import { redirect } from "react-router";
import { sessionStorage } from "./session.server";
import { env } from "~/env";

export interface UserInfo {
  sub: string;
  email: string;
  username: string;
  "custom:tenant_name": string;
}

export const requireAuthenticated = async (request: Request) => {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    throw new Response(null, {
      status: 401,
      statusText: "Unauthorized",
    });
  }

  return accessToken;
};

export const requireAnonymous = async (request: Request) => {
  const accessToken = await getAccessToken(request);

  if (accessToken) {
    throw redirect("/");
  }
};

export const getAccessToken = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const accessToken = session.get("accessToken");

  if (!accessToken || typeof accessToken !== "string") {
    return null;
  }

  return accessToken;
};

export const getUserInfo = async (request: Request) => {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch(`${env.DOMAIN}/oauth2/userInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const userInfo = await response.json();

    return userInfo as UserInfo;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
};
