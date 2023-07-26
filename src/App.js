import logo from './logo.svg';
import './App.css';
import DiaryEditor from './Component/DiaryEditior';
import DiaryList from './Component/DiaryList';
import { useRef, useState } from 'react';
// const dummyList = [
//     {
//         id: 1,
//         author: '소진',
//         content: '하이 1',
//         emotion: '5',
//         created_date: new Date().getTime(),
//     },
//     {
//         id: 2,
//         author: '병용',
//         content: '하이 2',
//         emotion: '4',
//         created_date: new Date().getTime(),
//     },
//     {
//         id: 3,
//         author: '민식',
//         content: '하이 3',
//         emotion: '3',
//         created_date: new Date().getTime(),
//     },
// ];
function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0);
    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            content,
            emotion,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    };
    const onRemove = (targetId) => {
        console.log(`${targetId}번째 일기가 삭제되었습니다`);
        const newDiaryList = data.filter((item) => item.id !== targetId);
        setData(newDiaryList);
    };
    const onEdit = (targetId, newContent) => {
        setData(
            data.map((item) =>
                item.id === targetId ? { ...item, content: newContent } : item
            )
        );
    };
    return (
        <div>
            {/* 앱 컴포넌트에서 만들어낸 onCreate 함수를 받아 에디터에서 작동 */}
            {/* 데이터 상태변화를 DiaryEditor가 시켜주는 원리 */}
            <DiaryEditor onCreate={onCreate} />
            {/* 앱 컴포넌트가 가진 data의 state가 바뀌면 전달되는 diaryList가 바뀜 */}
            <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
        </div>
    );
}

export default App;

// 리액트는 기본적으로 단방향의 데이터 흐름을 갖고있다.
// 하지만 Event 함수는 역방향의 데이터 흐름을 가지므로 자식 컴포넌트가 부모 컴포넌트에 영향을 줄 수 있다.
// State 끌어올리기!
// 자식 컴포넌트에서 실행한 onCreate함수가 (handleSubmit에서 state.author 등을 parameter로 집어넣어서 사용)
// 어떻게 부모 컴포넌트에 영향을 끼치나? 그게 바로 역방향 흐름이고 state끌어올리기 인것!
