import { useState, useRef } from 'react';
import styled from 'styled-components';

const DiaryContainer = styled.div`
    margin: 0 auto;
    max-width: 1000px;
    width: 100%;
    // display: flex;
    // justify-content: center;
`;
const DiaryWrapper = styled.div`
    border: 1px solid black;
    padding: 50px 150px;
    text-align: center;
`;
const Author = styled.input`
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
`;
const Content = styled.textarea`
    height: 200px;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
`;
const Select = styled.select`
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
`;
const Button = styled.button`
    cursor: pointer;
    width: 400px;
`;

function DiaryEditor({ onCreate }) {
    // const [author, setAuthor] = useState('');
    // const [content, setContent] = useState('');
    const authorInput = useRef(); // React에서 html DOM요소를 참조하고자 할 때 쓰는 훅
    //무언가를 참조할 수 있는 reference 객체가 된다.
    const contentInput = useRef();
    const [state, setState] = useState({
        author: '',
        content: '',
        emotion: 1,
    });
    // const handleAuthor = (e) => {
    //     setState({ ...state, author: e.target.value }); //스프레드의 순서 중요!
    // };
    // const handleContent = (e) => {
    //     setState({ ...state, content: e.target.value });
    // };
    const handleChangeState = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        if (state.author.length < 1) {
            if (authorInput.current) {
                authorInput.current.focus(); //authorInput이 현재 가리키는 값에 focus
            }
            return;
        }
        if (state.content.length < 5) {
            if (contentInput.current) {
                contentInput.current.focus();
            }
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        alert('저장 성공!');
        setState({
            author: '',
            content: '',
            emotion: 1,
        });
    };
    return (
        <DiaryContainer className="diaryEditor">
            <DiaryWrapper>
                <h2>오늘의 일기</h2>
                {/* //이벤트가 발생한 target element의 value, name 등을 출력할 수 있음 */}
                <div>
                    <Author
                        ref={authorInput}
                        className="author"
                        name="author"
                        value={state.author}
                        // onChange={(e) => handleAuthor(e)}
                        onChange={handleChangeState}
                    ></Author>
                </div>

                <div>
                    <Content
                        ref={contentInput}
                        className="content"
                        name="content"
                        value={state.content}
                        // onChange={(e) => handleContent(e)}
                        onChange={handleChangeState}
                    ></Content>
                </div>
                <div>
                    {' '}
                    오늘의 감정점수 :
                    <Select
                        name="emotion"
                        value={state.emotion}
                        onChange={handleChangeState}
                    >
                        {/* 딱히 option value는 필요가 없음..(?) */}
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </Select>
                </div>
                <div>
                    <Button onClick={handleSubmit}>일기 저장하기</Button>
                </div>
            </DiaryWrapper>
        </DiaryContainer>
    );
}
export default DiaryEditor;
