import { Trans } from "@lingui-solid/solid/macro";

import {
  CategoryButton,
  CategoryButtonGroup,
  CategoryCollapse,
  Checkbox,
  iconSize,
} from "@uwucord/ui";

import MdMarkUnreadChatAlt from "@material-design-icons/svg/outlined/mark_unread_chat_alt.svg?component-solid";
import MdNotifications from "@material-design-icons/svg/outlined/notifications.svg?component-solid";
import MdSpeaker from "@material-design-icons/svg/outlined/speaker.svg?component-solid";

/**
 * Notifications Page
 */
export default function Notifications() {
  return (
    <CategoryButtonGroup>
      <CategoryButton
        action={<Checkbox value onChange={(value) => void value} />}
        onClick={() => void 0}
        icon={<MdNotifications {...iconSize(22)} />}
        description={
          <Trans>
            Receive notifications while the app is open and in the background.
          </Trans>
        }
      >
        <Trans>Enable Desktop Notifications</Trans>
      </CategoryButton>
      {/* <FormGroup>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon={<MdMarkUnreadChatAlt {...iconSize(22)} />}
          description={t(
            "app.settings.pages.notifications.descriptions.enable_push"
          )}
        >
          {t("app.settings.pages.notifications.enable_push")}
        </CategoryButton>
      </FormGroup> */}
      <CategoryCollapse
        title={<Trans>Sounds</Trans>}
        icon={<MdSpeaker {...iconSize(22)} />}
      >
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>Message Received</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>Message Sent</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>User Joined Call</Trans>
        </CategoryButton>
        <CategoryButton
          action={<Checkbox value onChange={(value) => void value} />}
          onClick={() => void 0}
          icon="blank"
        >
          <Trans>User Left Call</Trans>
        </CategoryButton>
      </CategoryCollapse>
    </CategoryButtonGroup>
  );
}
