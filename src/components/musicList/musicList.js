import React, {useEffect, useState} from 'react';
import MusicListItem from './musiclistitem'

export default function MusicList(props) {
    const {
        musicList,
        currentMusicItem,
        playMusicHandler,
        deleteMusicHandler
    } = props;

    const [listEle, setListEle] = useState();

    useEffect(() => {
        setListEle(musicList.map((item) => {
            return (
                <MusicListItem
                    key={item.id}
                    musicItem={item}
                    currentMusicItem={currentMusicItem}
                    playMusicHandler={playMusicHandler}
                    deleteMusicHandler={deleteMusicHandler}
                />
            )
        }))
    }, [musicList, currentMusicItem]);
    //todo musicList是数组，实际一直没有变

    return (
        <ul>
            {listEle}
        </ul>
    )
}



