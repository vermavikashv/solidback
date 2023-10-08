import { z } from "zod";

export const mediaResponse = {
  _id: z.string(),
  path: z.string(),
  type: z.string(),
};

export const mediaFolderPath = {
  folderPath: `/descrptionFile`,
};
