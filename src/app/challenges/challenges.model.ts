
import { Day, DayStatus } from './day.model';

export class Challenges {
    constructor (public title: string,
        public description: string,
        public year:number,
        public month:number,
        private _days: Day[] = [])
    {
        if (_days.length > 0) {
            return;
        }

        // this.currentYear = new Date().getFullYear();
        // this.currentMonth = new Date().getMonth();
        const daysInMonth= new Date(year, month + 1, 0).getDate();

        for (let dim = 1; dim < daysInMonth + 1; dim++) {
            const date = new Date (year, month, dim);
            const dayInWeek = date.getDay();
            this._days.push({dayInMonth: dim, dayInWeek: dayInWeek, date: date, status: DayStatus.Open});
        }

    }

    get currentDay() {
        return this._days.find(d => d.dayInMonth === new Date().getDate())
    }

    get days() {
        return [...this._days];
    }
}
