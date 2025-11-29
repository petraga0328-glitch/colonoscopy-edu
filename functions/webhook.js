// Cloudflare Pages Functions - Kakao Webhook (테스트용)

export async function onRequestPost(context) {
  const { request } = context;

  try {
    const body = await request.json();
    const utter = body?.userRequest?.utterance ?? "";

    // 1) "교육영상"이라는 말이 들어가면 카드 응답
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
                  imageUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                },
                buttons: [
                  {
                    action: "webLink",
                    label: "영상 보기",
                    webLinkUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  }
                ]
              }
            }
          ]
        }
      };

      return new Response(JSON.stringify(responseBody), {
        headers: { "Content-Type": "application/json;charset=utf-8" }
      });
    }

    // 2) 그 외에는 simpleText로 회신
    const replyText = `테스트 중입니다.\n당신이 보낸 문장: ${utter}`;

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
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  } catch (e) {
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "서버 오류가 발생했어요. 잠시 후 다시 시도해 주세요."
            }
          }
        ]
      }
    };

    return new Response(JSON.stringify(responseBody), {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  }
}

  
