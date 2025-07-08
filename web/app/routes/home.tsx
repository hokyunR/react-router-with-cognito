import { Link, Form } from "react-router";
import type { Route } from "./+types/home";
import { getUserInfo } from "~/.server/utils.server";

export async function loader({ request }: Route.LoaderArgs) {
  const userInfo = await getUserInfo(request);

  return { userInfo };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { userInfo } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            React Router with Cognito 인증
          </h1>

          {userInfo ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                  로그인 상태
                </h2>
                <div className="space-y-2 text-green-700">
                  <p>
                    <strong>이메일:</strong> {userInfo.email}
                  </p>
                  <p>
                    <strong>사용자 ID:</strong> {userInfo.sub}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <Link
                  to="/projects/show"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  프로젝트 보기
                </Link>

                <Form method="post" action="/logout">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    로그아웃
                  </button>
                </Form>
              </div>
            </div>
          ) : (
            // 로그인되지 않은 상태
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">
                  로그인이 필요합니다
                </h2>
                <p className="text-blue-700 mb-4">
                  AWS Cognito를 통해 안전하게 로그인하고 프로젝트에 접근하세요.
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  로그인
                </Link>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  기능 소개
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• AWS Cognito 기반 OAuth2 인증</li>
                  <li>• 안전한 토큰 관리</li>
                  <li>• React Router 7 통합</li>
                  <li>• 자동 토큰 갱신</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
