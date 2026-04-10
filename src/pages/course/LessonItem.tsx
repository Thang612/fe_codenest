import { useRef, useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '../../common/Accordion';
import { Check, X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import useThemeStore from '../../stores/theme.store';
import axios from 'axios';
import { toast } from 'sonner';

interface Lesson {
    _id: string;
    name: string;
    description: string;
}

const LessonItem = ({
    lesson,
    onUpdated
}: {
    lesson: Lesson;
    onUpdated?: () => void;
}) => {
    const editorRef = useRef<any>(null);
    const { isDark } = useThemeStore();

    // ✅ state chuẩn
    const [title, setTitle] = useState(lesson.name);
    const [description, setDescription] = useState(lesson.description);

    const [isEditTitle, setIsEditTitle] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);

    const [loadingTitle, setLoadingTitle] = useState(false);
    const [loadingDesc, setLoadingDesc] = useState(false);

    // ================= UPDATE TITLE =================
    const handleUpdateLessonTitle = async () => {
        if (!title?.trim()) {
            toast.error('Tên bài học không được để trống');
            return;
        }

        try {
            setLoadingTitle(true);

            const promise = axios.patch(
                `${import.meta.env.VITE_API_URL}/lesson/${lesson._id}`,
                { name: title }
            );

            toast.promise(promise, {
                loading: 'Đang cập nhật bài học...',
                success: () => {
                    setIsEditTitle(false);
                    onUpdated?.();
                    return 'Đã cập nhật bài học thành công!';
                },
                error: 'Cập nhật bài học thất bại.',
            });

            await promise;
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTitle(false);
        }
    };

    // ================= UPDATE DESCRIPTION =================
    const handleUpdateLessonDescription = async () => {
        try {
            const content = editorRef.current?.getContent() || '';

            setLoadingDesc(true);

            const promise = axios.patch(
                `${import.meta.env.VITE_API_URL}/lesson/${lesson._id}`,
                { description: content }
            );

            toast.promise(promise, {
                loading: 'Đang cập nhật bài học...',
                success: () => {
                    setDescription(content);
                    setIsEditDescription(false);
                    onUpdated?.();
                    return 'Đã cập nhật bài học thành công!';
                },
                error: 'Cập nhật bài học thất bại.',
            });

            await promise;
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingDesc(false);
        }
    };

    // ================= CANCEL =================
    const cancelEdit = () => {
        setTitle(lesson.name);
        setDescription(lesson.description);
        setIsEditTitle(false);
        setIsEditDescription(false);
    };

    return (
        <Accordion>
            <AccordionItem value={lesson._id}>
                {/* ================= TITLE ================= */}
                <AccordionTrigger>
                    {isEditTitle ? (
                        <div className='flex w-full gap-2'>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input_primary w-full"
                                disabled={loadingTitle}
                            />
                            <button
                                onClick={handleUpdateLessonTitle}
                                disabled={loadingTitle}
                                className="text-primary p-1"
                            >
                                <Check size={18} />
                            </button>
                            <button
                                onClick={cancelEdit}
                                disabled={loadingTitle}
                                className="text-primary p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ) : (
                        <div onClick={() => setIsEditTitle(true)}>
                            {title}
                        </div>
                    )}
                </AccordionTrigger>

                {/* ================= DESCRIPTION ================= */}
                <AccordionContent>
                    {isEditDescription ? (
                        <div className='w-full'>
                            <Editor
                                apiKey='a5232d8virl0mfoq1eor9gth0sruyzdgooihy4b1fs8vtcna'
                                key={isDark ? "dark" : "light"}
                                init={{
                                    skin: isDark ? "oxide-dark" : "oxide",
                                    content_css: isDark ? "dark" : "default",
                                    plugins:
                                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                    toolbar:
                                        'undo redo | blocks fontfamily fontsize | bold italic underline | link image media table | numlist bullist | removeformat',
                                }}
                                onInit={(_evt, editor) => (editorRef.current = editor)}
                                initialValue={description}
                            />

                            <div className='flex justify-end gap-2 mt-2'>
                                <button
                                    onClick={handleUpdateLessonDescription}
                                    disabled={loadingDesc}
                                    className="text-white bg-primary px-4 py-1 rounded-md"
                                >
                                    Lưu
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    disabled={loadingDesc}
                                    className="text-primary p-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={() => setIsEditDescription(true)}
                            className='min-h-10 content_editor cursor-pointer'
                            dangerouslySetInnerHTML={{
                                __html:
                                    description || "Chưa có mô tả bài học"
                            }}
                        />
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default LessonItem;