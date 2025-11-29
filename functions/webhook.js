// Cloudflare Pages Functions - Kakao Webhook (초간단 버전)

export async function onRequestPost() {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "테스트 응답입니다. 서버 연결은 성공했습니다."
          }
        }
      ]
    }
  };

  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}

