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
import { Button, Spinner } from 'react-bootstrap';

export default function CreatePost() {
  const userMe = useAuth();
  const [image, setImage] = React.useState();
  const [text, setText] = React.useState('');
  const [load, setLoad] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview)
    }
  }, [image])

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setImage(file)
    e.target.value = null
  }

  const renderImage = () => {
    if (image) {
      return (
        <div className='text-center mt-2'>
          {image && <img src={image.preview} alt='anh' width='80%' />}
        </div>
      )
    }
  }

  const handleClickCreatepost = async () => {
    setLoad(true)
    if (text === '') {
      toast.error('Content is required !')
    } else {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('file', image);

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
          url: '/posts/create',
          method: 'POST',
          data: data,
        })

        toast.success('Create post success!')
        setLoad(false)
        navigate('/')
      } catch (err) {
        toast.error('Create post error!')
      }
    }
  }

  return (
    <MainLayout>
      <ContentLayout>
        <div className='text-center my-2'>
          <h4>Create new post</h4>
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
              <button className='btn btn-primary mt-2' onClick={handleClickCreatepost}>Create</button>
            )
          }
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <ListFollow userIdProfile={userMe._id} page='home-following' />
      </RightSidebarLayout>
    </MainLayout>
  )
}