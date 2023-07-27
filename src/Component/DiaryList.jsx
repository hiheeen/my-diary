import DiaryItem from './DiaryItem';
function DiaryList({ diaryList, onRemove, onEdit }) {
    // console.log(diaryList);
    return (
        <div>
            <h1>일기 리스트</h1>
            <div>{diaryList.length} 개의 일기가 있습니다.</div>
            {diaryList?.map((item) => (
                <DiaryItem
                    key={item.id}
                    {...item}
                    onRemove={onRemove}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList: [],
};
export default DiaryList;
