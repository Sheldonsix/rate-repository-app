import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SigninForm } from '../../components/Signin';
import { Formik } from 'formik';
// ...

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            // render the SignInContainer component, fill the text inputs and press the submit button
            const onSubmit = jest.fn();
            const initialValues = {
                username: '',
                password: ''
            }
            const {getByPlaceholderText, getByTestId } = render(<Formik initialValues={initialValues} onSubmit={onSubmit}>{({ handleSubmit }) => <SigninForm onSubmit={handleSubmit} />}</Formik>);
            fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
            fireEvent.changeText(getByPlaceholderText('Password'), 'password');
            fireEvent.press(getByTestId("signinButton"));
            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password'
                });
                // expect the onSubmit function to have been called once and with a correct first argument
            });
        });
    });
});