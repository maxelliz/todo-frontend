import { Coord } from './coord';
import { Weather } from './weather';
import { Main } from './main';
import { Wind } from './wind';
import { Sys } from './sys';

export interface WeatherObject {
    coord?: Coord;
    weather?: Weather[];
    main?: Main;
    wind?: Wind;
    name?: string;
    sys?: Sys;
}