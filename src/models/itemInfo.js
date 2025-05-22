export class ItemInfo {
    constructor(name, id, element, func, classNamee, widthImg, heightImg, { left, top }) {
        this.name = name;
        this.id = id;
        this.element = element;
        this.func = func;
        this.classNamee = classNamee;
        this.widthImg = widthImg;
        this.heightImg = heightImg;
        this.offSets = { left, top };
    }
}