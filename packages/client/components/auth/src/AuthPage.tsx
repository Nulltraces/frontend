import { BiLogosGithub, BiLogosMastodon, BiLogosTwitter } from "solid-icons/bi";
import { JSX } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { styled } from "styled-system/jsx";

import { Button, iconSize } from "@uwucord/ui";

import MdDarkMode from "@material-design-icons/svg/filled/dark_mode.svg?component-solid";

import background from "./background.jpg";
import { FlowBase } from "./flows/Flow";

/**
 * Authentication page layout
 */
const Base = styled("div", {
  base: {
    width: "100%",
    height: "100%",
    padding: "40px 35px",

    userSelect: "none",
    overflowY: "scroll",

    color: "white",
    background: "var(--colours-background)",
    // background: `var(--url)`,
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    mdDown: {
      padding: "30px 20px",
    },
  },
});

/**
 * Top and bottom navigation bars
 */
const Nav = styled("div", {
  base: {
    height: "32px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    color: "white",
    textDecoration: "none",

    md: {
      color: "var(--colours-foreground)",
    },
  },
});

/**
 * Navigation items
 */
const NavItems = styled("div", {
  base: {
    gap: "10px",
    display: "flex",
    alignItems: "center",

    fontSize: "0.9em",
  },
  variants: {
    variant: {
      default: {},
      stack: {
        md: {
          flexDirection: "column",
        },
      },
      hide: {
        md: {
          display: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * Link with an icon inside
 */
const LinkWithIcon = styled("a", {
  base: { height: "24px" },
});

/**
 * Middot-like bullet
 */
const Bullet = styled("div", {
  base: {
    height: "5px",
    width: "5px",
    background: "grey",
    borderRadius: "50%",

    md: {
      display: "none",
    },
  },
});

/**
 * uwucord Wordmark
 */
const Logo = styled("img", {
  base: {
    height: "24px",
  },
});

let a = false;

/**
 * Authentication page
 */
export function AuthPage(props: { children: JSX.Element }) {
  return (
    <Base style={{ "--url": `url('${background}')` }}>
      <Nav>
        <div />
        <Button
          size="icon"
          onPress={() => {
            a = !a;
            (window as any)._demo_setDarkMode(a);
          }}
        >
          <MdDarkMode {...iconSize("24px")} />
        </Button>
      </Nav>
      {/*<Nav>
        <Logo src={wideSvg} />
        <LocaleSelector />
      </Nav>*/}
      <FlowBase>{props.children}</FlowBase>
      <Nav>
        <NavItems variant="stack">
          <NavItems>
            <LinkWithIcon href="https://github.com/uwucordchat" target="_blank">
              <BiLogosGithub size={24} />
            </LinkWithIcon>
            <LinkWithIcon href="https://twitter.com/uwucordchat" target="_blank">
              <BiLogosTwitter size={24} />
            </LinkWithIcon>
            <LinkWithIcon
              href="https://mastodon.social/web/@uwucordchat"
              target="_blank"
            >
              <BiLogosMastodon size={24} />
            </LinkWithIcon>
          </NavItems>
          <Bullet />
          <NavItems>
            <a href="https://uwucord.chat/about" target="_blank">
              <Trans>About</Trans>
            </a>
            <a href="https://uwucord.chat/terms" target="_blank">
              <Trans>Terms of Service</Trans>
            </a>
            <a href="https://uwucord.chat/privacy" target="_blank">
              <Trans>Privacy Policy</Trans>
            </a>
          </NavItems>
        </NavItems>
        <NavItems variant="hide">
          <Trans>Image by {"@fakurian"}</Trans>
          <Bullet />
          <a href="https://unsplash.com/" target="_blank" rel="noreferrer">
            unsplash.com
          </a>
        </NavItems>
      </Nav>
    </Base>
  );
}
