import { Match, Show, Switch } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { cva } from "styled-system/css";
import { styled } from "styled-system/jsx";

import { IS_DEV, useClient } from "@uwucord/client";
import { CONFIGURATION } from "@uwucord/common";
import { useModals } from "@uwucord/modal";
import { useNavigate } from "@uwucord/routing";
import {
  Button,
  CategoryButton,
  Column,
  Header,
  iconSize,
  main,
  typography,
} from "@uwucord/ui";

import MdAddCircle from "@material-design-icons/svg/filled/add_circle.svg?component-solid";
import MdExplore from "@material-design-icons/svg/filled/explore.svg?component-solid";
import MdGroups3 from "@material-design-icons/svg/filled/groups_3.svg?component-solid";
import MdHome from "@material-design-icons/svg/filled/home.svg?component-solid";
import MdPayments from "@material-design-icons/svg/filled/payments.svg?component-solid";
import MdRateReview from "@material-design-icons/svg/filled/rate_review.svg?component-solid";
import MdSettings from "@material-design-icons/svg/filled/settings.svg?component-solid";

import uwucordSvg from "../../public/assets/wordmark_wide_500px.svg?component-solid";

import { HeaderIcon } from "./common/CommonHeader";

const Logo = styled(uwucordSvg, {
  base: {
    fill: "var(--md-sys-color-on-surface)",
  },
});

/**
 * Base layout of the home page (i.e. the header/background)
 */
const Base = styled("div", {
  base: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

/**
 * Layout of the content as a whole
 */
const content = cva({
  base: {
    ...main.raw(),

    padding: "48px 0",

    gap: "32px",
    alignItems: "center",
    justifyContent: "center",
  },
});

/**
 * Layout of the buttons
 */
const Buttons = styled("div", {
  base: {
    gap: "8px",
    padding: "8px",
    display: "flex",
    borderRadius: "var(--borderRadius-lg)",

    color: "var(--md-sys-color-on-surface-variant)",
    background: "var(--md-sys-color-surface-variant)",
  },
});

/**
 * Make sure the columns are separated
 */
const SeparatedColumn = styled(Column, {
  base: {
    justifyContent: "stretch",
    marginInline: "0.25em",
    width: "260px",
    "& > *": {
      flexGrow: 1,
    },
  },
});

/**
 * Make sure the image is separated from the welcome text
 */
const Image = styled("img", {
  base: {
    marginTop: "0.5em",
    height: "36px",
    filter: "var(--effects-invert-black)",
  },
});

/**
 * Home page
 */
export function HomePage() {
  const { openModal } = useModals();
  const navigate = useNavigate();
  const client = useClient();

  // check if we're uwucord.chat; if so, check if the user is in the Lounge
  const showLoungeButton = CONFIGURATION.IS_uwucord;
  const isInLounge =
    client()!.servers.get("01F7ZSBSFHQ8TA81725KQCSDDP") !== undefined;

  return (
    <Base>
      <Header placement="primary">
        <HeaderIcon>
          <MdHome {...iconSize(22)} />
        </HeaderIcon>
        <Trans>Home</Trans>
      </Header>
      <div use:scrollable={{ class: content() }}>
        <Column>
          <span class={typography({ class: "headline" })}>
            <Trans>Welcome to</Trans>
          </span>
          <Logo />
        </Column>
        <Buttons>
          <SeparatedColumn>
            <CategoryButton
              onClick={() =>
                openModal({
                  type: "create_group",
                  client: client()!,
                })
              }
              description={
                <Trans>
                  Invite all of your friends, some cool bots, and throw a big
                  party.
                </Trans>
              }
              icon={<MdAddCircle />}
            >
              <Trans>Create a group</Trans>
            </CategoryButton>
            <Switch fallback={null}>
              <Match when={showLoungeButton && isInLounge}>
                <CategoryButton
                  onClick={() => navigate("/server/01F7ZSBSFHQ8TA81725KQCSDDP")}
                  description={
                    <Trans>
                      You can report issues and discuss improvements with us
                      directly here.
                    </Trans>
                  }
                  icon={<MdGroups3 />}
                >
                  <Trans>Go to the testers server</Trans>
                </CategoryButton>
              </Match>
              <Match when={showLoungeButton && !isInLounge}>
                <CategoryButton
                  description={
                    <Trans>
                      You can report issues and discuss improvements with us
                      directly here.
                    </Trans>
                  }
                  icon={<MdGroups3 />}
                >
                  <Trans>Go to the testers server</Trans>
                </CategoryButton>
              </Match>
            </Switch>
            <CategoryButton
              onClick={() =>
                window.open(
                  "https://wiki.uwucord.chat/notes/project/financial-support/",
                )
              }
              description={
                <Trans>Support the project by donating - thank you!</Trans>
              }
              icon={<MdPayments />}
            >
              <Trans>Donate to uwucord</Trans>
            </CategoryButton>
          </SeparatedColumn>
          <SeparatedColumn>
            <Show when={CONFIGURATION.IS_uwucord}>
              <CategoryButton
                onClick={() => navigate("/discover")}
                description={
                  <Trans>
                    Find a community based on your hobbies or interests.
                  </Trans>
                }
                icon={<MdExplore />}
              >
                <Trans>Discover uwucord</Trans>
              </CategoryButton>
            </Show>
            <CategoryButton
              description={
                <Trans>
                  Let us know how we can improve our app by giving us feedback.
                </Trans>
              }
              icon={<MdRateReview {...iconSize(22)} />}
            >
              <Trans>Give feedback on uwucord</Trans>
            </CategoryButton>
            <CategoryButton
              onClick={() => openModal({ type: "settings", config: "user" })}
              description={
                <Trans>
                  You can also right-click the user icon in the top left, or
                  left click it if you're already home.
                </Trans>
              }
              icon={<MdSettings />}
            >
              <Trans>Open settings</Trans>
            </CategoryButton>
          </SeparatedColumn>
        </Buttons>
        <Show when={IS_DEV}>
          <Button onPress={() => navigate("/dev")}>
            Open Development Page
          </Button>
        </Show>
      </div>
    </Base>
  );
}
