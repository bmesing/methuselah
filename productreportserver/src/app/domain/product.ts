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
    manufacturerId: string;
    reparability: string | undefined;
    durability: string | undefined;
    readonly type="product";
}
