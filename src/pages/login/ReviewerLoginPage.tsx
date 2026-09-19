import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import { postLocalLogin } from "@/shared/api/authApi";
import { getErrorStatus, toErrorMessage } from "@/shared/api/apiError";
import { Button } from "@/shared/components/button/Button";
import { Header } from "@/shared/components/header/Header";
import { pageContent } from "@/shared/styles/layout.css";

import * as styles from "./ReviewerLoginPage.css";

const EMPTY_INPUT_MESSAGE = "아이디와 비밀번호를 입력해 주세요.";
const INVALID_CREDENTIALS_MESSAGE = "아이디 또는 비밀번호가 올바르지 않아요.";
const LOGIN_FAILURE_MESSAGE =
  "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";

const ERROR_MESSAGE_ID = "reviewer-login-error";

/**
 * 공모전 심사위원 전용 로그인 화면.
 *
 * 서비스는 소셜 로그인만 제공하므로 회원가입은 두지 않고, 심사용으로 미리
 * 만들어 둔 계정의 아이디·비밀번호만 받습니다.
 */
export function ReviewerLoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: postLocalLogin,
    onSuccess: () => {
      /**
       * 인증 상태는 앱을 처음 불러올 때 한 번만 복원합니다. 소셜 로그인이
       * 돌아오는 콜백 화면을 새로 열어, 방금 받은 쿠키로 세션을 복원하고
       * 약관 동의 여부에 따라 이동하는 흐름을 그대로 탑니다.
       */
      window.location.replace("/auth/success");
    },
    onError: (error) => {
      // 400(형식 오류)도 사용자 입장에서는 아이디·비밀번호가 틀린 것과 같습니다.
      const status = getErrorStatus(error);

      setErrorMessage(
        status === 400 || status === 401
          ? INVALID_CREDENTIALS_MESSAGE
          : toErrorMessage(error, LOGIN_FAILURE_MESSAGE),
      );
    },
  });

  // 성공 후 페이지가 다시 열리기 전까지도 버튼을 막아 중복 요청을 보내지 않습니다.
  const isSubmitting = loginMutation.isPending || loginMutation.isSuccess;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedLoginId = loginId.trim();

    if (!trimmedLoginId || !password) {
      setErrorMessage(EMPTY_INPUT_MESSAGE);
      return;
    }

    setErrorMessage(null);

    // 필드 이름만 `email` 이고 백엔드는 로그인 아이디를 받습니다. 공모전 양식의
    // 심사용 계정이 이메일이 아닌 아이디(`openapi`)라 입력칸도 아이디로 둡니다.
    loginMutation.mutate({ email: trimmedLoginId, password });
  };

  const errorProps = errorMessage
    ? { "aria-invalid": true, "aria-describedby": ERROR_MESSAGE_ID }
    : {};

  return (
    <div className={styles.page}>
      <Header backTo="/login" title="심사위원 로그인" />

      <form
        className={`${pageContent} ${styles.form}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <label className={styles.field}>
          <span className={styles.label}>아이디</span>
          <input
            className={styles.input}
            type="text"
            name="username"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="아이디를 입력해 주세요"
            value={loginId}
            onChange={(event) => {
              setLoginId(event.target.value);
              setErrorMessage(null);
            }}
            {...errorProps}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>비밀번호</span>
          <input
            className={styles.input}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrorMessage(null);
            }}
            {...errorProps}
          />
        </label>

        {errorMessage && (
          <p id={ERROR_MESSAGE_ID} className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          width="100%"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
