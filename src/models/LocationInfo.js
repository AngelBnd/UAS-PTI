
//name, element, classNamee, functions, activities, widthImg, heightImg, { left, top }

export class LocationInfo {
    constructor(name, element, classNamee, functions, activities, widthImg, heightImg, { left, top }) {
        this.name = name;
        this.element = element;
        this.classNamee = classNamee;
        this.functions = functions;
        this.activities = activities;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.offSets = { left, top };
   }

   buttonGoTo(){
        
   }
}