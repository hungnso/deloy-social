import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Ckeditor({ value, setValue }) {
  return (
    <div className="mt-2">
      <h4>Content</h4>
       <ReactQuill theme="snow" value={value} onChange={setValue}/>
    </div>
  );
}
