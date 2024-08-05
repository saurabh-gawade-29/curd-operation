import React, { useEffect, useState } from 'react'


const Dashboard = () => {
    const [imageFile, setImageFile] = useState(null);
    const [desc, setDesc] = useState("")

    const [imgSub, setImgSub] = useState(null);
    const [descSub, setDescSub] = useState("");

    const [check, setCheck] = useState(false);

    const handleSubmit = async () => {
        debugger
        if (imageFile === null || desc.trim() === "") {
            alert('Invalid Input');
        } else {
            if (imageFile) {
                try {
                    const base64Image = await getBase64(imageFile);
                    localStorage.setItem('storedImage', base64Image);
                    localStorage.setItem('storedText', desc);
                    setCheck(true);
                    setImageFile(null);
                    setDesc("");
                } catch (error) {
                    console.log(error, "Catch")
                }

            }
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const handleImageChange = (e) => {
        debugger
        setImageFile(e.target.files[0])
    }

    const handleClear = () => {
        localStorage.clear();
        setDescSub("");
        setImgSub(null);
        setDesc("")
        setImageFile(null);
    }

    useEffect(() => {
        setCheck(false)
        let storedImage = localStorage.getItem("storedImage");
        let storedText = localStorage.getItem("storedText");
        if (storedText) {
            setDescSub(storedText);
        }
        if (storedImage) {
            setImgSub(storedImage);
        }
    }, [check])

    return (
        <div>
            <div className='container my-4'>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className='display-6'>Please Fill The Form</h1>
                    </div>
                    <div className='col-12'>
                        <div class="input-group mb-3">
                            {/* <label class="input-group-text" for="inputGroupFile01">Upload</label> */}
                            <input type="file" class="form-control" id="inputGroupFile01" accept='image/*' onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div class="mb-3">
                            <button type="button" class="btn btn-danger" onClick={handleSubmit}>Submit</button>
                            <button type="button" class="btn btn-secondary mx-1" onClick={handleClear}>Clear</button>
                        </div>
                    </div>

                </div>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <div className="card">
                            <div className="card-body">
                                <img src={imgSub} class="card-img-top" alt="..." />
                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-body-secondary">CTS25UN: 25 sq.mm Standard Feed Through Terminal Blocks</h6>
                                <p className="card-text">{descSub}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard