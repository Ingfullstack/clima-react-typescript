import { z } from "zod";

export type SearchType = {
  city: string;
  country: string;
};

export type Country = {
  code: string;
  name: string;
};


export type Weathear = z.infer<typeof WeathearSchema>;

export const WeathearSchema = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
});


