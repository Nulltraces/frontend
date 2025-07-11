import { Trans } from "@lingui-solid/solid/macro";

import { Markdown } from "@uwucord/markdown";
import { Modal2, Modal2Props } from "@uwucord/ui";

import { Modals } from "../types";

export function ChannelInfoModal(
  props: Modal2Props & Modals & { type: "channel_info" },
) {
  return (
    <Modal2
      show={props.show}
      onClose={props.onClose}
      title={`#${props.channel.name}`}
      actions={[{ text: <Trans>Close</Trans> }]}
    >
      <Markdown content={props.channel.description!} />
    </Modal2>
  );
}
