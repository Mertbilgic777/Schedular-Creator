export class Service {
    constructor() {

    }
    static processCSVforService(csv, services) {
        // burada csv nin adına göre belirli classlara göndereceğiz
        // daha sonra ana algotritma da bu classların parametrelerini birleştireeceğiz.
        const lines = csv.split(/\r?\n|\r/g).map(line => line.replace(/"/g, ''));

        for (let i = 0; i < lines.length; i++) {
            let serviceTimes = [];
            const data = lines[i].split(",");
            const serviceCode = data[0]; // Servisin adını al
            const serviceDay = data[1]; // Servisin tarihini al
            for (let index = 2; index < data.length; index++) {
                serviceTimes.push(data[index]); // Servisin zamanını al 
            }
            

            services.push({ id: i, code: serviceCode, day: serviceDay, times: serviceTimes });
        
        }
    }

    static add(services,serviceCode,serviceDay,serviceTimes){
        services.push({id:this.currentId++,code: serviceCode, day: serviceDay, times: serviceTimes });
    }
}