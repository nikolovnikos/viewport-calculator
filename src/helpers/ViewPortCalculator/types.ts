export type DeviceType = 'phone' | 'tablet';
export type OrientationType = 'portrait' | 'landscape';

export type WithRequiredProperty<Type, Key extends keyof Type> = Pick<
  Type,
  Key
> & {
  [Property in Key]-?: Type[Property];
};

export interface DeviceViewPortType {
  widthP: number;
  heightP: number;
  widthL: number;
  heightL: number;
}

export type DevicesViewPortType = {[P in DeviceType]: DeviceViewPortType};

export type SafeAreaFrameType = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export type SafeAreaInsetsType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
