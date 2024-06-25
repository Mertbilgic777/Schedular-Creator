export class Classroom {
    constructor() {

    }
    static processCSVforClassroom(csv, classrooms) {
        // burada csv nin adına göre belirli classlara göndereceğiz
        // daha sonra ana algotritma da bu classların parametrelerini birleştireeceğiz.
        const lines = csv.split(/\r?\n|\r/)
        for (let i = 0; i < lines.length; i++) {
            const data = lines[i].split(';');
            
            const className = data[0];
            const capacity = data[1];
            const capacityInt = parseInt(capacity, 10);
            
            classrooms.push({ id: i, name: className, capacity: capacityInt,timeSlot: { Monday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
            Tuesday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
            Wednesday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
            Thursday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
            Friday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null} } });
            
        }
        
        
    }

    static add(classrooms, name, capacityInt) {
        classrooms.push({ 
            id: this.currentId++, 
            name: name, 
            capacity: capacityInt,
            timeSlot: { 
                Monday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
                Tuesday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
                Wednesday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
                Thursday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null}, 
                Friday: { "8:30": null, "9:30": null, "10:30": null, "11:30": null, "12:30": null, "13:30": null, "14:30": null, "15:30": null} 
            } 
        });
    }
}