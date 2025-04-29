import { z } from "zod";

const createInerviewSchema = z.object({
  jobPosition: z.string().min(2).max(50),
  jobDescription: z.string().min(2).max(1000),
  interviewDuration: z.string().min(2).max(50),
  interviewType: z
    .array(z.string())
    .min(1, "Select at least one interview type"),
});

export type CreateInterviewTS = z.infer<typeof createInerviewSchema>;

export { createInerviewSchema };
