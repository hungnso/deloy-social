import React from "react";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import Ckeditor from "./Ckeditor"
import request from "../../Api/request";
import ListFollow from '../../Components/Follow/ListFollow';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
export default function EditPost() {
    const { postId } = useParams()
    const userMe = useAuth();
    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');
    const [file, setFile] = React.useState('');
    const [changeFile, setChangeFile] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const navigate = useNavigate();

    const fetchPost = async () => {
        const res = await request({
            url: `/posts/post/${postId}`,
            method: "GET",
        });

        if (res.data) {
            console.log(res.data)
            setImage(res.data.images)
            setText(res.data.content);
        }
    };

    React.useEffect(() => {
        fetchPost()
    }, [])


    React.useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image)
        }
    }, [image])

    const handleChangeFile = (e) => {
        const file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setImage(imageUrl)
        setFile(file)
        setChangeFile(true)
        e.target.value = null
    }

    const renderImage = () => {
        if (image) {
            return (
                <div className='text-center mt-2'>
                    {image && <img src={image} alt='anh' width='80%' />}
                </div>
            )
        }
    }

    const handleClickEditpost = async () => {
        if (text === '') {
            toast.error('Content is required !')
        } else {
            try {
                setLoad(true)
                const data = {}
                if (changeFile) {
                    let bodyFormData = new FormData();
                    bodyFormData.append('file', file);

                    const res = await request({
                        url: '/upload',
                        method: 'POST',
                        data: bodyFormData,
                        headers: { "Content-Type": "multipart/form-data" },
                    })

                    const data = {
                        content: text,
                        images: res.data
                    }
                    const post = await request({
                        url: `posts/edit-post/${postId}`,
                        method: 'PUT',
                        data: data,
                    })

                    toast.success('Edit post success!')
                    setLoad(false)
                    navigate(`/posts/${postId}`)

                } else {
                    const data = {
                        content: text,
                        images: image
                    }
                    const post = await request({
                        url: `posts/edit-post/${postId}`,
                        method: 'PUT',
                        data: data,
                    })

                    toast.success('Edit post success!')
                    navigate(`/posts/${postId}`)
                    setLoad(false)
                }
            } catch (err) {
                toast.error('Edit post error!')
            }
        }
    }

    return (
        <MainLayout>
            <ContentLayout>
                <div className='text-center my-2'>
                    <h4>Edit post</h4>
                </div>
                <div className='flex-grow-1 overflow-auto'>
                    <div>
                        <input type='file' className='form-control' onChange={handleChangeFile} />
                    </div>
                    {renderImage()}
                    <Ckeditor value={text} setValue={setText} />
                    {
                        load ? (
                            <Button variant="primary" disabled className='mt-2'>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Loading...</span>
                          </Button>
                        ) : (
                            <button
                                className='btn btn-primary mt-2'
                                onClick={handleClickEditpost}
                            >
                                Edit
                            </button>
                        )
                    }

                </div>
            </ContentLayout>
            <RightSidebarLayout>
                <ListFollow userIdProfile={userMe._id} page='home-following' />
            </RightSidebarLayout>
        </MainLayout >
    )
}