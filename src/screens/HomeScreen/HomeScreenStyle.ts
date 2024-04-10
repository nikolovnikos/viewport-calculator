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
    const v10 = getVertical(10);
    const v16 = getVertical(16);
    const v20 = getVertical(20);

    const style: StyleProps = {
      title: {
        fontSize: getVertical(24),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.width,
        marginBottom: v20,
      },
      button: {
        paddingVertical: v10,
        paddingHorizontal: getHorizontal(20),
        marginBottom: v20,
      },
      buttonText: {
        fontSize: v16,
      },
      infoContainer: {
        width: getHorizontal(331),
        marginBottom: v20,
      },
      infoText: {
        fontSize: v16,
      },
      footer: {
        paddingVertical: v10,
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
    const v10 = getVertical(10);
    const v18 = getVertical(18);
  
    const style: StyleProps = {
      title: {
        fontSize: getVertical(26),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: v10,
      },
      button: {
        paddingVertical: v10,
        paddingHorizontal: getHorizontal(20),
        marginBottom: v10,
      },
      buttonText: {
        fontSize: v18,
      },
      infoContainer: {
        width: getHorizontal(640), // 80%
        marginBottom: v10,
      },
      infoText: {
        fontSize: v18,
      },
      footer: {
        paddingVertical: v10,
        width: getHorizontal(720), // 90%
      },
      footerText: {
        fontSize: v18,
      },
    };
    return style;
  }
  tabletStylesPortrait() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(250, 250);
    const v18 = getVertical(18);
    const v20 = getVertical(20);
    const v30 = getVertical(30);

    const style: StyleProps = {
      title: {
        fontSize: getVertical(28),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: v30,
      },
      button: {
        paddingVertical: v20,
        paddingHorizontal: getHorizontal(30),
        marginBottom: v30,
      },
      buttonText: {
        fontSize: v18,
      },
      infoContainer: {
        width: getHorizontal(614),
        marginBottom: v30,
      },
      infoText: {
        fontSize: v18,
      },
      footer: {
        paddingVertical: v20,
        width: getHorizontal(691),
      },
      footerText: {
        fontSize: v20,
      },
    };
    return style;
  }
  tabletStylesLandscape() {
    const {getBox, getVertical, getHorizontal} = this.calculator;
    const logoBox = getBox(300, 300);
    const v18 = getVertical(18);
    const v20 = getVertical(20);
    const v30 = getVertical(30);

    const style: StyleProps = {
      title: {
        fontSize: getVertical(28),
      },
      logo: {
        width: logoBox.width,
        height: logoBox.height,
        marginBottom: v30,
      },
      button: {
        paddingVertical: v20,
        paddingHorizontal: getHorizontal(30),
        marginBottom: v30,
      },
      buttonText: {
        fontSize: v18,
      },
      infoContainer: {
        width: getHorizontal(819),
        marginBottom: v30,
      },
      infoText: {
        fontSize: v18,
      },
      footer: {
        paddingVertical: v20,
        width: getHorizontal(921),
      },
      footerText: {
        fontSize: v20,
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
