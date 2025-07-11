import { Trans } from "@lingui-solid/solid/macro";

import { useApi } from "@uwucord/client";
import { CONFIGURATION } from "@uwucord/common";
import { useNavigate } from "@uwucord/routing";
import { Button } from "@uwucord/ui";

import { FlowTitle } from "./Flow";
import { setFlowCheckEmail } from "./FlowCheck";
import { Fields, Form } from "./Form";

/**
 * Flow for sending password reset
 */
export default function FlowReset() {
  const api = useApi();
  const navigate = useNavigate();

  /**
   * Send password reset
   * @param data Form Data
   */
  async function reset(data: FormData) {
    const email = data.get("email") as string;
    const captcha = data.get("captcha") as string;

    await api.post("/auth/account/reset_password", {
      email,
      captcha,
    });

    setFlowCheckEmail(email);
    navigate("/login/check", { replace: true });
  }

  return (
    <>
      <FlowTitle>
        <Trans>Reset password</Trans>
      </FlowTitle>
      <Form onSubmit={reset} captcha={CONFIGURATION.HCAPTCHA_SITEKEY}>
        <Fields fields={["email"]} />
        <Button type="submit">
          <Trans>Reset</Trans>
        </Button>
      </Form>
      <a href="/login/auth">
        <Trans>Go back to login</Trans>
      </a>
      {import.meta.env.DEV && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "white",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/login/reset/abc", { replace: true });
          }}
        >
          Mock Reset Screen
        </div>
      )}
    </>
  );
}
