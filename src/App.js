import React, {useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./components/header/header";
import MusicList from "./components/musicList/musicList";
import Player from "./components/player/player";
import {MUSIC_LIST} from "./config/musiclist";
import ReactAudioPlayer from 'react-audio-player';

export default function App(props) {
    const [musicList, setMusicList] = useState(MUSIC_LIST);
    const [currentMusicItem, setCurrentMusicItem] = useState(MUSIC_LIST[0]);
    const [leftTime, setLeftTime] = useState('0:00');
    const [totalTime, setTotalTime] = useState();
    // const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isPlay, setIsPlay] = useState(false);
    const [playType, setPlayType] = useState('cycle');
    const [playerDom, setPlayerDom] = useState();
    const playerRef = useRef();

    useEffect(() => {
        setPlayerDom(playerRef.current.audioEl.current);
    }, []);


    //音频播放，暂停，下一首，前一首，播放模式操作，播放进程控制
    const play = () => {
        setIsPlay(true);
        playerDom && playerDom.play();
    };

    const pause = () => {
        setIsPlay(false);
        playerDom && playerDom.pause();
    };

    const playHandler = () => {
        // 音频播放，暂停控制
        // 当前未播放则切换到播放状态
        !isPlay ? play() : pause();
    };

    const playerHandler = (type = "default", isPlay = true) => {
        //上下首播放操控
        //type: default结束换下一首    next手动操作下一首   pre手动操作上一首
        let index = musicList.indexOf(currentMusicItem);
        let musicListLength = musicList.length;
        if (playType === "random") {
            let nextIndex = Math.floor(Math.random() * musicListLength + 1) - 1;
            if (nextIndex === index) {
                //如随机数与当前歌曲一致，顺位下一首
                index = (nextIndex + 1) % musicListLength
            } else {
                index = nextIndex;
            }
        } else {
            if (type === "default" && playType === 'once') {
                //单曲循环歌曲播放结束时，还是播放当前歌曲
            } else if (type === "next" || type === "default") {
                //单曲循环和曲库循环，手动操作获取下一首逻辑一致
                index = (index + 1) % musicListLength
            } else {
                index = (index - 1 + musicListLength) % musicListLength
            }
        }
        playMusicHandler(musicList[index], isPlay);
    };

    const playMusicHandler = (music_item, isPlay = true) => {
        setCurrentMusicItem(music_item);
        setPlayerDom(playerRef.current.audioEl.current);
        play();
    };

    const playNext = () => {
        playerHandler('next')
    };

    const playPrev = () => {
        playerHandler('pre')
    };

    //音乐列表：删除音乐
    const deleteMusicHandler = (item) => {
        // let deleteIndex = musicList.indexOf(item);
        // let new_list=
        // musicList.splice(deleteIndex, 1);
        setMusicList(musicList.filter((_item, index) => _item !== item));
    };

    const playTypeHandler = () => {
        // playType:random cycle once
        let nextPlayType = null;
        if (playType === "cycle") {
            nextPlayType = "random"
        } else if (playType === "random") {
            nextPlayType = "once"
        } else {
            nextPlayType = "cycle"
        }
        setPlayType(nextPlayType);
    };

    //监听音频事件，获取音频信息以及识别进行下一步操作
    const onEnded = () => {
        playerHandler('default');
    };


    //播放音量控制器
    const volumeHandler = (_volume = 1) => {
        setVolume(_volume);
    };


    //定时检测当前播放进度
    const onListen = () => {
        setLeftTime(secondChangeTime(Math.round(playerDom.currentTime || 0)));
    };

    const onLoadedMetadata = () => {
        //计算当前歌曲时间总长
        setTotalTime(secondChangeTime(Math.round(playerDom.duration || 0)));
        //加载完资源后根据当前播放状态控制
        isPlay ? play() : pause();
    };

    const secondChangeTime = (sec) => {
        let min = Math.floor(sec / 60);
        min = min >= 10 ? min : '0' + min;
        let second = sec % 60;
        second = second >= 10 ? second : '0' + second;
        return min + ':' + second;
    };
    //播放进程控制器

    const progressHandler = (_progress = 1) => {
        play();
        playerDom.currentTime = playerDom.duration * _progress;
    };

    const progress = useMemo(() => {
        if (playerDom) {
            return playerDom.currentTime / playerDom.duration;
        } else {
            return 0;
        }
    }, [leftTime]);


    return (
        <div>
            <Header/>
            <ReactAudioPlayer
                listenInterval={200}
                src={currentMusicItem.file}
                volume={volume}
                controls
                currentTime
                duration
                ref={playerRef}
                onListen={onListen}
                onEnded={onEnded}
                onLoadedMetadata={onLoadedMetadata}
            />
            <Switch>
                <Route exact path="/">
                    <Player
                        currentMusicItem={currentMusicItem}
                        playNext={playNext}
                        playPrev={playPrev}
                        isPlay={isPlay}
                        playHandler={playHandler}
                        playType={playType}
                        playTypeHandler={playTypeHandler}
                        volume={volume}
                        volumeHandler={volumeHandler}
                        totalTime={totalTime}
                        leftTime={leftTime}
                        progress={progress}
                        progressHandler={progressHandler}/>
                </Route>
                <Route path="/list">
                    <MusicList musicList={musicList}
                               currentMusicItem={currentMusicItem}
                               playMusicHandler={playMusicHandler}
                               deleteMusicHandler={deleteMusicHandler}
                    />
                </Route>
                <Route path="*">
                    <noMatch/>
                </Route>
            </Switch>
        </div>
    );
}

