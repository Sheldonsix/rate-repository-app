import { useMutation, useApolloClient } from "@apollo/client"
import { AUTHENTICATE } from "../graphql/mutation"
import useAuthStorage from "./useAuthStorage";

const useSignin = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE)
    const apolloClient = useApolloClient();

    const signin = async ({ username, password }) => {
        const {data} = await mutate({
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore()

        return data;
    }

    return [signin, result];
}

export default useSignin;