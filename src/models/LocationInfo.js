
//name, element, classNamee, functions, activities name, duration for each activity, widthImg, heightImg, { left, top }

export class LocationInfo {
    constructor(name, element, classNamee, functions, activities, actDuration, widthImg, heightImg, { left, top }, type = 'location', inventory = []) {
        this.name = name;
        this.element = element;
        this.classNamee = classNamee;
        this.functions = functions;
        this.activities = activities;
        this.actDuration = actDuration;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.offSets = { left, top };
        this.type = type;
        this.inventory = inventory;
   }

   buttonGoTo(){
        
   }
}