import React from 'react';
import { useNavigate } from "react-router-dom"
import FileUploadInput from './fileUploadInput';


const SubmitForm = ({
    files,
    errors,
    errorKey,
    handleSubmit,
    uploadDisabled,
    handleChange,
    removeFile,
    renderFileUploadButton }) => {

    const navigate = useNavigate();

    //const { files, errors, errorKey, handleSubmit, uploadDisabled, handleChange, removeFile } = this.props;
    return (
        <div className="file-input-form-parent-div">
            <form className="file-input-form" onSubmit={() => handleSubmit(this, navigate)}>
                <h4>Choose file:</h4>
                <FileUploadInput
                    files={files}
                    error={errors[errorKey]}
                    onChange={handleChange}
                    removeFile={removeFile}
                    renderFileUploadButton={renderFileUploadButton}
                />
                {renderFileUploadButton("Upload", uploadDisabled)}
            </form>
        </div>

        //<div>
        //    <div>Welcome!! </div>
        //    <button onClick={() => navigate(AGREEMENT)}>Continue</button>
        //</div>
    );
};

export default SubmitForm;     