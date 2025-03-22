export declare global {
    type Result = {
        total: number;
        skip: number;
        limit: number;
    }

    type Login = {
        id: number;
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
        gender: male;
        image: Uri | string;
        accessToken: string;
        refreshToken: string;
    }
    
    type Post = {
        id: any;
        title: string;
        body: string;
        tags: string[];
        userId: number;
    }

    type PostResult = Result & {
        posts: Post[];
    }

    type User = {
        id: any;
        firstName: string;
        lastName: string;
        maidenName: string;
        age: number;
        gender: string;
        email: string;
        phone: string;
        username: string;
        password: string;
        birthDate: string;
        image: Uri | string;
        bloodGroup: string;
        height: number;
        weight: number;
        eyeColor: string;
    }

    type UserResult = Result & {
        users: User[];
    }
}
