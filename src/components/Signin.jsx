import { Button, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from 'yup';
import useSignin from "../hooks/useSignin";
import { useNavigate } from "react-router-dom";


const initialValues = {
    username: '',
    password: ''
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
    password: yup.string().min(6, 'Password must be longer or eaual to 6').required('Password is required'),
    username: yup.string().min(4, 'Username must be longer or equal to 4').required('Username is required')
})

export const SigninForm = ({ onSubmit }) => {
    return (
        <View style={styles.view}>
            <FormikTextInput name="username" placeholder="Username" testID="usernameInput" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="passwordInput" />
            <Button title="Sign in" onPress={onSubmit} style={styles.button} testID="signinButton" />
        </View>
    )
};

const Signin = () => {
    const [signin] = useSignin();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signin({ username, password });
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default Signin;