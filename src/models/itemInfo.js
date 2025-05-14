export class ItemInfo {
    constructor(name, element, classNamee, widthImg, heightImg, { left, top }) {
        this.name = name;
        this.element = element;
        this.classNamee = classNamee;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.offSets = { left, top };
    }
}