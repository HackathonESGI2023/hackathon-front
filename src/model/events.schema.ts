import { z } from 'zod';

const activityTypeEnum = z.enum([
  'MEETING',
  'TRAINING',
  'WORKSHOP',
  'CONFERENCE',
  'COURSE',
  'OTHER',
]);
export type ActivityTypeEnum = z.infer<typeof activityTypeEnum>;

const eventsSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string().optional(),
  activity: activityTypeEnum,
  date: z.date().optional(),
  address: z.string().optional(),
  creatorId: z.number().int().positive(),
});
export type EventsDto = z.infer<typeof eventsSchema>;

const eventsCreateSchema = eventsSchema.omit({
  id: true,
});
export type EventsCreateDto = z.infer<typeof eventsCreateSchema>;

const eventsUpdateSchema = eventsSchema.pick({
  name: true,
  description: true,
  activity: true,
  date: true,
  address: true,
});
export type EventsUpdateDto = z.infer<typeof eventsUpdateSchema>;

const eventsDeleteSchema = eventsSchema.pick({
  id: true,
});
export type EventsDeleteDto = z.infer<typeof eventsDeleteSchema>;
