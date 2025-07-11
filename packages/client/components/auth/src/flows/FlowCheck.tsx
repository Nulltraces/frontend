import { Show } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";

import { useNavigate } from "@uwucord/routing";
import { Button, Row, iconSize } from "@uwucord/ui";

import MdArrowBack from "@material-design-icons/svg/filled/arrow_back.svg?component-solid";

import { FlowTitle } from "./Flow";
import { MailProvider } from "./MailProvider";

/**
 * Keep track of email within the same session
 */
let email = "postmaster@uwucord.wtf";

/**
 * Persist email information temporarily
 */
export function setFlowCheckEmail(e: string) {
  email = e;
}

/**
 * Flow to tell the user to check their email
 */
export default function FlowCheck() {
  const navigate = useNavigate();

  return (
    <>
      <FlowTitle
        subtitle={
          <Trans>
            We've sent you a verification email. Please allow up to 10 minutes
            for it to arrive.
          </Trans>
        }
        emoji="mail"
      >
        <Trans>Check your mail!</Trans>
      </FlowTitle>
      <Row align justify>
        <a href="..">
          <Button variant="plain">
            <MdArrowBack {...iconSize("1.2em")} /> <Trans>Back</Trans>
          </Button>
        </a>
        <Show when={email}>
          <MailProvider email={email} />
        </Show>
      </Row>
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
            navigate("/login/verify/abc", { replace: true });
          }}
        >
          Mock Verify
        </div>
      )}
    </>
  );
}
