import React from 'react';


const Example = (props) => {
    const timeStamp = () => {
        return 'time()';
    }

    return (
        <>
            <div>Пример</div>
            <div>{timeStamp()}</div>
        </>
    )
}
export default Example;