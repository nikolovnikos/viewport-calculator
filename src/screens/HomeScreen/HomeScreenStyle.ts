import {useMemo, useRef} from 'react';
import {ViewStyle, TextStyle, StyleSheet} from 'react-native';

import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';

import {ViewPortCalculatedStyles} from '../../helpers/ViewPortCalculator/index';
import {IPHONE11_Safe, IPAD} from '../../statics/constant';
import {WithRequiredProperty} from '../../helpers/ViewPortCalculator/types';

/*
  Design links:
  1. phone - https://www.path_to_phone_design
  2. tablet - https://www.path_to_tablet_design
*/

type StyleProps = {
  title: WithRequiredProperty<TextStyle, 'fontSize'>;
  logo: WithRequiredProperty<ViewStyle, 'width' | 'height' | 'marginBottom'>;
  button: WithRequiredProperty<
    ViewStyle,
    'paddingVertical' | 'paddingHorizontal' | 'marginBottom'
  >;
  buttonText: WithRequiredProperty<TextStyle, 'fontSize'>;
  infoContainer: WithRequiredProperty<ViewStyle, 'width' | 'marginBottom'>;
  infoText: WithRequiredProperty<TextStyle, 'fontSize'>;
  footer: WithRequiredProperty<ViewStyle, 'paddingVertical' | 'width'>;
  footerText: WithRequiredProperty<TextStyle, 'fontSize'>;
};

class HomeStyle extends ViewPortCalculatedStyles<StyleProps> {
  calculatedStyles() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox({w: 200, h: 200}, {w: 150, h: 150}, {w: 250, h: 250}, {w: 300, h: 300});
    const v20 = getVertical(20, 10, 30, 30);
    const v10 = getVertical(10, 10, 20, 20);
    const v16 = getVertical(16, 14, 18, 18);

    const style: StyleProps = {
      title: {
        fontSize: getVertical(24, 24, 28, 28),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.width,
        marginBottom: v20,
      },
      button: {
        paddingVertical: v10,
        paddingHorizontal: getHorizontal(20, 20, 30, 30),
        marginBottom: v20,
      },
      buttonText: {
        fontSize: v16,
      },
      infoContainer: {
        width: getHorizontal(331, 640, 614, 819),
        marginBottom: v20,
      },
      infoText: {
        fontSize: v16,
      },
      footer: {
        paddingVertical: v10,
        width: getHorizontal(372, 720, 691, 921),
      },
      footerText: {
        fontSize: getVertical(18, 16, 20, 20),
      },
    };
    return style;
  }
}

const useHomeStyle = () => {
  const styleObject = useRef(
    new HomeStyle({
      phone: IPHONE11_Safe,
      tablet: IPAD,
    }),
  ).current;

  const safeAreaFrame = useSafeAreaFrame();
  const safeAreaInsets = useSafeAreaInsets();

  const style = useMemo(() => {
    return styleObject.getStyles(safeAreaFrame, safeAreaInsets);
  }, [safeAreaFrame, safeAreaInsets, styleObject]);

  return {
    style: StyleSheet.create(style),
  };
};

export default useHomeStyle;
