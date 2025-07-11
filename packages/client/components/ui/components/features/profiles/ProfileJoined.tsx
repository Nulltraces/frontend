import { Show } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";
import { ServerMember, User } from "uwucord.js";

import { useTime } from "@uwucord/i18n";

import { Text } from "../../design";
import { OverflowingText } from "../../utils";

import { ProfileCard } from "./ProfileCard";

export function ProfileJoined(props: { user: User; member?: ServerMember }) {
  const dayjs = useTime();

  return (
    <ProfileCard>
      <Text class="title" size="large">
        <Trans>Joined</Trans>
      </Text>
      <Text class="label">
        <OverflowingText>uwucord</OverflowingText>
        {/* <Trans>Account Created</Trans> */}
      </Text>
      <Text>{dayjs(props.user.createdAt).format("DD MMM YYYY")}</Text>
      <Show when={props.member}>
        <Text class="label">
          <OverflowingText>{props.member!.server!.name}</OverflowingText>
          {/* <Trans>Member Since</Trans> */}
        </Text>
        <Text>{dayjs(props.member!.joinedAt).format("DD MMM YYYY")}</Text>
      </Show>
    </ProfileCard>
  );
}
