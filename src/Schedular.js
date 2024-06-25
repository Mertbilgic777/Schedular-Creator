import { Busy } from "./Busy";


export class Schedular {
    constructor(classes, days,times) {
        this.classes = classes;
        this.days = days;
        this.times= times;
    }
    createEmptySchedule(classrooms, courses, services,busyTimes,unplaced) {
        let schedule = {};
        let filledSchedule = [];

        for (const cls of this.classes) {
            schedule[cls] = {};

            for (const day of this.days) {
                schedule[cls][day] = {};

                for (const time of this.times) {
                    schedule[cls][day][time] = ' ';
                }
            }
        }

        filledSchedule = Schedular.placer(classrooms,courses,services,busyTimes);

        for (let cls of this.classes) {
            for (const day of this.days) {
                for (const time of this.times) {
                    if(cls===1){
                        schedule[cls][day][time] = filledSchedule[0][0][day][time];
                    }else if(cls===2){
                        schedule[cls][day][time] = filledSchedule[0][1][day][time];
                    }
                    else if(cls===3){
                        schedule[cls][day][time] = filledSchedule[0][2][day][time];
                    }
                    else if(cls===4){
                        schedule[cls][day][time] = filledSchedule[0][3][day][time];
                    }
                }
            }
        }


        unplaced=filledSchedule[1];



        return [schedule,unplaced];
    }

    static placer(classrooms, courses, services,busyTimes) {

        let detailedServices = [];

        let firstCourses = [];
        let secondCourses = [];
        let thirdCourses = [];
        let lastCourses = [];

        let unplacedCourses = [];

        //Servisleri yerlestir
        for (let course of courses) {
            if (course.inDepartment === "S") {
                detailedServices.push(course);
            } else {
                if (course.year === "1") {
                    firstCourses.push(course);
                }
                else if (course.year === "2") {
                    secondCourses.push(course);
                }
                else if (course.year === "3") {
                    thirdCourses.push(course);
                }
                else if (course.year === "4") {
                    lastCourses.push(course);
                }
            }
        }
        // sorting classrooms in ascending order
        classrooms.sort((a, b) => {
            return a.capacity - b.capacity;
        });


        let firstYear = {
            "Monday": {},
            "Tuesday": {},
            "Wednesday": {},
            "Thursday": {},
            "Friday": {},
        };

        let secondYear = {
            "Monday": {},
            "Tuesday": {},
            "Wednesday": {},
            "Thursday": {},
            "Friday": {},
        };
        let thirdYear = {
            "Monday": {},
            "Tuesday": {},
            "Wednesday": {},
            "Thursday": {},
            "Friday": {},
        };

        let lastYear = {
            "Monday": {},
            "Tuesday": {},
            "Wednesday": {},
            "Thursday": {},
            "Friday": {},
        };






        for (let detailedService of detailedServices) {
            let isPlaced = false
            for (let service of services) {
                if (detailedService.code === service.code) {
                    for (let classroom of classrooms) {
                        // Sınıf bulunamadıysa tekrardan sınıf bulması gerekiyor

                        if (classroom.capacity >= detailedService.capacity) {
                            for (let time of service.times) {
                                if (classroom.timeSlot[service.day][time] == null&&!Busy.checkBusy(detailedService.instructor,service.day,[time],busyTimes)) {
                                    Busy.addBusy(detailedService.instructor,service.day,[time],busyTimes)
                                    isPlaced = true
                                    classroom.timeSlot[service.day][time] = service.code;
                                    if (detailedService.year === "1") { firstYear[service.day][time] = [service.code,classroom.name]}
                                    else if (detailedService.year === "2") { secondYear[service.day][time] = [service.code,classroom.name] }
                                    else if (detailedService.year === "3") { thirdYear[service.day][time] = [service.code,classroom.name] }
                                    else if (detailedService.year === "4") { lastYear[service.day][time] = [service.code,classroom.name] }
                                }
                                else{
                                    isPlaced = false
                                }
                            }

                        }
                    }
                }

            }
            if(!isPlaced ){
                unplacedCourses.push(detailedService)
            }
        }



        if(unplacedCourses.length != 0){
            alert("This schedule cannot be created. No empty slots for a service! \n You can see the courses that unplaced!")
        }

        function placeCourses(coursesYearly, year) {

            for (let course of coursesYearly) {
                let isPlaced = false;
                for (let classroom of classrooms) {

                    if (classroom.capacity >= course.capacity) {
                        for (let day in classroom.timeSlot) {
                            for (let hour in classroom.timeSlot[day]) {

                                if (course.hours === "2+1") {
                                    try {
                                        if (classroom.timeSlot[day][next(hour)] == null && year[day][hour] == undefined && year[day][next(hour)] == undefined && next(hour) != null && classroom.timeSlot[day][hour] == null&&!Busy.checkBusy(course.instructor,day,[hour,next(hour)],busyTimes)) {

                                            // +1
                                            for (let otherDay in classroom.timeSlot) {
                                                for (let otherHour in classroom.timeSlot[day]) {
                                                    if (!(day === otherDay) && classroom.timeSlot[otherDay][otherHour] == null && year[otherDay][otherHour] == null&&!Busy.checkBusy(course.instructor,otherDay,[otherHour],busyTimes)) {
                                                        Busy.addBusy(course.instructor,otherDay,[otherHour],busyTimes)
                                                        classroom.timeSlot[day][hour] = course.code;
                                                        classroom.timeSlot[day][next(hour)] = course.code;
                                                        year[day][hour] = [course.code,classroom.name];
                                                        year[day][next(hour)] = [course.code,classroom.name];

                                                        classroom.timeSlot[otherDay][otherHour] = course.code;
                                                        year[otherDay][otherHour] = [course.code,classroom.name];

                                                        // Eğer 2 dersi yerleştirir ve 1 dersi yerleştirecek yer bulamazsa 2 dersi silmiyor
                                                        isPlaced = true;
                                                        break;
                                                    }
                                                }

                                                if (isPlaced) { break; }
                                            }

                                        }
                                    }
                                    catch (err) {
                                        continue;
                                    }
                                    if (isPlaced) { break; }

                                } else if (course.hours === "3") {

                                    try {
                                        if (next(hour) != null && next(next(hour)) != null && year[day][hour] == undefined && year[day][next(hour)] == undefined && year[day][next(next(hour))] == undefined) {
                                            if(!Busy.checkBusy(course.instructor,day,[hour,next(hour),next(next(hour))],busyTimes)){
                                                if (classroom.timeSlot[day][hour] == null && classroom.timeSlot[day][next(hour)] == null && classroom.timeSlot[day][next(next(hour))] == null) {
                                                    Busy.addBusy(course.instructor,day,[hour,next(hour),next(next(hour))],busyTimes)
                                                    classroom.timeSlot[day][hour] = course.code;
                                                    classroom.timeSlot[day][next(hour)] = course.code;
                                                    classroom.timeSlot[day][next(next(hour))] = course.code;

                                                    year[day][hour] = [course.code,classroom.name];
                                                    year[day][next(hour)] =[course.code,classroom.name];
                                                    year[day][next(next(hour))] = [course.code,classroom.name];


                                                    isPlaced = true;
                                                    break;
                                                }
                                            }
                                        }
                                    } catch (err) {
                                        continue;
                                    }

                                }
                            }
                            if (isPlaced) { break; }

                        }
                        if (isPlaced) { break; }
                    }
                }
                if (!isPlaced) {
                    unplacedCourses.push(course)
                }
            }
            return year;
        }



        let a = placeCourses(firstCourses, firstYear);
        let b = placeCourses(secondCourses, secondYear);
        let c = placeCourses(thirdCourses, thirdYear);
        let d = placeCourses(lastCourses, lastYear);


        // YARDIMCI FONKSİYON 
        function next(time) {

            if (time === "16:30") { return null; }
            let times = ["8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"];

            return times[times.indexOf(time) + 1];
        }


        return [[a,b,c,d],unplacedCourses];
    }

}
