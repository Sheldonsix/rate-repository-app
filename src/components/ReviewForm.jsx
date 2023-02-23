import { View, StyleSheet, Button } from "react-native";
import {useMutation} from "@apollo/client";
import FormikTextInput from "./FormikTextInput";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { CREATE_REVIEW } from "../graphql/mutation";



const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    review: ''
};

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10
    },
    view: {
        backgroundColor: 'white'
    },
})

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.string().required('Rating is required')
})

const ReviewForm = ({onSubmit}) => {
    return (
        <View style={styles.view}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="review" placeholder="Review" />
            <Button title="Create a review" onPress={onSubmit} style={styles.button} />
        </View>
    )
}

const CreateReview = () => {
    const navigate = useNavigate();
    const [mutate] = useMutation(CREATE_REVIEW);
    const onSubmit = async (values) => {
        const {ownerName, repositoryName, rating, review} = values;
        try {
            const {data} = await mutate({
                variables: {
                    review: {
                        ownerName,
                        rating: +rating,
                        repositoryName,
                        text: review
                    }
                },
                
            });
            // console.log('Create a review', data);
            navigate(`/${data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {({handleSubmit}) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    )
}

export default CreateReview;