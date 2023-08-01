import { Controller } from '@nestjs/common';

@Controller()
export class AppController {}

export type TQuery = { [key: string]: string | number };
