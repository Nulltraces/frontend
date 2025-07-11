import { Match, Show, Switch } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { cva } from "styled-system/css";

import { useClientLifecycle } from "@uwucord/client";
import { TransitionType } from "@uwucord/client/Controller";
import { Navigate } from "@uwucord/routing";
import { Button, Column } from "@uwucord/ui";

import uwucordSvg from "../../../../public/assets/wordmark_wide_500px.svg?component-solid";

const logo = cva({
  base: {
    width: "100%",
    objectFit: "contain",
    fill: "var(--colours-messaging-message-box-foreground)",
  },
});

/**
 * Flow for logging into an account
 */
export default function FlowHome() {
  const { lifecycle, isLoggedIn, isError } = useClientLifecycle();

  return (
    <Switch
      fallback={
        <>
          <Show when={isLoggedIn()}>
            <Navigate href="/app" />
          </Show>

          <Column gap="xl">
            <uwucordSvg class={logo()} />

            <Column>
              <b
                style={{
                  "font-weight": 800,
                  "font-size": "1.4em",
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  "text-align": "center",
                }}
              >
                <span>
                  <Trans>
                    Find your com
                    <wbr />
                    munity,
                    <br />
                    connect with the world.
                  </Trans>
                </span>
              </b>
              <span style={{ "text-align": "center", opacity: "0.5" }}>
                <Trans>
                  uwucord is one of the best ways to stay connected with your
                  friends and community, anywhere, anytime.
                </Trans>
              </span>
            </Column>

            <Column>
              <a href="/login/auth">
                <Column>
                  <Button>
                    <Trans>Log In</Trans>
                  </Button>
                </Column>
              </a>
              <a href="/login/create">
                <Column>
                  <Button variant="secondary">
                    <Trans>Sign Up</Trans>
                  </Button>
                </Column>
              </a>
            </Column>
          </Column>
        </>
      }
    >
      <Match when={isError()}>
        <Switch fallback={"an unknown error occurred"}>
          <Match when={lifecycle.permanentError === "InvalidSession"}>
            <h1>
              <Trans>You were logged out!</Trans>
            </h1>
          </Match>
        </Switch>

        <Button
          variant="secondary"
          onPress={() =>
            lifecycle.transition({
              type: TransitionType.Dismiss,
            })
          }
        >
          <Trans>OK</Trans>
        </Button>
      </Match>
    </Switch>
  );
}
