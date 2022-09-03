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
        //this.setState({ files: getFiles() });
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

    handleFileUpload = async (file) => {
        console.log("handleUpload: ", file);
        //saveFile(file);

        let HOST = 'https://localhost:7027';
        let controller = 'cloud';
        let ACTION = 'upload';
        let url = `${HOST}/${controller}/${ACTION}`;
        console.log('url is: ', url);

        const headers = {
            'Content-Type': 'application/json'            
        };

        http.post(url, file, { headers })
            .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        //const response = await http.post(url, file, { headers });
        //event.preventDefault();
        alert("response is: ", response);
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