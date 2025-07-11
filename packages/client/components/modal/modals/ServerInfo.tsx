import { Trans } from "@lingui-solid/solid/macro";

import { useClient } from "@uwucord/client";
import { Markdown } from "@uwucord/markdown";
import { Modal2, Modal2Props } from "@uwucord/ui";

import { useModals } from "..";
import { Modals } from "../types";

export function ServerInfoModal(
  props: Modal2Props & Modals & { type: "server_info" },
) {
  const client = useClient();
  const { openModal } = useModals();

  return (
    <Modal2
      show={props.show}
      onClose={props.onClose}
      title={props.server.name}
      actions={[
        {
          text: <Trans>Settings</Trans>,
          onClick() {
            openModal({
              type: "settings",
              config: "server",
              context: props.server,
            });
          },
        },
        {
          text: <Trans>Edit Identity</Trans>,
          onClick() {
            openModal({
              type: "server_identity",
              member: props.server.member!,
            });
          },
        },
        {
          text: <Trans>Report</Trans>,
          onClick() {
            openModal({
              type: "report_content",
              client: client(),
              target: props.server,
            });
          },
        },
        { text: <Trans>Close</Trans> },
      ]}
    >
      <Markdown content={props.server.description!} />
    </Modal2>
  );
}
