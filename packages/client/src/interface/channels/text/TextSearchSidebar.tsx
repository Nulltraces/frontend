import { For, Show } from "solid-js";

import { useQuery } from "@tanstack/solid-query";
import { API, Channel } from "uwucord.js";

import { Message } from "@uwucord/app";
import { CircularProgress } from "@uwucord/ui";

/**
 * Message search sidebar
 */
export function TextSearchSidebar(props: {
  channel: Channel;
  query: Omit<API.DataMessageSearch, "include_users">;
}) {
  const query = useQuery(() => ({
    queryKey: ["search", props.channel.id, props.query],
    queryFn: () =>
      props.channel
        .searchWithUsers(props.query)
        .then((result) => result.messages),
  }));

  return (
    <>
      <Show when={query.isLoading}>
        <CircularProgress />
      </Show>
      <For each={query.data}>
        {(message) => (
          <a href={message.path}>
            <Message message={message} isLink />
          </a>
        )}
      </For>
    </>
  );
}
