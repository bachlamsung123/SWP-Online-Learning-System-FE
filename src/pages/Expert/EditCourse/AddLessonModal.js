import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, toastAtom } from '../../../_state';
import ToastNoti from '../../../components/ToastNoti';
import expertApi from '../../../_actions/expertApi';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const AddLessonModal = ({ chapterId }) => {

   const token = useRecoilValue(authAtom);
   const [toast, setToast] = useRecoilState(toastAtom);
   const [modalShow, setModalShow] = useState(false);
   const [content, setContent] = useState('');
   const mdParser = new MarkdownIt();
   const [hasVideo, setHasVideo] = useState(false);

   // Finish!
   function handleEditorChange({ html, text }) {
      // console.log(html, text);
      setContent(text);
   }

   const onSubmit = async (data) => {
      console.log(data);

      try {
         data.content = content;
         const id = chapterId;
         const addLesson = await expertApi.createLesson(token, id, data);
         console.log(addLesson);

         setToast({
            show: true,
            status: 'primary',
            msg: 'Add Lesson Success'
         })
         reset();
         setHasVideo(false);
         setModalShow(false);
      } catch (error) {
         console.log(error);
      }
   }

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset
   } = useForm({
      mode: 'onSubmit',
   });

   const onHide = () => {
      setModalShow(false)
   }

   return (
      <>
         <Button onClick={() => setModalShow(true)}><i class="fa-solid fa-plus"></i> Add Lesson</Button>
         <Modal show={modalShow} onHide={onHide} fullscreen={true} backdrop="static" >
            <Modal.Header closeButton>
               <Modal.Title className="fw-bold">New Lesson</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form id="addChapterForm" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="lessonTitle">

                     <Form.Label className="fw-semibold">Lesson Title</Form.Label>
                     <Form.Control
                        {...register("title", {
                           required: true
                        })}
                        type="text"
                        placeholder="Enter title"
                        className={`${errors.title ? "is-invalid" : ""}`}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson title is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lesonDuration">
                     <Form.Label className="fw-semibold">Lesson Duration (minutes)</Form.Label>
                     <Form.Control
                        {...register("duration", {
                           required: true
                        })}
                        type="number"
                        placeholder="Enter duration time"
                        className={`${errors.duration ? "is-invalid" : ""}`}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson duration is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lessonDescription">
                     <Form.Label className="fw-semibold">Description</Form.Label>
                     <Form.Control
                        {...register("description", {
                           required: true,
                        })}
                        as="textarea"
                        placeholder="Description about chapter..."
                        className={`${errors.description ? "is-invalid" : ""}`}
                     />
                     <Form.Control.Feedback type="invalid">
                        Lesson description is required
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Check
                     type="switch"
                     id="custom-switch"
                     label={<Form.Label className="fw-semibold">Video</Form.Label>}
                     onChange={() => { setHasVideo(!hasVideo) }}
                  />

                  {
                     hasVideo ? <Form.Group className="mb-3" controlId="url">
                        <Form.Label className="fw-semibold">URL Video</Form.Label>
                        <Form.Control
                           {...register("video_url", { required: true })}
                           type="url"
                           placeholder=""
                           className={`${errors.video_url ? "is-invalid" : ""}`}
                        />
                        <Form.Control.Feedback type="invalid">
                           Video url is required
                        </Form.Control.Feedback>
                     </Form.Group> : <></>
                  }


                  <Form.Group className="mb-3" controlId="lessonContent">
                     <Form.Label className="fw-semibold">Lesson Content</Form.Label>
                     <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                        canView={{ fullScreen: false, hideMenu: true }}
                        placeholder="Write your content..."
                     // onImageUpload={onImageUpload}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={onHide}>Close</Button>
               <Button variant="primary" type="submit" form="addChapterForm" >
                  {isSubmitting && <div class="spinner-border spinner-border-sm" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>} Add new lesson
               </Button>
            </Modal.Footer>
         </Modal>
         <ToastNoti />
      </>
   )
}

export default AddLessonModal

