import { createApp } from 'vue'
import App from './App.vue'


createApp(App).mount('#app')

import {Busy} from "@/Busy";
import {Course} from "@/Course";
import {Service} from "@/Service";
import {Classroom} from "@/Classroom";


let uploadFiles = new Set();
export function processFiles(files,classrooms,busyTimes,courses,services) {

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if(uploadFiles.has(file.name)){
            alert(file.name + "  dosyasını zaten yüklediniz...")
            continue;
        }
        
        if (file.type === "text/csv") {
            const reader = new FileReader();
            reader.onload = (e) => {
                const csv = e.target.result;
                
                // CSV dosyasını işleme fonksiyonuna gönder
                
                processCSV(csv, classrooms,busyTimes,courses,services,file.name);
                uploadFiles.add(file.name);
            };
            reader.readAsText(file);
        } else {
            alert("Yalnızca CSV dosyaları desteklenmektedir.");
        }
    }

}

export function processCSV(csv,classrooms,busyTimes,courses,services,fileName) {
    // burada csv nin adına göre belirli classlara göndereceğiz
    // daha sonra ana algotritma da bu classların parametrelerini birleştireeceğiz.
    const documentType = determineDocumentType(fileName);
    
    switch (documentType) {
        case 'busy':

            Busy.processCSVforBusy(csv, busyTimes);
            break;
        case 'service':

            Service.processCSVforService(csv, services);
            break;
        case 'course':

            Course.processCSVforCourse(csv, courses);
            break;
        case 'classroom':

            Classroom.processCSVforClassroom(csv, classrooms);
            break;
        default:
            alert('Belirtilen belge türü desteklenmiyor.');
    }
}
export function determineDocumentType(fileName) {
    // Dosya adına göre belge türünü belirleyen işlev
    // Örneğin, dosya adındaki uzantıya veya belirli bir kelimeye bakarak belge türünü belirleyebilirsiniz
    //fileName.toLowerCase();
    if (fileName.includes('service')) {
        return 'service';
    } else if (fileName.includes('busy')) {
        return 'busy';
    } else if (fileName.includes('course')||fileName.includes('Course')) {
        return 'course';
    } else if (fileName.includes('classroom')) {
        return 'classroom';
    } else {
        return 'unknown';
    }
}