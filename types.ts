export interface drone {
  altitude: string;
  firmware: string;
  ipv4: string;
  ipv6: string;
  mac: string;
  manufacturer: string;
  model: string;
  positionX: string;
  positionY: string;
  serialNumber: string;
}

export interface  pilot {
  createdDt: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  pilotId: string;
};

export interface droneAndPilot {
  distance: number;
  droneData: drone;
  pilot: pilot
  serialNumber: string;
  timestamp: string;
}