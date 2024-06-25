export class Course {
    constructor() {

    }
    static processCSVforCourse(csv, courses) {
        // burada csv nin adına göre belirli classlara göndereceğiz
        // daha sonra ana algotritma da bu classların parametrelerini birleştireeceğiz.
        const lines = csv.split(/\r?\n|\r/);
        for (let i = 0; i < lines.length; i++) {
            const data = lines[i].split(",");
            const courseCode = data[0];
            const courseName = data[1];
            const year = data[2];
            const credit = data[3];
            const courseType = data[4];
            const inDepartment = data[5];
            const capacity = data[6];
            const instructor = data[7];
            const hours = data[8];
            courses.push({ id: i, code: courseCode, name: courseName, year: year, credit: credit, type: courseType, inDepartment: inDepartment, capacity: capacity, instructor: instructor, hours: hours });
            
        }
        
    }

    static add(courses,code, name, year, credit, type, inDepartment, capacity, instructor, hours) {
        courses.push({id:this.currentId++,code, name, year, credit, type, inDepartment, capacity, instructor, hours });
    }
}