import {
  DeviceViewPortType,
  OrientationType,
  SafeAreaFrameType,
  SafeAreaInsetsType,
} from './types';

export class ViewPortCalculator {
  private readonly deviceViewPort: DeviceViewPortType;
  private orientation: OrientationType = 'portrait';
  private widthFrame: number = 0;
  private heightFrame: number = 0;

  /**
   *
   * @param {deviceViewPort} deviceViewPort Current device ViewPort in portrait and landscape used in the design
   *
   */
  constructor(deviceViewPort: DeviceViewPortType) {
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

  public getOrientation = () => this.orientation;

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

  /**
   * Calculate proportional horizontal value
   * @param {number} horizontalValue Can be the value of any of the Horizontal units like: width, paddingLeft, paddingRight, marginLeft, marginRight, left, right of an element from the design
   *
   */
  public getHorizontal = (horizontalValue: number): number => this.calHorizontal(
    horizontalValue,
    this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL,
  );

  /**
   * Calculate proportional vertical value;
   * @param {number} verticalValue Can be the value of any of the Vertical units like: height, fontSize, paddingTop, paddingBottom, marginTop, marginBottom, top, bottom of an element from the design
   *
   */
  public getVertical = (verticalValue: number): number => this.calBox(
    verticalValue,
    verticalValue,
    this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL,
  ).height;

  /**
   * Calculate non proportional vertical values. Usually used when want to create full screen without scrolling.
   * @param {number} verticalValue Can be the value of any of the Vertical units like: height, fontSize, paddingTop, paddingBottom, marginTop, marginBottom, top, bottom of an element from the design
   *
   */
  public getVerticalNotProp = (verticalValue: number): number => this.calVertical(
    verticalValue,
    this.orientation === 'portrait' ? this.deviceViewPort.heightP : this.deviceViewPort.heightL,
  );

  /**
   * Calculate proportional box using with and height
   * @param {number} boxWidth width of box from the design
   * @param {number} boxHeight height of box from the design
   *
   */
  public getBox = (
    boxWidth: number,
    boxHeight: number,
  ): {width: number; height: number} => this.calBox(
    boxWidth,
    boxHeight,
    this.orientation === 'portrait' ? this.deviceViewPort.widthP : this.deviceViewPort.widthL,
  );
}
