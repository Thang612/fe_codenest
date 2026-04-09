import { useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../common/Accordion';
import { Check, X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const LessonItem = ({ lesson }: { lesson: any }) => {
    const editorRef = useRef<any>(null);
    const isDark = document.documentElement.classList.contains("dark");

    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false)

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current!.getContent());
        }
    };

    const handleUpdateLesson = () => {

    }

    const cancelEdit = () => {

    }

    return (
        <Accordion key={lesson._id} defaultValue={undefined}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    {isEditTitle ? (
                        <div className='flex w-full' >
                            <input type="text" defaultValue={lesson.name} className="input_primary w-full" />
                            <button onClick={handleUpdateLesson} className="text-primary p-1"><Check size={18} /></button>
                            <button onClick={cancelEdit} className="text-primary p-1"><X size={18} /></button>
                        </div>
                    ) : (
                        <div onClick={() => setIsEditTitle(true)}>
                            {lesson.name}
                        </div>
                    )}
                </AccordionTrigger>
                <AccordionContent>
                    {isEditDescription ? (
                        <div className=' w-full' >
                            <Editor
                                apiKey='a5232d8virl0mfoq1eor9gth0sruyzdgooihy4b1fs8vtcna'
                                key={isDark ? "dark" : "light"} // ⚠️ force re-render
                                init={{
                                    skin: isDark ? "oxide-dark" : "oxide",
                                    content_css: isDark ? "dark" : "default",
                                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                }}
                                onInit={(_evt, editor) => editorRef.current = editor}
                                initialValue={lesson.description}
                            />
                            <div className='flex justify-end mt-1'>
                                <button onClick={log} className="text-white bg-primary px-4 py-1 rounded-md p-1">Lưu</button>
                                <button onClick={cancelEdit} className="text-primary p-1"><X size={18} /></button>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => setIsEditDescription(true)} className='min-h-10'>
                            {lesson.description || "Chưa có mô tả bài học"}
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default LessonItem