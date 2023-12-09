export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined
            Login: undefined,
            About: undefined,
            PostsDetails: { id: number },
            PostsList: undefined,
            UsersList: undefined,
            UsersDetails: { id: number },
        }
    }
}