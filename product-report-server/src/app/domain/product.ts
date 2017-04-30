/**
 * Created by ben on 19.03.17.
 */

export class Attachment {
    content_type: string;
    fileName: string;
}



export class Product {
    _id: string;
    _rev: string;
    _attachments: Object;
    attachments: Attachment[]
    name: string;
    ean: string;
    reparability: string;
    durability: string;
    manufacturer: string;
    type="product";
}
