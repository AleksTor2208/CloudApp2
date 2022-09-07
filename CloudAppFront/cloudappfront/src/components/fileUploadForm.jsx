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
        file: {},
        allFiles: [],
        errors: {},
        maxFilesCount: 10,
        uploadDisabled: true,
        content: []        
    }
    schema = {}

    doSubmit = async (e, navigate) => {
        //saveFile(this.state.files[0]);
        await this.props.handleUpload(this.state.file/*this.state.allFiles[0]*/);
        this.setState({ uploadDisabled: true });        
        toast.success("File added successfully.");
        alert("File added successfully.");

        //const navigate = useNavigate();
        //navigate('/cloud');
    }

    handleChange = (e) => {

        const files = e.target.files;
        const filesArr = [...files];
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
        console.log("current items:", this.state.allFiles);
        this.setState({
            errors: {},
            uploadDisabled: false,
            file: filesArr[0],
            allFiles: [...filesArr.map(f => this.mapToViewModel(f), ...this.state.allFiles)]
        });
    };

    mapToViewModel = file => {

        return {
            "file":
            {
                "checked": false,
                "title": file.name,
                "extension": file.name.split('.').pop(),
                "fileSize": file.size.toString(),
                //"content": this.state.content,
                "modifiedDate": Date.now().toString()
            }
        }
    }

    validate = ({ name: filename, size }) => {

        if (!filename) {
            return { "Name error": "File name is empty." };
        }
        else if (!size || size === 0) {
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
        const { allFiles, errors, uploadDisabled } = this.state
        const errorKey = Object.keys(errors)[0];

        return (
            <SubmitForm
                files={allFiles}
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