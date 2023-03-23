import openai
import time

# API 키 설정
openai.api_key = "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"

# GPT-3 호출
def generate_report(prompt):
    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=prompt,
        temperature=0.7,
        max_tokens=1000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].text.strip()

# 생성할 보고서 목록
reports = [
    "Create a report on the importance of renewable energy sources.",
    "Create a report on the impact of climate change on global economy."
]

# 보고서 생성
for report_prompt in reports:
    try:
        generated_report = generate_report(report_prompt)
        print(generated_report)
    except openai.error.Timeout as e:
        #Handle timeout error, e.g. retry or log
        print(f"OpenAI API request timed out: {e}")
        pass
    except openai.error.APIError as e:
        #Handle API error, e.g. retry or log
        print(f"OpenAI API returned an API Error: {e}")
        pass
    except openai.error.APIConnectionError as e:
        #Handle connection error, e.g. check network or log
        print(f"OpenAI API request failed to connect: {e}")
        pass
    except openai.error.InvalidRequestError as e:
        #Handle invalid request error, e.g. validate parameters or log
        print(f"OpenAI API request was invalid: {e}")
        pass
    except openai.error.AuthenticationError as e:
        #Handle authentication error, e.g. check credentials or log
        print(f"OpenAI API request was not authorized: {e}")
        pass
    except openai.error.PermissionError as e:
        #Handle permission error, e.g. check scope or log
        print(f"OpenAI API request was not permitted: {e}")
        pass
    except openai.error.RateLimitError as e:
        #Handle rate limit error, e.g. wait or log
        print(f"OpenAI API request exceeded rate limit: {e}")
        pass
    # 다음 보고서를 생성하기 전에 10초 쉬기
    time.sleep(10)


    import openai
