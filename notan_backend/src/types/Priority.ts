export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export const PriorityConfig = {
  [Priority.LOW]: {
    label: "Low",
    color: "#21d82783",
  },
  [Priority.MEDIUM]: {
    label: "Medium",
    color: "#ffc10781",
  },
  [Priority.HIGH]: {
    label: "High",
    color: "#ff110085",
  },
};
