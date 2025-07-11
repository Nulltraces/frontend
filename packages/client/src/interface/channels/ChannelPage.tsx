import { Component, Match, Switch, createMemo } from "solid-js";

import { Channel } from "uwucord.js";
import { styled } from "styled-system/jsx";

import { useClient } from "@uwucord/client";
import { TextWithEmoji } from "@uwucord/markdown";
import { Navigate, useParams } from "@uwucord/routing";
import { Demo } from "@uwucord/rtc/Demo";
import { Header } from "@uwucord/ui";

import { AgeGate } from "./AgeGate";
import { ChannelHeader } from "./ChannelHeader";
import { TextChannel } from "./text/TextChannel";

/**
 * Channel layout
 */
const Base = styled("div", {
  base: {
    minWidth: 0,
    flexGrow: 1,
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
});

export interface ChannelPageProps {
  channel: Channel;
}

const TEXT_CHANNEL_TYPES: Channel["type"][] = [
  "TextChannel",
  "DirectMessage",
  "Group",
  "SavedMessages",
];

/**
 * Channel component
 */
export const ChannelPage: Component = () => {
  const params = useParams();
  const client = useClient();
  const channel = createMemo(() => client()!.channels.get(params.channel)!);

  return (
    <Base>
      <AgeGate
        enabled={channel().mature}
        contentId={channel().id}
        contentName={"#" + channel().name}
        contentType="channel"
      >
        <Switch fallback="Unknown channel type!">
          <Match when={!channel()}>
            <Navigate href={"../.."} />
          </Match>
          <Match when={TEXT_CHANNEL_TYPES.includes(channel()!.type)}>
            <TextChannel channel={channel()} />
          </Match>
          <Match when={channel()!.type === "VoiceChannel"}>
            <Header placement="primary">
              <ChannelHeader channel={channel()} />
            </Header>
            <Demo />
          </Match>
        </Switch>
      </AgeGate>
    </Base>
  );
};
