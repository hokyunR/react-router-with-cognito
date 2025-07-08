import { Link, Form } from "react-router";
import { requireAuthenticated, getUserInfo } from "~/.server/utils.server";

import type { Route } from "./+types/show";

export async function loader({ params, request }: Route.LoaderArgs) {
  await requireAuthenticated(request);

  const userInfo = await getUserInfo(request);

  return {
    projectId: params.projectId || "default",
    userInfo,
  };
}

export default function Show({ loaderData }: Route.ComponentProps) {
  const { projectId, userInfo } = loaderData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                프로젝트 대시보드
              </h1>
              <p className="text-gray-600 mt-1">안전하게 보호된 페이지입니다</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{userInfo?.email}</span>
              <Form method="post" action="/logout">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                >
                  로그아웃
                </button>
              </Form>
            </div>
          </div>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            사용자 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p>
                <strong>이메일:</strong> {userInfo?.email}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>사용자 ID:</strong> {userInfo?.sub}
              </p>
              <p>
                <strong>프로젝트 ID:</strong> {projectId}
              </p>
            </div>
          </div>
        </div>

        {/* 프로젝트 컨텐츠 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            프로젝트: {projectId}
          </h2>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">보호된 컨텐츠</h3>
              <p className="text-blue-700">
                이 페이지는 인증된 사용자만 접근할 수 있습니다. Cognito OAuth2를
                통해 안전하게 보호되고 있습니다.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">인증 상태</h3>
              <p className="text-green-700">
                ✓ 사용자 인증 완료
                <br />
                ✓ 토큰 유효성 확인
                <br />✓ 사용자 정보 로드 완료
              </p>
            </div>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            네비게이션
          </h2>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
