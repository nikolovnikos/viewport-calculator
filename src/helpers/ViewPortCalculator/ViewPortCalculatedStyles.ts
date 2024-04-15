import {
  DevicesViewPortType,
  DeviceType,
  SafeAreaFrameType,
  SafeAreaInsetsType,
} from './types';
import {ViewPortCalculator} from './ViewPortCalculator';
import DeviceInfo from 'react-native-device-info';

export abstract class ViewPortCalculatedStyles<S> {
  protected calculator: ViewPortCalculator;

  /**
   *
   * @param {devicesViewPort} devicesViewPort Object of devices's (phone and tablet) ViewPort used in the design
   */
  constructor(devicesViewPort: DevicesViewPortType) {
    const deviceType: DeviceType = DeviceInfo.isTablet() ? 'tablet' : 'phone';
    this.calculator = new ViewPortCalculator(devicesViewPort[deviceType], deviceType);
  }

  protected abstract calculatedStyles(): S;

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
    return this.calculatedStyles();
  }
}
