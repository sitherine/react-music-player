import React, {useRef} from 'react'
import './progress.scss'

export default function Progress(props) {
    const progressBarRef = useRef();
    const changeProgress = (e) => {
        let progressBar = progressBarRef.current;
        let progress = (e.clientX - progressBar['getBoundingClientRect']().left) / progressBar['clientWidth'];
        props.onProgressChange && props.onProgressChange(progress);
    };
    return (
        <div className="component-progress" ref={progressBarRef} onClick={changeProgress}>
            <div className="progress"
                 style={{width: `${props.progress * 100}%`, background: `${props.barColor||'#2f9842'}`}}></div>
        </div>
    )
};
