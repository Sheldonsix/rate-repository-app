import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import * as yup from 'yup';

const initialValues = {
    username:'',
    password:''
}

const styles = {
    button: {
        margin: 10,
        padding: 10
    },
    view: {
        backgroundColor: 'white'
    },
}

const validationSchema = yup.object().shape({
    password: yup.string().min(6, 'Password must be longer or eaual to 6').required('Password is required'),
    username: yup.string().min(4, 'Username must be longer or equal to 4').required('Username is required')
})

const SigninForm = ({onSubmit}) => {
    return (
        <View style={styles.view}>
            <FormikTextInput name="username" placeholder="Username"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry={true}/>
            <Button title="Sign in" onPress={onSubmit} style={styles.button} />
        </View>
    )
};

const Signin = () => {
    const onSubmit = () => {
        console.log('onSubmit')
    }
    return(
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => <SigninForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default Signin;