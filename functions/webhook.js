// Cloudflare Pages Functions - Kakao Webhook (안전 테스트용)

export async function onRequestPost({ request }) {
  // 1) 요청 바디를 안전하게 파싱 (비어 있어도 오류 안 나게)
  let bodyText = await request.text();
  let body = {};
  try {
    if (bodyText) {
      body = JSON.parse(bodyText);
    }
  } catch (e) {
    // JSON이 아니면 그냥 빈 객체로 둡니다
    body = {};
  }

  const utter =
    body?.userRequest?.utterance && typeof body.userRequest.utterance === "string"
      ? body.userRequest.utterance
      : "";

  // 2) "교육영상" 이 들어가면 카드 응답
  if (utter.includes("교육영상")) {
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            basicCard: {
              title: "대장내시경 준비 교육 영상",
              description: "아래 버튼을 눌러 영상을 시청해 주세요.",
              thumbnail: {
                imageUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg" // 나중에 교체 가능
              },
              buttons: [
                {
                  action: "webLink",
                  label: "영상 보기",
                  webLinkUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // 실제 교육 영상 URL로 교체 가능
                }
              ]
            }
          }
        ]
      }
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    });
  }

  // 3) 그 외에는 사용자가 보낸 문장을 그대로 되돌려주는 simpleText
  const replyText = utter
    ? `테스트 중입니다.\n당신이 보낸 문장: ${utter}`
    : "테스트 중입니다. 문장을 보내 주세요.";

  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: replyText
          }
        }
      ]
    }
  };

  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
