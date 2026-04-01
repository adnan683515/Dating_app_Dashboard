

// Event Tags (constant values)
export const EVENT_TAGS = {
  VIP: "VIP",
  NEARBY: "NEARBY",
  ROOFTOP: "ROOFTOP",
  OUTDOOR: "OUTDOOR",
} as const;

// EventTag type (union type)
export type EventTag = typeof EVENT_TAGS[keyof typeof EVENT_TAGS];


// Status Config (UI + label + color)
export const STATUS_CONFIG = {
  NOSTART: {
    label: "Not Started",
    color: "bg-gray-500/20 text-gray-300 border-gray-500",
  },
  OPPENDOOR: {
    label: "Open Door",
    color: "bg-blue-500/20 text-blue-300 border-blue-500",
  },
  GOING: {
    label: "Ongoing",
    color: "bg-green-500/20 text-green-300 border-green-500",
  },
  END: {
    label: "Ended",
    color: "bg-purple-500/20 text-purple-300 border-purple-500",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-500/20 text-red-300 border-red-500",
  },
} as const;


// Status type (union)
export type EventStatus = keyof typeof STATUS_CONFIG;