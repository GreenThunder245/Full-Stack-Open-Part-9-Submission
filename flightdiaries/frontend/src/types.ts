import { z } from 'zod';

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Stormy: 'stormy',
  Windy: 'windy',
} as const;

export type Weather = typeof Weather[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = typeof Visibility[keyof typeof Visibility];


export const DiaryEntrySchema = z.object({
  id: z.number(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.iso.date(),
  comment: z.string().optional()
});

export const NewDiaryEntrySchema = DiaryEntrySchema.omit( {id : true} );

export const NonSensitiveDiaryEntrySchema = DiaryEntrySchema.omit( {comment : true} );

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>; 

export type NewDiaryEntry = z.infer<typeof NewDiaryEntrySchema>; 

export type NonSensitiveDiaryEntry = z.infer<typeof NonSensitiveDiaryEntrySchema>; 