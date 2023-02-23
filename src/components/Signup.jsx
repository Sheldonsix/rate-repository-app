import { Button, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from 'yup';
import { useMutation } from "@apollo/client"
import { SIGNUP } from "../graphql/mutation";
import { useNavigate } from "react-router-dom";
import useSignin from "../hooks/useSignin";


const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10
    },
    view: {
        backgroundColor: 'white'
    },
});

const validationSchema = yup.object().shape({
    confirmPassword: yup.string().min(6, 'Password must be longer or eaual to 6').max(50, 'Password must not be longer or eaual to 50').oneOf([yup.ref('password'), null], "Passwords don't match").required('Password confirmation is required'),
    password: yup.string().min(6, 'Password must be longer or eaual to 6').max(50, 'Password must not be longer or eaual to 50').required('Password is required'),
    username: yup.string().min(4, 'Username must be longer or equal to 4').max(30, 'Password must not be longer or eaual to 30').required('Username is required')
});

export const SignupForm = ({ onSubmit }) => {
    return (
        <View style={styles.view}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
            <FormikTextInput name="confirmPassword" placeholder="Password confirmation" secureTextEntry={true} />
            <Button title="Sign up" onPress={onSubmit} style={styles.button} />
        </View>
    )
}

const Signup = () => {
    const navigate = useNavigate();
    const [mutate] = useMutation(SIGNUP);
    const [signin] = useSignin();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await mutate({
                variables: {
                    user: {
                        username,
                        password
                    }
                }
            });
            await signin({username, password});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default Signup;