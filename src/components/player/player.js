import React from 'react'
import Progress from '../progress/progress'
import './player.scss'
import {Link} from 'react-router-dom'

// import Pubsub from 'pubsub-js'


export default function Player(props) {
    let {
        currentMusicItem = {},
        playNext,
        playPrev,
        isPlay,
        playHandler,
        playType,
        playTypeHandler,
        volume,
        volumeHandler,
        leftTime,
        totalTime,
        progress,
        progressHandler
    } = props;

    return (
        <div className="player-page">
            <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
            <div className="mt20 row">
                <div className="controll-wrapper">
                    <h2 className="music-title">{currentMusicItem.title}</h2>
                    <h3 className="music-artist mt10">{currentMusicItem.artist}</h3>
                    <div className="row mt20">
                        <div className="left-time -col-auto">{leftTime}-{totalTime}</div>
                        <div className="volume-container">
                            <i className="icon-volume rt" style={{top: 5}}></i>
                            <div className="volume-wrapper">
                                <Progress
                                    progress={volume}
                                    onProgressChange={volumeHandler}
                                    barColor="#aaa"
                                >
                                </Progress>
                            </div>
                        </div>
                    </div>
                    <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                        <Progress
                            progress={progress}
                            onProgressChange={progressHandler}
                        >
                        </Progress>
                    </div>
                    <div className="mt35 row">
                        <div>
                            <i className="icon prev" onClick={playPrev}></i>
                            <i className={`icon ml20 ${isPlay ? 'pause' : 'play'}`}
                               onClick={playHandler}
                            ></i>
                            <i className="icon next ml20" onClick={playNext}></i>
                        </div>
                        <div className="-col-auto">
                            <i className={`icon repeat-${playType}`} onClick={playTypeHandler}></i>
                        </div>
                    </div>
                </div>
                <div className="-col-auto cover">
                    <img src={currentMusicItem.cover} alt={currentMusicItem.title}/>
                </div>
            </div>
        </div>
    )
};

