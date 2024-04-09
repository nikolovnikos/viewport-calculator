import {
  DevicesViewPortType,
  DeviceType,
  SafeAreaFrameType,
  SafeAreaInsetsType,
} from './types';
import {ViewPortCalculator} from './ViewPortCalculator';
import DeviceInfo from 'react-native-device-info';

export abstract class ViewPortCalculatedStyles<S> {
  private readonly devicesViewPort: DevicesViewPortType;
  protected calculator: ViewPortCalculator;
  private readonly deviceType: DeviceType;

  /**
   *
   * @param {devicesViewPort} devicesViewPort Object of devices's (phone and tablet) ViewPort used in the design
   */
  constructor(devicesViewPort: DevicesViewPortType) {
    this.deviceType = DeviceInfo.isTablet() ? 'tablet' : 'phone';
    this.devicesViewPort = devicesViewPort;
    this.calculator = this.getCalculator();
  }

  protected abstract phoneStylesPortrait(): S;
  protected abstract phoneStylesLandscape(): S;
  protected abstract tabletStylesPortrait(): S;
  protected abstract tabletStylesLandscape(): S;

  private getPhone(): S {
    if (this.calculator.getOrientation() === 'portrait') {
      return this.phoneStylesPortrait();
    }
    return this.phoneStylesLandscape();
  }

  private getTablet(): S {
    if (this.calculator.getOrientation() === 'portrait') {
      return this.tabletStylesPortrait();
    }
    return this.tabletStylesLandscape();
  }

  private getCalculator(): ViewPortCalculator {
    return new ViewPortCalculator(this.devicesViewPort[this.deviceType]);
  }

  /**
   * Get Calculated styles based on current device type and orientation
   * @param {safeAreaFrame} safeAreaFrame { width: number, height: number, x: number, y: number }
   * @param {safeAreaInsets} safeAreaInsets { top: number, bottom: number, left: number, right: number}
   */
  getStyles(
    safeAreaFrame: SafeAreaFrameType,
    safeAreaInsets: SafeAreaInsetsType,
  ): S {
    this.calculator.setCurrentDeviceViewPort(safeAreaFrame, safeAreaInsets);
    let style: S;
    switch (this.deviceType) {
      case 'phone':
        style = this.getPhone();
        break;
      case 'tablet':
        style = this.getTablet();
        break;
      default:
        style = this.getPhone();
        break;
    }
    return style;
  }
}
