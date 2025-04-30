import { z } from "zod";

const createInerviewSchema = z.object({
  jobPosition: z
    .string()
    .min(2, {
      message: "Job position is required",
    })
    .max(50),
  jobDescription: z
    .string()
    .min(2, {
      message: "Job description is required",
    })
    .max(1000),
  interviewDuration: z
    .string()
    .min(2, {
      message: "interview duration is required",
    })
    .max(50),
  interviewType: z.array(z.string()).min(1, {
    message: "Please select at least one interview type",
  }),
});

export type CreateInterviewTS = z.infer<typeof createInerviewSchema>;

export { createInerviewSchema };
