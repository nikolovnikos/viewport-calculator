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
    const style: StyleProps = {
      title: {
        fontSize: this.calculator.getVertical(24),
      },
      logo: {
        width: this.calculator.getHorizontal(200),
        height: this.calculator.getVertical(200),
        marginBottom: this.calculator.getVertical(20),
      },
      button: {
        paddingVertical: this.calculator.getVertical(10),
        paddingHorizontal: this.calculator.getHorizontal(20),
        marginBottom: this.calculator.getVertical(20),
      },
      buttonText: {
        fontSize: this.calculator.getVertical(16),
      },
      infoContainer: {
        width: this.calculator.getHorizontal(331),
        marginBottom: this.calculator.getVertical(20),
      },
      infoText: {
        fontSize: this.calculator.getVertical(16),
      },
      footer: {
        paddingVertical: this.calculator.getVertical(10),
        width: this.calculator.getHorizontal(372),
      },
      footerText: {
        fontSize: this.calculator.getVertical(18),
      },
    };
    return style;
  }
  phoneStylesLandscape() {
    const style: StyleProps = {
      title: {
        fontSize: this.calculator.getVertical(26),
      },
      logo: {
        width: this.calculator.getHorizontal(150),
        height: this.calculator.getVertical(150),
        marginBottom: this.calculator.getVertical(10),
      },
      button: {
        paddingVertical: this.calculator.getVertical(10),
        paddingHorizontal: this.calculator.getHorizontal(20),
        marginBottom: this.calculator.getVertical(10),
      },
      buttonText: {
        fontSize: this.calculator.getVertical(18),
      },
      infoContainer: {
        width: this.calculator.getHorizontal(640), // 80%
        marginBottom: this.calculator.getVertical(10),
      },
      infoText: {
        fontSize: this.calculator.getVertical(18),
      },
      footer: {
        paddingVertical: this.calculator.getVertical(10),
        width: this.calculator.getHorizontal(720), // 90%
      },
      footerText: {
        fontSize: this.calculator.getVertical(18),
      },
    };
    return style;
  }
  tabletStylesPortrait() {
    const style: StyleProps = {
      title: {
        fontSize: this.calculator.getVertical(28),
      },
      logo: {
        width: this.calculator.getHorizontal(250),
        height: this.calculator.getVertical(250),
        marginBottom: this.calculator.getVertical(30),
      },
      button: {
        paddingVertical: this.calculator.getVertical(20),
        paddingHorizontal: this.calculator.getHorizontal(30),
        marginBottom: this.calculator.getVertical(30),
      },
      buttonText: {
        fontSize: this.calculator.getVertical(18),
      },
      infoContainer: {
        width: this.calculator.getHorizontal(614),
        marginBottom: this.calculator.getVertical(30),
      },
      infoText: {
        fontSize: this.calculator.getVertical(18),
      },
      footer: {
        paddingVertical: this.calculator.getVertical(20),
        width: this.calculator.getHorizontal(691),
      },
      footerText: {
        fontSize: this.calculator.getVertical(20),
      },
    };
    return style;
  }
  tabletStylesLandscape() {
    const style: StyleProps = {
      title: {
        fontSize: this.calculator.getVertical(28),
      },
      logo: {
        width: this.calculator.getHorizontal(300),
        height: this.calculator.getVertical(300),
        marginBottom: this.calculator.getVertical(30),
      },
      button: {
        paddingVertical: this.calculator.getVertical(20),
        paddingHorizontal: this.calculator.getHorizontal(30),
        marginBottom: this.calculator.getVertical(30),
      },
      buttonText: {
        fontSize: this.calculator.getVertical(18),
      },
      infoContainer: {
        width: this.calculator.getHorizontal(819),
        marginBottom: this.calculator.getVertical(30),
      },
      infoText: {
        fontSize: this.calculator.getVertical(18),
      },
      footer: {
        paddingVertical: this.calculator.getVertical(20),
        width: this.calculator.getHorizontal(921),
      },
      footerText: {
        fontSize: this.calculator.getVertical(20),
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
