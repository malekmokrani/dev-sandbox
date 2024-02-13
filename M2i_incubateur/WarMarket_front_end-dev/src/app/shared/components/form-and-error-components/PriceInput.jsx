import React from 'react';
import { Formik, Form, Field } from 'formik';


const PriceInput = ({ submit }) => {

    return (
        <div className='items-center'>

            <Formik
                initialValues={{ min: JSON.parse(localStorage.getItem('filters')).minPrice, max: JSON.parse(localStorage.getItem('filters')).maxPrice }}
                onSubmit={submit}

            >
                {({ isSubmitting }) => (
                    <div className='m-3'>
                        <Form >
                            <div className='grid grid-cols-1'>
                                <label name="min" className='p-3' >Min €</label>

                                <Field id="minPrice" className='w-28 rounded-none rounded-b-md mb-4 shadow-inner' name="min" type="number" min={0} />
                            </div>
                            <div className='grid grid-cols-1'>
                                <label name="max" className='p-3'>Max €</label>
                                <Field id="maxPrice" className='w-28 rounded-none rounded-b-md mb-4 shadow-inner' name="max" type="number"  min={0}/>
                            </div>

                            <div className="login rounded-2xl w-1/2 p-3 hover:cursor-pointer flex justify-center">
                                <button className='self-center' type="submit">Filtrer</button>
                            </div>

                        </Form>


                    </div>
                )}
            </Formik>
        </div>
    );
}

export default PriceInput;