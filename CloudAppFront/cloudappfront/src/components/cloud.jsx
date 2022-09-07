import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFiles, saveFile } from '../services/fakeCloudService';
import { uploadFile } from '../services/fileUploadService';
import FilesTable from './filesTable';
import FileUploadForm from './fileUploadForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../services/httpService"


class Cloud extends Component {
    state = {
        files: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: "title", order: "asc" }
    }

    

    async componentDidMount() {
        console.log('componentDidMount');
        const { data: files }  = await http.get('https://localhost:7027/cloud/files');
        this.setState({ files });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleCheck() {
        console.log('checked...');
    }

    handleDelete = file => {
        const files = this.state.files.filter(m => m._id !== file._id);
        this.setState({ files });
    };

    handleDownload = async (file) => {
        const HOST = 'https://localhost:7027';
        const CONTROLLER = 'cloud';
        const ACTION = 'download';

        const id = file._id;
        let url = `${HOST}/${CONTROLLER}/${ACTION}?fileId=${id}`;
        
        const { data: fileToDownload } = await http.get(url);
        //alert('url to download is: ', url);
        console.log('fileToDownload to download is:', fileToDownload);
        // create file in browser
        const fileName = fileToDownload.title;
        const json = JSON.stringify(fileToDownload/*, null, 2*/);
        const blob = new Blob([json], { type: fileToDownload.contentType/*"application/json"*/ });
        const href = URL.createObjectURL(blob);

        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;// + fileToDownload.extension;
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        console.log("In handle download");
    }

    handleFileUpload = async (file) => {
        const HOST = 'https://localhost:7027';
        const CONTROLLER = 'cloud';        
        const ACTION = 'upload';

        let url = `${HOST}/${CONTROLLER}/${ACTION}`;
        console.log('url is: ', url);

        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        http.post(url, formData, config)
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        //event.preventDefault();
    }   


    render() {
        const { files, sortColumn } = this.state;
        return (
            <div className="row">
                <div className="col-6 files-list">
                    <FilesTable
                        files={files}
                        sortColumn={sortColumn}
                        onCheck={this.handleCheck}
                        onDelete={this.handleDelete}
                        onDownload={this.handleDownload}
                        onSort={this.handleSort}
                    />
                </div>
                <div className="col">
                    {/*<ToastContainer />*/}
                    <FileUploadForm handleUpload={this.handleFileUpload} />
                </div>
            </div>
        );
    }
}

export default Cloud;