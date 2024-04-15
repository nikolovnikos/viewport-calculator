import {
  DeviceViewPortType,
  OrientationType,
  SafeAreaFrameType,
  SafeAreaInsetsType,
  DeviceType,
  BoxType
} from './types';

export class ViewPortCalculator {
  private readonly deviceViewPort: DeviceViewPortType;
  private orientation: OrientationType = 'portrait';
  private widthFrame: number = 0;
  private heightFrame: number = 0;
  private readonly deviceType: DeviceType;

  /**
   *
   * @param {deviceViewPort} deviceViewPort Current device ViewPort in portrait and landscape used in the design
   * @param {deviceType} deviceType type of the current device (phone or tablet)
   *
   */
  constructor(deviceViewPort: DeviceViewPortType, deviceType: DeviceType) {
    this.deviceType = deviceType;
    this.deviceViewPort = deviceViewPort;
  }

  public setCurrentDeviceViewPort = (
    safeAreaFrame: SafeAreaFrameType,
    safeAreaInsets: SafeAreaInsetsType,
  ) => {
    const {width, height} = safeAreaFrame;
    const {top, bottom, left, right} = safeAreaInsets;

    this.orientation = height > width ? 'portrait' : 'landscape';
    this.heightFrame = height - (top + bottom);
    this.widthFrame = width - (left + right);
  };

  private readonly calHorizontal = (
    value: number,
    deviceViewPortWidth: number,
  ): number => {
    const ratio = this.widthFrame / deviceViewPortWidth;
    return value * ratio;
  };

  private readonly calVertical = (
    value: number,
    deviceViewPortHeight: number,
  ): number => {
    const ratio = this.heightFrame / deviceViewPortHeight;
    return value * ratio;
  };

  private readonly calBox = (
    width: number,
    height: number,
    deviceViewPortWidth: number,
  ): {width: number; height: number} => {
    const ratio = width / height;
    const w = this.calHorizontal(width, deviceViewPortWidth);
    const h = w / ratio;
    return {width: w, height: h};
  };

  private readonly getDesignValue = (
    valuePhoneP: number,
    valuePhoneL?: number,
    valueTabletP?: number,
    valueTabletL?: number,
  ) => {
    let value: number;
    if (this.deviceType === 'phone') {
      value = this.orientation === 'portrait' ? valuePhoneP : (valuePhoneL ?? valuePhoneP);
    } else {
      value = this.orientation === 'portrait' ? (valueTabletP ?? valuePhoneP) : (valueTabletL ?? (valueTabletP ?? valuePhoneP));
    }
    return value;
  };

  /**
   * Calculate proportional horizontal value.
   * Can be the value of any of the horizontal units like: width, paddingLeft, paddingRight, marginLeft, marginRight, left, right of an element from the design
   * @param {number} valuePhoneP horizontal unit from the phone portrait design
   * @param {number} valuePhoneL horizontal unit from the phone landscape design
   * @param {number} valueTabletP horizontal unit from the tablet portrait design
   * @param {number} valueTabletL horizontal unit from the tablet landscape design
   */
  public getHorizontal = (
    valuePhoneP: number,
    valuePhoneL?: number,
    valueTabletP?: number,
    valueTabletL?: number,
  ): number => {
    return this.calHorizontal(
      this.getDesignValue(valuePhoneP, valuePhoneL, valueTabletP, valueTabletL),
      this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL,
    )
  }
  /**
   * Calculate non proportional vertical values.
   * Can be the used for any of the vertical units like: height, fontSize, paddingTop, paddingBottom, marginTop, marginBottom, top, bottom of an element from the design
   * @param {number} valuePhoneP vertical unit from the phone portrait design
   * @param {number} valuePhoneL vertical unit from the phone landscape design
   * @param {number} valueTabletP vertical unit from the tablet portrait design
   * @param {number} valueTabletL vertical unit from the tablet landscape design
   */
  public getVertical = (
    valuePhoneP: number,
    valuePhoneL?: number,
    valueTabletP?: number,
    valueTabletL?: number,
  ) : number => {
    const value = this.getDesignValue(valuePhoneP, valuePhoneL, valueTabletP, valueTabletL)
    return this.calBox(
      value,
      value,
      this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL,
    ).height;
  }

  /**
   * Calculate non proportional vertical values. Usually used when want to create full screen without scrolling.
   * Can be the used for any of the vertical units like: height, fontSize, paddingTop, paddingBottom, marginTop, marginBottom, top, bottom of an element from the design
   * @param {number} valuePhoneP vertical unit from the phone portrait design
   * @param {number} valuePhoneL vertical unit from the phone landscape design
   * @param {number} valueTabletP vertical unit from the tablet portrait design
   * @param {number} valueTabletL vertical unit from the tablet landscape design
   */
  public getVerticalNotProp = (
    valuePhoneP: number,
    valuePhoneL?: number,
    valueTabletP?: number,
    valueTabletL?: number,
  ): number => {
    return this.calVertical(
      this.getDesignValue(valuePhoneP, valuePhoneL, valueTabletP, valueTabletL),
      this.orientation === 'portrait' ? this.deviceViewPort.heightP : this.deviceViewPort.heightL,
    )
  }

  /**
   * Calculate proportional box using with and height from the designs.
   * @param {BoxType} boxPhoneP width and hight of the box from the phone portrait design
   * @param {BoxType} boxPhoneL width and hight of the box from the phone landscape design
   * @param {BoxType} boxTabletP width and hight of the box from the tablet portrait design
   * @param {BoxType} boxTabletL width and hight of the box from the tablet landscape design
   */
  public getBox = (
    boxPhoneP: BoxType,
    boxPhoneL?: BoxType,
    boxTabletP?: BoxType,
    boxTabletL?: BoxType,
  ): {width: number; height: number} => {
    let box: BoxType;
    if (this.deviceType === 'phone') {
      box = this.orientation === 'portrait' ? boxPhoneP : (boxPhoneL ?? boxPhoneP);
    } else {
      box = this.orientation === 'portrait' ? (boxTabletP ?? boxPhoneP) : (boxTabletL ?? (boxTabletP ?? boxPhoneP));
    }
    return this.calBox(
      box[0],
      box[1],
      this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL);
  };
}
