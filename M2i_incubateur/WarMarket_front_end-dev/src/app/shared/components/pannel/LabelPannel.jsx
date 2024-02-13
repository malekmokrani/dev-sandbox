import { Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import BackendWithToken from "../../../api/backend/api.BackendWithToken";
import { schemaFormLabel } from "../../constants/formik-yup/yup/yupUser";

/**
 * The LabelPannel page
 * 
 * The Panel of Universes, Categories and Tags controle
 * 
 * @author Brice Bayard
 */

const LabelPannel = ({showPannelLabel}) => {

  // Send label values in back for Categories
  const categorySubmit = (values) => {
    const labelinfo = {
      label: values.label || "defaultLabelName",
    }

    // Send with Token to match route permission for Categories
    BackendWithToken
      .post("commercial/addCategory", labelinfo)
      .then(() => {
        toast.success("Catégorie créer.");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Catégorie non créer.")
        return "error post label";
      });
  }

  // Send label values in back for Universes
  const universeSubmit = (values) => {
    const labelinfo = {
      label: values.label || "defaultLabelName",
    }

    // Send with Token to match route permission for Universes
    BackendWithToken
      .post("commercial/addUniverse", labelinfo)
      .then(() => {
        toast.success("Univers créer.");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Univers non créer.")
        return "error post label";
      });
  }
  //Valeur par defaut des champs pour la Catégorie
  const defaultValuesLabel = { label: "" };

  // stock the style to DRY x6
  const buttonPannelStyle = "w-40 mt-5 bg-custom-orange border-2 border-gray-300 focus:bg-yellow-400 rounded-xl";

  return (
    // Position of the elements below
    <div  className="flex flex-col justify-center items-center mx-6 md:mx-20 xl:mx-40 text-white">
      {/* The box container */}
      <div className="box-border m-6 border-4 w-full bg-gradient-to-tr from-gray-500 to-gray-900" hidden={showPannelLabel}>

        <div className="text-center mt-5">
          <h2 className="underline font-bold">Gestion des labels :</h2>
        </div>

        <div className="xl:flex text-center my-10 space-y-5 xl:space-y-0 xl:space-x-10 justify-center">
          {/* Formular to send the added label */}
          <Formik
              initialValues={defaultValuesLabel}
              validationSchema={schemaFormLabel}
              enableReinitialize
              onSubmit={categorySubmit}>
            {({ values }) => (
              <Form>
                <div className="flex">
                  <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
                    <label htmlFor="inputPannel">Catégorie : </label>
                    <Field key="label" id="label" type="text" name="label" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
                    <button type="submit" className={buttonPannelStyle+" p-1"}>Ajouter</button>
                  </div>
                </div>
                </Form>
              )}
            </Formik>
            <Formik
              initialValues={defaultValuesLabel}
              validationSchema={schemaFormLabel}
              enableReinitialize
              onSubmit={universeSubmit}>
            {({ values }) => (
              <Form>
                <div className="flex">
                  <div className="border-2 border-gray-300 rounded-xl w-min sm:w-96 p-3 mx-auto">
                    <label htmlFor="inputPannel">Univers : </label>
                    <Field key="label" id="label" type="text" name="label" aria-label="inputPannel" className="rounded-md border-gray-300 bg-gray-500 placeholder-gray-400" placeholder="Label name" />
                    <button type="submit" className={buttonPannelStyle+" p-1"}>Ajouter</button>
                  </div>
                </div>
                </Form>
              )}
            </Formik>
        </div>

      </div>
    </div>
  );
};

export default LabelPannel;
