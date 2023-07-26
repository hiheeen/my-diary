import { useRef, useState } from 'react';

function DiaryItem({
    author,
    content,
    emotion,
    created_date,
    onRemove,
    id,
    onEdit,
}) {
    const [isEdit, setIsEdit] = useState(false);
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();
    const handleRemove = () => {
        console.log(id);
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    };
    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    };
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };
    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }
    };
    return (
        <div>
            <div>작성자 : {author}</div>
            <div>감정 점수: {emotion}</div>
            <div>작성 날짜 : {new Date(created_date).toLocaleString}</div>
            <div>
                {isEdit ? (
                    <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                    ></textarea>
                ) : (
                    <div>일기 내용 : {content}</div>
                )}
            </div>
            <div>
                {isEdit ? (
                    <>
                        <button onClick={handleQuitEdit}>수정 취소</button>
                        <button onClick={handleEdit}>수정 완료</button>{' '}
                    </>
                ) : (
                    <>
                        <button onClick={handleRemove}>삭제하기</button>
                        <button onClick={toggleIsEdit}>수정하기</button>{' '}
                    </>
                )}
            </div>

            <hr />
        </div>
    );
}
export default DiaryItem;
