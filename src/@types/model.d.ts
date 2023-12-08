export declare global {
    type Post = {
        id: any;
        title: string;
        body: string;
        tags: string[];
    }

    type User = {
        id: any;
        firstName: string;
        lastName: string;
    }
}
