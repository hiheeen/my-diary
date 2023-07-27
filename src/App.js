import logo from './logo.svg';
import './App.css';
import DiaryEditor from './Component/DiaryEditior';
import DiaryList from './Component/DiaryList';
import { useEffect, useRef, useState, useMemo } from 'react';
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
// https://jsonplaceholder.typicode.com/comments
function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch(
            'https://jsonplaceholder.typicode.com/comments'
        ).then((res) => res.json());
        // console.log(res);
        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        setData(initData);
    };
    useEffect(() => {
        getData();
    }, []);
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

    const getDiaryAnalysis = useMemo(() => {
        //useMemo 함수가 값을 반환하므로 getDiaryAnalysis는 함수가 아닌 값이다.
        console.log('일기 분석 시작');

        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return { goodCount, badCount, goodRatio };
    }, [data.length]);
    const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //함수 호출 아님. 값을 할당(객체 형태의 값이니 구조분해할당)
    return (
        <div>
            {/* 앱 컴포넌트에서 만들어낸 onCreate 함수를 받아 에디터에서 작동 */}
            {/* 데이터 상태변화를 DiaryEditor가 시켜주는 원리 */}
            <DiaryEditor onCreate={onCreate} />
            <div>전체 일기 : {data.length}</div>
            <div>기분 좋은 일기 개수 : {goodCount}</div>
            <div>기분 나쁜 일기 개수 : {badCount}</div>
            <div>기분 좋은 일기 비율 : {goodRatio}</div>
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
