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
  phoneStylesPortrait() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(200, 200);
    const style: StyleProps = {
      title: {
        fontSize: getVertical(24),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.width,
        marginBottom: getVertical(20),
      },
      button: {
        paddingVertical: getVertical(10),
        paddingHorizontal: getHorizontal(20),
        marginBottom: getVertical(20),
      },
      buttonText: {
        fontSize: getVertical(16),
      },
      infoContainer: {
        width: getHorizontal(331),
        marginBottom: getVertical(20),
      },
      infoText: {
        fontSize: getVertical(16),
      },
      footer: {
        paddingVertical: getVertical(10),
        width: getHorizontal(372),
      },
      footerText: {
        fontSize: getVertical(18),
      },
    };
    return style;
  }
  phoneStylesLandscape() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(150, 150);
    const style: StyleProps = {
      title: {
        fontSize: getVertical(26),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: getVertical(10),
      },
      button: {
        paddingVertical: getVertical(10),
        paddingHorizontal: getHorizontal(20),
        marginBottom: getVertical(10),
      },
      buttonText: {
        fontSize: getVertical(18),
      },
      infoContainer: {
        width: getHorizontal(640), // 80%
        marginBottom: getVertical(10),
      },
      infoText: {
        fontSize: getVertical(18),
      },
      footer: {
        paddingVertical: getVertical(10),
        width: getHorizontal(720), // 90%
      },
      footerText: {
        fontSize: getVertical(18),
      },
    };
    return style;
  }
  tabletStylesPortrait() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(250, 250);
    const style: StyleProps = {
      title: {
        fontSize: getVertical(28),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: getVertical(30),
      },
      button: {
        paddingVertical: getVertical(20),
        paddingHorizontal: getHorizontal(30),
        marginBottom: getVertical(30),
      },
      buttonText: {
        fontSize: getVertical(18),
      },
      infoContainer: {
        width: getHorizontal(614),
        marginBottom: getVertical(30),
      },
      infoText: {
        fontSize: getVertical(18),
      },
      footer: {
        paddingVertical: getVertical(20),
        width: getHorizontal(691),
      },
      footerText: {
        fontSize: getVertical(20),
      },
    };
    return style;
  }
  tabletStylesLandscape() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(300, 300);
    const style: StyleProps = {
      title: {
        fontSize: getVertical(28),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: getVertical(30),
      },
      button: {
        paddingVertical: getVertical(20),
        paddingHorizontal: getHorizontal(30),
        marginBottom: getVertical(30),
      },
      buttonText: {
        fontSize: getVertical(18),
      },
      infoContainer: {
        width: getHorizontal(819),
        marginBottom: getVertical(30),
      },
      infoText: {
        fontSize: getVertical(18),
      },
      footer: {
        paddingVertical: getVertical(20),
        width: getHorizontal(921),
      },
      footerText: {
        fontSize: getVertical(20),
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
