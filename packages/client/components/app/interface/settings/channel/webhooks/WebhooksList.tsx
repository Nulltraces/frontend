import { BiSolidCloud } from "solid-icons/bi";
import { For, Match, Show, Switch, createMemo, onMount } from "solid-js";

import { Trans } from "@lingui-solid/solid/macro";

import { useClient } from "@uwucord/client";
import { useModals } from "@uwucord/modal";
import { Avatar, CategoryButton, Column, Preloader } from "@uwucord/ui";

import { ChannelSettingsProps } from "../../ChannelSettings";
import { useSettingsNavigation } from "../../Settings";

/**
 * Webhooks
 */
export function WebhooksList(props: ChannelSettingsProps) {
  const client = useClient();
  const { openModal } = useModals();
  const { navigate } = useSettingsNavigation();

  const webhooks = createMemo(() =>
    client().channelWebhooks.filter(
      (webhook) => webhook.channelId === props.channel.id,
    ),
  );

  onMount(() => {
    if (!webhooks.length) {
      props.channel.fetchWebhooks();
    }
  });

  return (
    <Column gap="lg">
      <CategoryButton
        action="chevron"
        icon={<BiSolidCloud size={24} />}
        onClick={() =>
          openModal({
            type: "create_webhook",
            channel: props.channel,
            callback(webhookId) {
              navigate(`webhooks/${webhookId}`);
            },
          })
        }
      >
        <Trans>Create Webhook</Trans>
      </CategoryButton>

      <Show when={!webhooks() || webhooks()!.length !== 0}>
        <Column>
          <Switch fallback={<Preloader type="ring" />}>
            <Match when={webhooks()?.length}>
              <For each={webhooks()}>
                {(webhook) => (
                  <CategoryButton
                    icon={
                      <Avatar
                        src={webhook.avatarURL}
                        fallback={webhook.name}
                        size={24}
                      />
                    }
                    description={webhook.id}
                    onClick={() => navigate(`webhooks/${webhook.id}`)}
                    action="chevron"
                  >
                    {webhook.name}
                  </CategoryButton>
                )}
              </For>
            </Match>
          </Switch>
        </Column>
      </Show>
    </Column>
  );
}
