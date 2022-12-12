import {memo, ReactElement, RefObject, useCallback} from "react";
import {ScrollView} from "react-native";

import {secondaryColors} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import {__t} from "../../i18";

import {buttonsStyles} from "./styles";


type _Props = {
  scrollRef: RefObject<ScrollView>,
};

function AddSkillButton({scrollRef}: _Props): ReactElement {
  const gotoAddSkill = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: true});
    }
  }, [scrollRef]);

  return (
    <Div
      onPress={gotoAddSkill}
      style={buttonsStyles.allButtons}
      theme={secondaryColors.background}>
      <Span
        colorName={"text"}
        style={buttonsStyles.text}
        lines={2}>
        {__t("workouts.addSkill").split(" ").join("\n")}
      </Span>
    </Div>
  );
}

export default memo(AddSkillButton);
