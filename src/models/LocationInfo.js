export class LocationInfo {
    constructor(name, element, classNamee, widthImg, heightImg, buttons, { left, top }) {
        this.name = name;
        this.element = element;
        this.classNamee = classNamee;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.buttons = buttons;
        this.offSets = { left, top };
    }
}