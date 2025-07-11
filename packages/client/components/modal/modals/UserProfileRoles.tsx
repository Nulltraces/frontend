import { For, Match, Switch } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { styled } from "styled-system/jsx";

import { Checkbox2, Column, Modal2, Modal2Props, Row } from "@uwucord/ui";

import { Modals } from "../types";

export function UserProfileRolesModal(
  props: Modal2Props & Modals & { type: "user_profile_roles" },
) {
  const editMode = () =>
    props.member.server?.owner?.self ||
    (props.member.server?.havePermission("AssignRoles") &&
      props.member.inferiorTo(props.member.server.member!));

  return (
    <Modal2
      minWidth={420}
      show={props.show}
      onClose={props.onClose}
      title={
        <Switch fallback={<Trans>{props.member.displayName}'s roles</Trans>}>
          <Match when={editMode()}>
            <Trans>Edit {props.member.displayName}'s roles</Trans>
          </Match>
        </Switch>
      }
      actions={[{ text: <Trans>Close</Trans> }]}
    >
      <Switch
        fallback={
          // view mode only
          <For each={props.member.orderedRoles.toReversed()}>
            {(role) => (
              <Row align>
                <RoleName>{role.name}</RoleName>
                <RoleIcon
                  style={{
                    background: role.colour ?? "var(--colours-foreground)",
                  }}
                />
              </Row>
            )}
          </For>
        }
      >
        <Match when={editMode()}>
          <Column>
            <For each={props.member.server?.orderedRoles}>
              {(role) => (
                <Checkbox2
                  checked={props.member.roles.includes(role.id)}
                  disabled={
                    // this needs a better API
                    // not sure if this actually works
                    (role.rank ?? 0) <
                    (props.member.server?.member?.orderedRoles.toReversed()[0]
                      ?.rank ?? 0)
                  }
                  onChange={() =>
                    props.member.edit({
                      roles: [
                        ...props.member.roles.filter(
                          (roleId) => roleId !== role.id,
                        ),
                        ...(props.member.roles.includes(role.id)
                          ? []
                          : [role.id]),
                      ],
                    })
                  }
                >
                  <Row align grow>
                    <RoleName>{role.name}</RoleName>
                    <RoleIcon
                      style={{
                        background: role.colour ?? "var(--colours-foreground)",
                      }}
                    />
                  </Row>
                </Checkbox2>
              )}
            </For>
          </Column>
        </Match>
      </Switch>
    </Modal2>
  );
}

const RoleName = styled("span", {
  base: {
    flexGrow: 1,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const RoleIcon = styled("div", {
  base: {
    width: "16px",
    height: "16px",
    aspectRatio: "1/1",
    borderRadius: "100%",
  },
});
