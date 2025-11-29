export async function onRequestPost(context) {
  const { request } = context;

  try {
    const body = await request.json();
    const utter = body?.userRequest?.utterance ?? "";

    // ===== 영상 요청일 때 카드 응답 =====
    if (utter.includes("교육영상") || utter.includes("영상") || utter.includes("보여줘")) {
      const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              basicCard: {
                title: "대장내시경 준비 교육 영상",
                description: "아래 버튼을 눌러서 영상을 시청하세요.",
                thumbnail: {
                  imageUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                },
                buttons: [
                  {
                    action: "webLink",
                    label: "교육영상 보기",
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

    // ===== 일반 텍스트 테스트 응답 =====
    const replyText = `테스트 응답입니다. 서버 연결은 성공했습니다.\n(받은 문장: ${utter})`;

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
    const errorResponse = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            }
          }
        ]
      }
    };

    return new Response(JSON.stringify(errorResponse), {
      headers: { "Content-Type": "application/json;charset=utf-8" }
    });
  }
}
