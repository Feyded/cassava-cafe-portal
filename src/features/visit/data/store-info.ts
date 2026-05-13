export interface StoreHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: { lat: number; lng: number };
  hours: StoreHours[];
}

export const storeInfo: StoreInfo = {
  name: "Cassava Café",
  address: "29 Pontiac St. corner Datsun West Fairview, Quezon City, Philippines, 1118",
  phone: "+639684126769",
  email: "cassavacafeph@gmail.com",
  coordinates: { lat: 14.704432062475949, lng: 121.06816772360655 },
  hours: [
    { day: "Monday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Tuesday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Wednesday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Thursday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Friday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Saturday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
    { day: "Sunday", open: "10:00 AM", close: "9:00 PM", isClosed: false },
  ],
};
