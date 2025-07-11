import { createFormControl, createFormGroup } from "solid-forms";
import { createMemo, createSignal } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { t } from "@lingui/core/macro";
import { useMutation } from "@tanstack/solid-query";
import { css } from "styled-system/css";

import { useClient } from "@uwucord/client";
import {
  Avatar,
  Column,
  Form2,
  Modal2,
  Modal2Props,
  Row,
  Text,
  TextField,
} from "@uwucord/ui";

import { useModals } from "..";
import { Modals } from "../types";

/**
 * Create a new group and optionally add members
 */
export function CreateGroupModal(
  props: Modal2Props & Modals & { type: "create_group" },
) {
  const client = useClient();
  const { openModal } = useModals();

  const group = createFormGroup({
    name: createFormControl(""),
    users: createFormControl([] as string[]),
  });

  const change = useMutation(() => ({
    mutationFn: ({ name, users }: { name: string; users: string[] }) =>
      props.client.channels.createGroup(name, users),
    onError: (error) => openModal({ type: "error2", error }),
  }));

  async function onSubmit() {
    await change.mutateAsync({
      name: group.controls.name.value,
      users: group.controls.users.value,
    });

    props.onClose();
  }

  const [filter, setFilter] = createSignal("");

  const filterLowercase = createMemo(() => filter().toLowerCase());

  const users = createMemo(() =>
    client()
      .users.filter((user) => user.relationship === "Friend")
      .filter((user) =>
        user.displayName.toLowerCase().includes(filterLowercase()),
      )
      .toSorted((a, b) => a.displayName.localeCompare(b.displayName))
      .map((user) => ({ item: user, value: user.id })),
  );

  return (
    <Modal2
      minWidth={420}
      show={props.show}
      onClose={props.onClose}
      title={<Trans>Create a new group</Trans>}
      actions={[
        { text: <Trans>Close</Trans> },
        {
          text: <Trans>Create</Trans>,
          onClick: () => {
            onSubmit();
            return false;
          },
        },
      ]}
      isDisabled={change.isPending}
    >
      <form onSubmit={Form2.submitHandler(group, onSubmit)}>
        <Column>
          <Form2.TextField
            name="name"
            control={group.controls.name}
            label={t`Group Name`}
          />

          <Text class="label">
            <Trans>Select members to add</Trans>
          </Text>

          <TextField
            value={filter()}
            variant="outlined"
            placeholder={t`Search for users...`}
            onKeyUp={(e) => setFilter(e.currentTarget.value)}
          />

          <Form2.VirtualSelect items={users()} control={group.controls.users}>
            {(item) => (
              <Row align>
                <Avatar
                  src={item.animatedAvatarURL}
                  fallback={item.displayName}
                  size={24}
                />{" "}
                <span>{item.displayName}</span>
              </Row>
            )}
          </Form2.VirtualSelect>
        </Column>
      </form>
    </Modal2>
  );
}
