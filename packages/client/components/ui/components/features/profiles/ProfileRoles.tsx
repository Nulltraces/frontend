import { For, Show } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { ServerMember } from "uwucord.js";
import { styled } from "styled-system/jsx";

import { useModals } from "@uwucord/modal";

import { Ripple, Text, typography } from "../../design";
import { dismissFloatingElements } from "../../floating";
import { Row } from "../../layout";

import { ProfileCard } from "./ProfileCard";

export function ProfileRoles(props: { member?: ServerMember }) {
  const { openModal } = useModals();

  function openRoles() {
    openModal({ type: "user_profile_roles", member: props.member! });
    dismissFloatingElements();
  }

  return (
    <Show when={props.member?.roles.length}>
      <ProfileCard isLink onClick={openRoles}>
        <Ripple />

        <Text class="title" size="large">
          <Trans>Roles</Trans>
        </Text>
        <div use:invisibleScrollable>
          <For each={props.member!.orderedRoles.toReversed()}>
            {(role) => (
              <Row align>
                <Role>{role.name}</Role>
                <RoleIcon
                  style={{
                    background: role.colour ?? "var(--colours-foreground)",
                  }}
                />
              </Row>
            )}
          </For>
        </div>
      </ProfileCard>
    </Show>
  );
}

const Role = styled("span", {
  base: {
    flexGrow: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    ...typography.raw({ class: "label" }),
  },
});

const RoleIcon = styled("div", {
  base: {
    width: "8px",
    height: "8px",
    aspectRatio: "1/1",
    borderRadius: "100%",
  },
});
