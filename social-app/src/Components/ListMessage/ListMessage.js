import React from 'react';
import MessageItem from './MessageItem';
import * as Icon from 'react-feather';


export default function ListMessage({ listMessages, userId }) {

    return (
        <div className='mb-2 d-flex justify-content-start flex-column overflow-auto list-group' >
            {/* <h4>Chats</h4> */}
            <div className='d-flex align-items-center'>
                <input
                    type='text'
                    className='form-control my-2'
                    placeholder="Search Message"
                />
                <div className='ms-2'><Icon.UserPlus /></div>
                <div className='ms-2'><Icon.Users /></div>
            </div>

            <div className='flex-grow-1 overflow-auto'>
                {
                    listMessages.map(message => (

                        <div
                        >
                            <MessageItem
                                message={message}
                                userId={userId}
                            />
                            {/* { console.log(message._id,userId)} */}
                            {/* { console.log(userId)} */}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}