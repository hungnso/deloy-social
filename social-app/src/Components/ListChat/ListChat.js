import React from 'react';
import MessageItem from './MessageItem';
import * as Icon from 'react-feather';
import useAuth from '../../hooks/useAuth';
import request from "../../Api/request";
import ChatItem from "./ChatItem";

export default function ListMessage({ userId }) {
    const user = useAuth();
    const [listChat, setListChat] = React.useState();
    const [text, setText] = React.useState()
    const [load, setLoad] = React.useState(false);

    const fetchChat = async () => {
        const res = await request({
            url: `/message/conversation/${userId}`,
            method: 'GET',
        })

        if (res.data) {
            setListChat(res.data.chat)
        }
    }
    React.useEffect(() => {
        fetchChat()
    }, [userId, load])

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await request({
            url: `/message/chat/${userId}`,
            method: 'PUT',
            data: {
                content: text
            }
        });
        if (res.data) {
            setLoad(!load)
            setText('')
        }
    }

    return (
        // <div className='mb-2 d-flex flex-column overflow-auto' >
        <>
            <div className='flex-grow-1 overflow-auto mt-3'>
                {
                    listChat?.map((chat, index) => (
                        <div
                            key={index}
                            className={chat.userId?._id === user._id ? 'text-right' : ''}
                        >
                            <ChatItem chat={chat} />
                        </div>
                    ))
                }
            </div>
            <div className='d-flex'>
                <div className=" me-1">
                    <img
                        className="rounded-circle border border-white"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                        src={user.avatar}
                        alt="user"
                    />
                </div>
                <div
                    className="flex-grow-1 p-1 rounded me-2 d-flex">

                    <form
                        className='d-flex w-100'
                        onSubmit={onSubmit}
                    >
                        <input
                            className="form-control "
                            placeholder="Enter new message"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className='btn btn-primary'><Icon.Send/></button>
                    </form>
                </div>

            </div>
        </>
        // </div>
    )
}