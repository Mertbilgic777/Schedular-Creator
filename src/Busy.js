export class Busy {
    
    constructor() {
    }
    
    static processCSVforBusy(csv, busyTimes) {
        // burada csv nin adına göre belirli classlara göndereceğiz
        // daha sonra ana algotritma da bu classların parametrelerini birleştireeceğiz.
        
        // dosyalarımızın hiçbiri doğru parse edilmiyordu,split fonksiyonunun içini chat gpt ışığında böyle değiştirdim
        const lines = csv.split(/\r?\n|\r/g).map(line => line.replace(/"/g, ''));
        
        for (let i = 0; i < lines.length; i++) {
            let times = [];
            const data = lines[i].split(",");
            const teacherName = data[0];
            const day = data[1];
            for (let index = 2; index < data.length; index++) {
                times.push(data[index]); // Servisin zamanını al 
            }
            let isFound = false
            for(let busyTime of busyTimes){  
                if(busyTime.name === teacherName  && busyTime.day === day ){
                    
                    let combinedArray = busyTime.hours.concat(times)
                    combinedArray = combinedArray.filter((item, index, array) => array.indexOf(item) === index);      
                    
                    busyTime.hours = combinedArray
                    isFound = true
                    break
                }
            }
            if(isFound){continue}


            busyTimes.push({ id: i + 1, name: teacherName, day: day, hours: times });
            // GÜNLERİN BİRLEŞTİRİLİP EKLENMESİ GEREKİYOR
        }
    }

    static checkBusy(ins, day, hours,busyTimes) {
        for(let busyTime of busyTimes){
            if(busyTime.ins === ins && busyTime.day === day){
                for(let hour of hours){
                    if (busyTime.hours.includes(hour)) {
                        return true;
                    }
                }
                return false;
            }
            return false;
        }
    }
    
    static addBusy(ins, day, hours,busyTimes) {
        let found = false;
        for(let busyTime of busyTimes){
            if(busyTime.ins === ins && busyTime.day === day){
                busyTime.hours = Array.from(new Set(busyTime.hours.concat(hours)));
                found = true;
                break;
            }
        }
        if (!found) {
            busyTimes.push({ins: ins, day: day, hours: hours});
        }
        
    }

    static add(busyTimes,teacherName, day, times){
        busyTimes.push({id:this.currentId++,name: teacherName, day: day, hours: times });
    }
}