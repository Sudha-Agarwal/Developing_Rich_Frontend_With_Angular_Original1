export class Product {
    id: number;
    name: string;
    description: string;
    category: string;
    visible: boolean;
    stock: number;

    constructor();
    
    constructor(
        id?: number,
        name?: string,
        description?: string,
        category?: string,
        visible?: boolean,
        stock?: number
    ) {
        this.id = id || 0;
        this.name = name || '';
        this.description = description || '';
        this.category = category || '';
        this.visible = visible || false;
        this.stock = stock || 0;
    }

   
}
