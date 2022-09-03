import React, { Component } from 'react';
import { useNavigate } from "react-router-dom"
import Form from './common/form';
import Joi from 'joi-browser';
import { saveFile } from '../services/fakeCloudService';

import formatsConfig from '../acceptedFormats.json';
import { toast } from 'react-toastify';
import SubmitForm from './common/submitForm';

class FileUploadForm extends Form {
    state = {
        files: [],
        errors: {},
        maxFilesCount: 10,
        uploadDisabled: true,
        
    }
    schema = {}

    doSubmit = async navigate => {
        // Call the server
        //const navigate = useNavigate();
        
        console.log("In doSubmit of fileUploadForm class");
        console.log("file to be saved:", this.state.files[0]);

        //saveFile(this.state.files[0]);
        await this.props.handleUpload(this.state.files[0]);
        
        this.setState({ uploadDisabled: true });
        //const navigate = useNavigate();
        //toast.success("File added successfully.");
        alert("File added successfully.");
        //navigate('/cloud');
    }

    handleChange = (e) => {

        const files = e.target.files;
        const filesArr = [...files];
        console.log("files from the input: ", { filesArr });
        let isValidInput = true;
        const errors = { ...this.state.errors };

        for (let file of filesArr) {
            let errorMessage = this.validate(file);
            if (errorMessage) {
                Object.assign(errors, errorMessage);
                isValidInput = false;

                //one error is enough to be displayed on UI         
                break;
            }
        }
        if (!isValidInput) {
            console.log("there are some errors: ", errors);
            this.setState({ errors })
            return;
        }
        console.log("State should be updated");
        console.log("to be added:", filesArr);
        console.log("current items:", this.state.files);
        this.setState({
            errors: {},
            uploadDisabled: false,
            files: [...filesArr.map(f => this.mapToViewModel(f), ...this.state.files)]
        });
    };

    mapToViewModel(file) {
        return {
            "file":
            {
                "checked": false,
                "title": file.name,
                "extension": file.name.split('.').pop(),
                "fileSize": file.size.toString(),
                "modifiedDate": Date.now().toString()
            }            
        }
    }

    validate = ({ name: filename, size }) => {
        //const errors = { ...this.state.errors }

        if (!filename) {
            //errors["Name"] = "File name is empty.";
            return { "Name error": "File name is empty." };
        }
        else if (!size || size === 0) {
            //errors["File Size"] = "File size is empty.";
            return { "FileSize error": "File size is empty." };
        }
        const fileExt = filename.split('.').pop();

        let isValidFormat = false;
        for (let index in formatsConfig.allFormats) {
            for (let format in formatsConfig.allFormats[index]) {
                let extensions = formatsConfig.allFormats[index][format];
                if (extensions.some(e => e == fileExt)) {
                    isValidFormat = true;
                }
            }
        }
        if (!isValidFormat) {
            return { "File type error": "File type '" + fileExt + "' is invalid." };
        }
        // return null, which means no errors
        return null;
    }

    removeFile(f) {
        //todo: to fix
        //this.setState({ files: this.state.files.filter(x => x !== f) });
    }

    render() {
        const { files, errors, uploadDisabled } = this.state
        const errorKey = Object.keys(errors)[0];

        return (
            <SubmitForm
                files={files}
                errors={errors}
                errorKey={errorKey}
                handleSubmit={this.handleSubmit}
                uploadDisabled={uploadDisabled}
                handleChange={this.handleChange}
                removeFile={this.removeFile}
                renderFileUploadButton={this.renderFileUploadButton}
            />
        );
    }
}
export default FileUploadForm;